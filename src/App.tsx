import React, { PureComponent } from 'react';
import './App.scss';
import { PlayAgainButton } from './components/PlayAgainButton/PlayAgainButton';
import { IPlayer } from './components/Player/Player';
import { PlayerList } from './components/PlayerList/PlayerList';

const SUITS = ['spade', 'heart', 'diamond', 'club'];
const CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export interface AppState {
  players: IPlayer[];
}

export class App extends PureComponent<{}, AppState> {

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
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
    };
  }

  render() {
    const { players } = this.state;

    return (
      <div className="app">
        <PlayerList players={ players } />
        <PlayAgainButton />
      </div>
    );
  }

}
