export interface ICreated {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  status?: number,
  response?: string,
}

export interface IError {
  status: number;
  response: string;
}

export interface IInfo {
  homeTeamGoals: number,
  awayTeamGoals: number
}

export interface IMatch {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
}
