/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-cycle
import { Card } from './card';
// eslint-disable-next-line import/no-cycle
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
        // eslint-disable-next-line no-shadow
        res.forEach((res) => {
          this.addCard(res.name, res.link);
        });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }
}
