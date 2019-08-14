import React, { FC } from 'react';
import './Card.scss';

const cardBaseURL = 'http://h3h.net/images/cards/{suit}_{card}.svg';

export interface ICardProps {
  card: string;
}

export const Card: FC<ICardProps> = (props) => {
  const [suit, card] = props.card.split('_');
  const src = cardBaseURL.replace('{suit}', suit).replace('{card}', card);

  return (
    <img className="card" src={ src } alt={ props.card } />
  );
};
