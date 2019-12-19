import { Card } from './card';
import { api2 } from '../index';

export class CardList {
  constructor(container) {
    this.container = container;
  }

  get asElement() {
    return this.container;
  }

  addCard = (name, link) => {
    const card = new Card(name, link);
    card.renderCard();
    this.container.appendChild(card.asElement);
  }

  render = () => {
    api2
      .getInitialCards()
      .then((res) => {
        res.forEach((res) => {
          this.addCard(res.name, res.link);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
