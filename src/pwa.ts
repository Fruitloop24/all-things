import { registerSW } from 'virtual:pwa-register'

if (typeof window !== 'undefined') {
  registerSW({
    immediate: true,
    onRegisteredSW(_swUrl, registration) {
      if (registration) {
        setInterval(() => registration.update(), 60 * 60 * 1000)
      }
    },
  })
}
