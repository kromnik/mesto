export default class Section {
  constructor({ renderer }, cardElements) {
    this._renderer = renderer;
    this._container = cardElements;
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