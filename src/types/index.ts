export interface RankingI {
  score: number;
  nickname: string;
}

export interface RankingResponse {
  success: boolean;
  rankings?: RankingI[];
  user?: { score: number; ranking: number };
}
