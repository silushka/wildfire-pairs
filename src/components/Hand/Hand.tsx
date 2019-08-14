import React, { FC } from 'react';
import { Card } from '../Card/Card';

export interface IHandProps {
  hand: string[];
}

export const Hand: FC<IHandProps> = ({ hand }) => {
  return (
    <>
      { hand.map((card) => (
        <Card card={ card } key={ card } />
      )) }
    </>
  );
};
