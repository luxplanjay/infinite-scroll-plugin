window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener(
    'scroll',
    handleScroll.bind(null, document.documentElement, addItems),
  );
});

function handleScroll(el, cb, evt) {
  const scrollDiff = el.scrollHeight - (el.scrollTop + el.clientHeight);

  if (scrollDiff < 100) {
    console.log('qwewe');
    cb();
  }
}

function addItems() {
  const list = document.querySelector('.list');

  let html = '';
  let num = 50;

  while (num > 0) {
    html += `<li>new item</li>`;

    num -= 1;
  }

  list.insertAdjacentHTML('beforeend', html);
}
