// Any setup scripts you might need go here

// Load .env files
import 'dotenv/config'

// Register jest-dom matchers against vitest's `expect` (the bare
// '@testing-library/jest-dom' entrypoint assumes a global `expect`).
import '@testing-library/jest-dom/vitest'
