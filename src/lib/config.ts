const isDevelopment = process.env.NODE_ENV === 'development'
const DEFAULT_AUTH_DOMAIN = 'qualitycompanyformations.co.uk'

const firebaseConfigBase = {
  apiKey: 'AIzaSyB0H-9ZwdmS4wk-_AqgjIgzaqm9Or6t37k',
  projectId: 'platform-439613',
  storageBucket: 'platform-439613.firebasestorage.app',
  messagingSenderId: '179619560650',
  appId: '1:179619560650:web:0a6c94edbbb593ea75c833',
  measurementId: 'G-B6CFPKTP87',
}

export function getFirebaseConfig() {
  const authDomain = isDevelopment
    ? 'localhost:3000'
    : typeof window !== 'undefined'
      ? window.location.hostname
      : DEFAULT_AUTH_DOMAIN
  return { ...firebaseConfigBase, authDomain }
}
