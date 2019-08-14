import React, { FC } from 'react';
import { IPlayer, Player } from '../Player/Player';

export interface IPlayerListProps {
  players: IPlayer[];
}

export const PlayerList: FC<IPlayerListProps> = ({ players }) => {
  return (
    <>
      { players.map(({ name, hand }) => (
        <Player name={ name } hand={ hand } key={ name } />
      )) }
    </>
  );
};
