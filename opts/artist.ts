export interface MultipleArtists {
  ids: string | Array<string>;
}

export interface ArtistOpt {
  id: string;
}

export interface ArtistTopTracksOpt {
  id: string;
  market: string;
}

export interface RelatedArtistsOpt {
  id: string;
}

export interface ArtistAlbumsOpt {
  id?: string;
  includeGroups?: string | Array<string>;
  market: string;
  limit?: number;
  offset?: number;
}
