import React, { FC } from 'react';
import { SetPairsFn, Winner } from '../../App';
import { IPlayer, Player } from '../Player/Player';

export interface IPlayerListProps {
  players: IPlayer[];
  winner: Winner;
  onSetPairs: SetPairsFn;
}

export const PlayerList: FC<IPlayerListProps> = ({ players, winner, onSetPairs }) => {
  return (
    <>
      { players.map((player) => (
        <Player { ...player } winner={ winner } onSetPairs={ onSetPairs } key={ player.name } />
      )) }
    </>
  );
};
