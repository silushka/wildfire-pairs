import classNames from 'classnames';
import React, { FC, useEffect } from 'react';
import { SetPairsFn, Winner } from '../../App';
import { Hand } from '../Hand/Hand';
import './Player.scss';

export interface IPlayer {
  name: string;
  hand: string[];
  pairs: string[] | null;
}

export interface IPlayerProps extends IPlayer {
  winner: Winner;
  onSetPairs: SetPairsFn;
}

export type CountedCards = Record<string, number>;

const countCards = (hand: IPlayer['hand']): CountedCards => {
  return hand.reduce<CountedCards>((counter, card) => {
    const cardValue = card.split('_')[1];

    return {
      ...counter,
      [cardValue]: (counter[cardValue] || 0) + 1,
    };
  }, {});
};

const getPairs = (cards: CountedCards): string[] => {
  return Object.entries(cards).filter(([card, count]) => count > 1).map(([card]) => card);
};

export const Player: FC<IPlayerProps> = ({ name, hand, winner, pairs, onSetPairs }) => {
  useEffect(() => {
    if (!pairs) {
      const countedCards = countCards(hand);
      onSetPairs(name, getPairs(countedCards));
    }
  });

  const className = classNames('hand', { winning: winner === name });

  return (
    <section className={ className }>
      <h1>{ name }</h1>
      <Hand hand={ hand } pairs={ pairs } />
    </section>
  );
};
