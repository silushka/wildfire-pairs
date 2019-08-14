import React, { PureComponent } from 'react';
import './App.scss';
import { PlayAgainButton } from './components/PlayAgainButton/PlayAgainButton';
import { IPlayer } from './components/Player/Player';
import { PlayerList } from './components/PlayerList/PlayerList';

export type SetPairsFn = (name: IPlayer['name'], pairs: IPlayer['pairs']) => void;
export type Winner = IPlayer['name'] | null;

export interface IAppState {
  cards: string[];
  players: IPlayer[];
  winner: Winner;
}

export class App extends PureComponent<{}, IAppState> {

  static readonly SUITS = ['spade', 'heart', 'diamond', 'club'];
  static readonly CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  static readonly CARDS_IN_HAND = 5;

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      cards: this.parseCards(),
      players: [
        {
          name: 'Player 1',
          hand: [],
          pairs: null,
        },
        {
          name: 'Player 2',
          hand: [],
          pairs: null,
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

  setPairs: SetPairsFn = (name, pairs) => {
    this.setState((state) => {
      const players = state.players.map((player) => {
        if (player.name === name) {
          return {
            ...player,
            pairs,
          };
        }

        return player;
      });

      let winner: Winner = null;

      if (this.getPairsCount(players[0].pairs) > this.getPairsCount(players[1].pairs)) {
        winner = players[0].name;
      }

      if (this.getPairsCount(players[1].pairs) > this.getPairsCount(players[0].pairs)) {
        winner = players[1].name;
      }

      return {
        players,
        winner,
      };
    });
  };

  render() {
    const { players, winner } = this.state;

    return (
      <div className="app">
        <PlayerList players={ players } winner={ winner } onSetPairs={ this.setPairs } />
        <PlayAgainButton onClick={ this.playAgain } />
      </div>
    );
  }

  private parseCards = (): IAppState['cards'] => {
    const allCards: IAppState['cards'] = [];

    App.SUITS.forEach((suit) => {
      App.CARDS.forEach((card) => {
        allCards.push(`${ suit }_${ card }`);
      });
    });

    return allCards;
  };

  private makeHands = (): void => {
    let availableCards = this.state.cards;

    const playersWithHand = this.state.players.map((player) => {
      const [hand, cardsLeft] = this.makeHand(availableCards);
      availableCards = cardsLeft;

      return {
        ...player,
        hand,
        pairs: null,
      };
    });

    this.setState(() => ({
      players: playersWithHand,
      winner: null,
    }));
  };

  private makeHand = (availableCards: IAppState['cards']): [IPlayer['hand'], IAppState['cards']] => {
    let cardsLeft = availableCards;
    const hand: IPlayer['hand'] = [];

    for (let i = 0; i < App.CARDS_IN_HAND; i++) {
      const [card, index] = this.getRandomCard(cardsLeft);
      cardsLeft = cardsLeft.filter((ac, i) => i !== index);
      hand.push(card);
    }

    return [hand, cardsLeft];
  };

  private getRandomCard = (availableCards: IAppState['cards']): [IAppState['cards'][0], number] => {
    const randomIndex = this.getRandomInt(0, availableCards.length);

    return [availableCards[randomIndex], randomIndex];
  };

  private getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  private getPairsCount = (pairs: IPlayer['pairs']): number => {
    return pairs ? pairs.length : 0;
  };

}
