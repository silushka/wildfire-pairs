import React, { PureComponent } from 'react';
import './App.scss';
import { PlayAgainButton } from './components/PlayAgainButton/PlayAgainButton';
import { IPlayer } from './components/Player/Player';
import { PlayerList } from './components/PlayerList/PlayerList';

export type Winner = IPlayer['name'] | null;

export interface IAppState {
  allCards: string[];
  availableCards: string[];
  players: IPlayer[];
  winner: Winner;
}

export class App extends PureComponent<{}, IAppState> {

  static readonly SUITS = ['spade', 'heart', 'diamond', 'club'];
  static readonly CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  static readonly CARDS_IN_HAND = 5;

  constructor(props: Readonly<{}>) {
    super(props);

    const allCards = this.parseCards();

    this.state = {
      allCards,
      availableCards: allCards,
      players: [
        {
          name: 'Player 1',
          hand: [],
        },
        {
          name: 'Player 2',
          hand: [],
        },
      ],
      winner: null,
    };
  }

  componentDidMount(): void {
    this.makeHands();
  }

  playAgain = (): void => {
    this.makeHands();
  };

  render() {
    const { players, winner } = this.state;

    return (
      <div className="app">
        <PlayerList players={ players } winner={ winner } />
        <PlayAgainButton onClick={ this.playAgain } />
      </div>
    );
  }

  private parseCards = (): IAppState['allCards'] => {
    const allCards: IAppState['allCards'] = [];

    App.SUITS.forEach((suit) => {
      App.CARDS.forEach((card) => {
        allCards.push(`${ suit }_${ card }`);
      });
    });

    return allCards;
  };

  private makeHands = (): void => {
    let availableCards = this.state.availableCards;

    const playersWithHand = this.state.players.map((player) => {
      const [hand, cardsLeft] = this.makeHand(availableCards);
      availableCards = cardsLeft;

      return {
        ...player,
        hand,
      };
    });

    this.setState(() => ({
      players: playersWithHand,
      availableCards,
    }));
  };

  private makeHand = (availableCards: IAppState['availableCards']): [IPlayer['hand'], IAppState['availableCards']] => {
    let cardsLeft = availableCards;
    const hand: IPlayer['hand'] = [];

    for (let i = 0; i < App.CARDS_IN_HAND; i++) {
      const [card, index] = this.getRandomCard(cardsLeft);
      cardsLeft = cardsLeft.filter((ac, i) => i !== index);
      hand.push(card);
    }

    return [hand, cardsLeft];
  };

  private getRandomCard = (availableCards: IAppState['availableCards']): [IAppState['availableCards'][0], number] => {
    const randomIndex = this.getRandomInt(0, availableCards.length);

    return [availableCards[randomIndex], randomIndex];
  };

  private getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

}
