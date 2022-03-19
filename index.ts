import App from './src/App/App.js';

window.addEventListener('DOMContentLoaded', () => {
  new App(document.querySelector('.app'));

  const $list: HTMLUListElement = document.querySelector('.list');
  $list.style.display = 'none';
});

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./sw.js')
      .then(() => {
        console.log('Service worker registered!');
      })
      .catch((error) => {
        console.warn('Error registering service worker:');
        console.warn(error);
      });
  }
});
