import React from 'react';
import './Player.scss';

export interface IPlayer {
  name: string;
  hand: any[];
}

export const Player: React.FC<IPlayer> = (player) => {
  return (
    <section className="hand">
      <h1>{ player.name }</h1>
    </section>
  );
};
