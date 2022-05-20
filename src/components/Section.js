export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  };

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  };

  addItem(element, place) {
    if (place === "append") {
      this._container.append(element)
    } else {
      this._container.prepend(element)  
    };
  };  
}