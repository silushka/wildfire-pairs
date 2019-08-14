import React, { FC } from 'react';
import { Card } from '../Card/Card';

export interface IHandProps {
  hand: string[];
  pairs: string[] | null;
}

export const Hand: FC<IHandProps> = ({ hand, pairs }) => {
  return (
    <>
      { hand.map((card) => {
        const cardValue = card.split('_')[1];
        const pairIndex = pairs ? pairs.findIndex(pair => pair === cardValue) : -1;

        return (
          <Card card={ card } key={ card } pairIndex={ pairIndex } />
        );
      }) }
    </>
  );
};
