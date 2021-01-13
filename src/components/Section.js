export default class Section {
  constructor({ renderer }, containerSelector) {

    this._renderer = renderer;

    this._container = containerSelector;
  }



  renderItems(renderedItems, insert) {
    if (Array.isArray(renderedItems) === true) {
      renderedItems.forEach(item => this._renderer(item, insert))
    } else {
      this._renderer(renderedItems, insert);
    }
  }


  addItem(element, isAppend) {
    if (isAppend === true) {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}