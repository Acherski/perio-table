export type CallState = LoadingState | ErrorState;

export enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

export type ErrorState = { error: string };
