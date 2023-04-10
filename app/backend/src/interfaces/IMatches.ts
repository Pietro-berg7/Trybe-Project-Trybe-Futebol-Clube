export interface ICreated {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  status?: number,
  message?: string,
}

export interface IError {
  status: number;
  message: string;
}

export interface IInfo {
  homeTeamGoals: number,
  awayTeamGoals: number
}

export interface IMatch {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}
