export interface RankingI {
  score: number;
  nickname: string;
}

export interface RankingResponse {
  success: boolean;
  rankings?: RankingI[];
  user?: { score: number; ranking: number };
}

export enum University {
  Kaist = 'K',
  Postech = 'P'
}

export enum Winner {
  Kaist = 'K',
  Postech = 'P',
  None = 'N'
}

export enum GameStatus {
  Waiting = 'waiting',
  Running = 'running',
  Exiting = 'exiting'
}
