export enum SearchType {
  Album = "album",
  Artist = "artist",
  Playlist = "playlist",
  Track = "track",
  Show = "show",
  Episode = "episode",
}

export interface SearchOpt {
  q: string;
  type: SearchType;
  market?: string;
  limit?: number;
  offset?: number;
  includeExternal?: string;
}
