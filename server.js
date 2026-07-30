import { createServer } from 'https'
import { parse } from 'url'
import next from 'next'
import fs from 'fs'
import path from 'path'
import { execSync, spawn } from 'child_process'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const startPort = Number(process.env.PORT) || 3000
// How many sequential ports to try before giving up.
const maxPortAttempts = 10

const httpsOptions = generateCertificates()

// Next needs to know the actual port for its dev overlay / asset URLs, so we
// resolve a free port BEFORE creating the Next app rather than after.
findAvailablePort(startPort, maxPortAttempts)
  .then(async (port) => {
    const app = next({ dev, hostname, port })
    const handle = app.getRequestHandler()
    await app.prepare()
    // getUpgradeHandler() must be called AFTER prepare() — Next throws
    // "prepare() must be called before performing this operation" otherwise.
    const upgradeHandler = app.getUpgradeHandler()

    const server = createServer(httpsOptions, async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true)
        await handle(req, res, parsedUrl)
      } catch (err) {
        console.error('Error occurred handling', req.url, err)
        res.statusCode = 500
        res.end('internal server error')
      }
    })

    // Forward WebSocket upgrades (e.g. /_next/webpack-hmr) to Next so HMR works.
    server.on('upgrade', (req, socket, head) => {
      upgradeHandler(req, socket, head)
    })

    server
      .once('error', (err) => {
        console.error(err)
        process.exit(1)
      })
      .listen(port, () => {
        const url = `https://${hostname}:${port}`
        if (port !== startPort) {
          console.log(`> Port ${startPort} in use, using ${port} instead`)
        }
        console.log(`> Ready on ${url}`)
        // Only auto-open the browser for an interactive human session. When
        // stdout is piped (CI, agents, repeated verification boots) or
        // BROWSER=none is set, skip it — otherwise every dev boot spawns a tab
        // stuck on the self-signed-cert "connection is not private" warning.
        if (dev && process.stdout.isTTY && process.env.BROWSER !== 'none') openBrowser(url)
      })
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

// Probe sequential ports starting at `start` and resolve the first one that is
// free. Rejects if none of the `attempts` ports are available.
function findAvailablePort(start, attempts) {
  return new Promise((resolve, reject) => {
    const tryPort = (port, remaining) => {
      const probe = createServer()
      probe.once('error', (err) => {
        if (err.code === 'EADDRINUSE' && remaining > 1) {
          tryPort(port + 1, remaining - 1)
        } else {
          reject(
            err.code === 'EADDRINUSE'
              ? new Error(`No free port found in range ${start}-${start + attempts - 1}`)
              : err,
          )
        }
      })
      probe.once('listening', () => {
        probe.close(() => resolve(port))
      })
      // Bind the same way the real server does (all interfaces, no host) so the
      // probe and the real listen agree on whether a port is taken.
      probe.listen(port)
    }
    tryPort(start, attempts)
  })
}

// Open the resolved URL in the default browser (dev convenience). Best-effort:
// failures (e.g. headless CI) are logged but never crash the server.
function openBrowser(url) {
  const opener =
    process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open'
  try {
    spawn(opener, [url], { stdio: 'ignore', detached: true, shell: process.platform === 'win32' })
      .on('error', () => {})
      .unref()
  } catch {
    // ignore — opening the browser is non-essential
  }
}

function generateCertificates() {
  const keyPath = path.join(__dirname, 'key.pem')
  const certPath = path.join(__dirname, 'cert.pem')

  if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
    console.log('SSL certificates not found. Generating self-signed certificates...')

    try {
      execSync('which mkcert', { stdio: 'pipe' })
      console.log('Using mkcert for certificate generation...')
      execSync('mkcert localhost', { stdio: 'inherit' })

      if (fs.existsSync('localhost.pem') && fs.existsSync('localhost-key.pem')) {
        fs.renameSync('localhost.pem', certPath)
        fs.renameSync('localhost-key.pem', keyPath)
        console.log('Certificates generated with mkcert')
      }
    } catch (_mkcertError) {
      console.log('mkcert not available, using OpenSSL for certificate generation...')
      execSync(
        `openssl req -x509 -newkey rsa:2048 -nodes -keyout ${keyPath} -out ${certPath} -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost" -addext "subjectAltName = DNS:localhost,IP:127.0.0.1"`,
        { stdio: 'inherit' },
      )
      console.log('Certificates generated with OpenSSL')
    }
  }

  return {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  }
}
