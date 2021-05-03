export interface GetUserProfileOpt {
  userId: string;
}

export interface GetFollowedArtists {
  type: string;
  after?: string;
  limit?: number;
}

export interface FollowArtistsOrUsers {
  type: string;
  ids: string | Array<string>;
}

export interface GetFollowingState {
  type: string;
  ids: string | Array<string>;
}
