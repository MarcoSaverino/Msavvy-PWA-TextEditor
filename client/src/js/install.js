console.log('Install.js loaded');

const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
console.log("beforeinstallprompt event fired")
window.deferredPrompt = event;
butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
  console.log("butInstall clicked")
  const promptEvent = window.deferredPrompt;
  console.log("promptEvent:", promptEvent);

  if (!promptEvent) {
    console.log("No promptEvent so the app won't be installed")
    return;
  }

  promptEvent.prompt();

  window.deferredPrompt = null;
  butInstall.classList.toggle('hidden', true);
});

// Add handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {

    console.log("Installed succesfully", event);
});