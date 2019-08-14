import classNames from 'classnames';
import React, { FC } from 'react';
import './Card.scss';

const cardBaseURL = 'http://h3h.net/images/cards/{suit}_{card}.svg';

export interface ICardProps {
  card: string;
  pairIndex: number;
}

export const Card: FC<ICardProps> = ({ card, pairIndex }) => {
  const [suit, cardValue] = card.split('_');
  const src = cardBaseURL.replace('{suit}', suit).replace('{card}', cardValue);
  const className = classNames(
    'card',
    {
      pair0: pairIndex === 0,
      pair1: pairIndex === 1,
    },
  );

  return (
    <img className={ className } src={ src } alt={ card } />
  );
};
