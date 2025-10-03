export interface Horse {
  id: number;
  name: string;
  color: string;
  condition: number; // 1-100
}

export interface Round {
  round: number;
  distance: number;
  horses: Horse[];
}

export interface Position {
  position: number;
  horse: string;
  color: string;
  condition: number;
}

export interface RoundResult {
  round: number;
  distance: number;
  positions: Position[];
}
