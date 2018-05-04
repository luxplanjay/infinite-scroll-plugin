 /**
* Infinite Scroll Class
*
* @class IScroll
*
* @constructor
* @param config {Object} Instance configuration
*
* @config
* @param action {Function} Scroll threshold callback
* @param scrollThresholdPx {Number} Amount of pixels to the bottom fo the container
* @param isAsync {Boolean}
* @param showLoader {Boolean}
*
* @throws {}
*/
class IScroll {
  constructor({
    action,
    scrollThresholdPx = 100,
    isAsync = true,
    showLoader = false,
  }) {
    this.container = document.documentElement;
    this.onScrollCallback = action;
    this.scrollDiff = scrollThresholdPx;
    this.isLoading = false;
    this.isAsync = isAsync;
    this.showLoader = showLoader;

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

new IScroll({ action: addItems });

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
