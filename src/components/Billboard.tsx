import React from 'react';

export interface RankingI {
  score: number;
  nickname: string;
}

export const Billboard: React.FC<{ rankings: RankingI[] }> = ({
  rankings
}: {
  rankings: RankingI[];
}) => {
  return <div>helo</div>;
};
