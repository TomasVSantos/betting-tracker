export type Bet = {
  id: string;
  date: string;
  sport: string;
  event: string;
  betType: string;
  stake: number;
  odds: number;
  settled: boolean;
  result?: "won" | "lost";
};