class IScroll {
  constructor({ container, action }) {
    this.container = container;
    this.onScrollCallback = action;

    this.initScrollListener();
  }

  initScrollListener() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    const { scrollHeight, scrollTop, clientHeight } = this.container;

    const scrollDiff = scrollHeight - (scrollTop + clientHeight);

    if (scrollDiff < 100) {
      console.log('loading new items...');
      this.onScrollCallback();
    }
  }
}

new IScroll({
  container: document.documentElement,
  action: addItems,
});

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
