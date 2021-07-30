export interface GetUserProfileOpt {
  userId: string;
}

export interface GetFollowedArtistsOpt {
  type: string;
  after?: string;
  limit?: number;
}

export interface FollowArtistsOrUsersOpt {
  type: string;
  ids: string | Array<string>;
}

export interface GetFollowingStateOpt {
  type: string;
  ids: string | Array<string>;
}

export interface GetUserTopArtistsAndTracks {
  timeRange?: string;
  limit?: number;
  offset?: number;
}
