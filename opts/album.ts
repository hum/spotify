export interface MultipleAlbumsOpt {
  ids: string | Array<string>;
  market?: string;
}

export interface AlbumOpt {
  id: string;
  market?: string;
}

export interface AlbumTracksOpt {
  id: string;
  market?: string;
  limit?: number;
  offset?: number;
}
