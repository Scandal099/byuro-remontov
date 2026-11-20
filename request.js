const form = document.querySelector('#request-form');
const dialog = document.querySelector('#request');
const closeButton = dialog.querySelector('.request-close');

for (const trigger of document.querySelectorAll('[data-open-request]')) {
  if (typeof dialog.showModal !== 'function') continue;
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.setAttribute('aria-controls', dialog.id);
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.showModal();
  });
}

closeButton.addEventListener('click', () => dialog.close());

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const message = [
    'Здравствуйте! Хочу оставить заявку на ремонт.',
    `Имя: ${data.get('name').trim()}`,
    `Телефон: ${data.get('phone').trim()}`,
    `Что нужно сделать: ${data.get('details').trim()}`,
  ].join('\n');
  const url = new URL(form.action);
  url.searchParams.set('text', message);
  window.location.assign(url);
});
