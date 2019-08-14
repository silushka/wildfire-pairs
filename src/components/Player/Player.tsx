import React from 'react';
import { Hand } from '../Hand/Hand';
import './Player.scss';

export interface IPlayer {
  name: string;
  hand: any[];
}

export const Player: React.FC<IPlayer> = (player) => {
  return (
    <section className="hand">
      <h1>{ player.name }</h1>
      <Hand hand={ player.hand } />
    </section>
  );
};
