import React, { FC } from 'react';
import { Winner } from '../../App';
import { IPlayer, Player } from '../Player/Player';

export interface IPlayerListProps {
  players: IPlayer[];
  winner: Winner;
}

export const PlayerList: FC<IPlayerListProps> = ({ players, winner }) => {
  return (
    <>
      { players.map(({ name, hand }) => (
        <Player name={ name } hand={ hand } winner={ winner } key={ name } />
      )) }
    </>
  );
};
