class IScroll {
  constructor({ action, scrollThresholdPx = 100 }) {
    this.container = document.documentElement;
    this.onScrollCallback = action;
    this.scrollDiff = scrollThresholdPx;
    this.isLoading = false;

    this.initScrollListener();
  }

  initScrollListener() {
    this.container.style.overflowY = 'auto';
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    const { scrollHeight, scrollTop, clientHeight } = this.container;
    const currentScrollDiff = scrollHeight - (scrollTop + clientHeight);

    if (!this.isLoading && currentScrollDiff < this.scrollDiff) {
      console.log('loading new items...');
      this.isLoading = true;
      this.onScrollCallback().then(() => (this.isLoading = false));
    }
  }
}

new IScroll({
  action: addItems,
  scrollThresholdPx: 150,
});

function addItems() {
  const list = document.querySelector('.list');

  let html = '';
  let num = 30;

  while (num > 0) {
    html += `<li>new item</li>`;
    num -= 1;
  }

  return new Promise(resolve => {
    setTimeout(() => {
      list.insertAdjacentHTML('beforeend', html);
      resolve();
    }, 200);
  });
}
