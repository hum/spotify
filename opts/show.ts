export interface MultipleShowsOpt {
  ids: Array<string>;
  market?: string;
}

export interface ShowOpt {
  id: string;
  market?: string;
}

export interface ShowEpisodesOpt {
  id: string;
  market?: string;
  limit?: number;
  offset?: number;
}
