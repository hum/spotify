export interface PlaylistItemsOpt {
  id: string;
  market: string;
  fields?: string;
  limit?: number;
  offset?: number;
  additionalTypes?: string;
}

export interface CurrentUserPlaylistOpts {
  limit?: number;
  offset?: number;
}

export interface UserPlaylistOpts {
  limit?: number;
  offset?: number;
}

export interface CreatePlaylistOpts {
  name: string;
  public?: boolean;
  collaborative?: boolean;
  description?: string;
}

export interface PlaylistOpts {
  market?: string;
  fields?: Array<string>;
  additionalTypes?: string;
}

export interface ChangePlaylistDetailsOpts {
  playlistId: string;
  name?: string;
  public?: boolean;
  collaborative?: boolean;
  description?: string;
}

export interface PlaylistItemsOpts {
  playlistId: string;
  market?: string;
  fields?: Array<string>;
  limit?: number;
  offset?: number;
  additionalTypes?: string;
}

export interface AddItemsToPlaylistOpts {
  playlistId: string;
  position?: number;
  uris?: Array<string>;
}

export interface ReorderOrReplacePlaylistItemsOpts {
}
