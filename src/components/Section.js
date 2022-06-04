export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  };

  renderItems(cardsData) {
    cardsData.forEach((item) => {
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