// eslint-disable-next-line @typescript-eslint/no-explicit-any

async function registerServiceWorker(): Promise<ServiceWorkerRegistration> {
  return navigator.serviceWorker
    .register("/OneSignalSDKWorker.js")
    .then(function (registration) {
      console.log("Service worker successfully registered.");
      return registration;
    })
    .catch(function (err) {
      console.error("Unable to register service worker.", err);
      throw err;
    });
}

async function requestPermissionForOneSignal() {
  try {
    await registerServiceWorker();
  } catch (err) {
    console.error(
      "Error during service worker registration or notification permission request:",
      err
    );
  }
}

export { requestPermissionForOneSignal };
