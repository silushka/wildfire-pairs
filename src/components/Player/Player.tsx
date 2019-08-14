import classNames from 'classnames';
import React, { FC } from 'react';
import { Winner } from '../../App';
import { Hand } from '../Hand/Hand';
import './Player.scss';

export interface IPlayer {
  name: string;
  hand: any[];
}

export interface IPlayerProps extends IPlayer {
  winner: Winner;
}

export const Player: FC<IPlayerProps> = ({ name, hand, winner }) => {
  const className = classNames('hand', { winning: winner === name });

  return (
    <section className={ className }>
      <h1>{ name }</h1>
      <Hand hand={ hand } />
    </section>
  );
};
