import React, { FC } from 'react';
import './PlayAgainButton.scss';

export interface IPlayAgainButtonProps {
  onClick: () => void;
}

export const PlayAgainButton: FC<IPlayAgainButtonProps> = ({ onClick }) => {
  return (
    <section className="buttons">
      <button type="button" onClick={ onClick }>
        Play Again
      </button>
    </section>
  );
};
