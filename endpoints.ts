const API_PREFIX = "https://api.spotify.com/v1";

const GET_MULTIPLE_ALBUMS = (ids: Array<string>, market?: string) => {
  if (ids.length > 20 || ids.length == 0) {
    throw new Error(
      `Parameter 'ids' did not provide an array between the size of 1 and 20.`,
    );
  }

  const params: Record<string, string> = {};
  let query = `${API_PREFIX}/albums`;

  params.ids = ids.join(",");

  if (market) {
    params.market = market;
  }

  query = format(query, params);
  return query;
};

const GET_ALBUM = (id: string, market?: string) => {
  let query = `${API_PREFIX}/albums/${id}`;

  if (market) {
    query = format(query, { "market": market });
  }
  return query;
};

const GET_ALBUM_TRACKS = (
  id: string,
  market?: string,
  limit?: number,
  offset?: number,
) => {
  const params: Record<string, string> = {};
  let query = `${API_PREFIX}/albums/${id}/tracks`;

  if (market) {
    params.market = market;
  }
  if (limit) {
    params.limit = String(limit);
  }
  if (offset) {
    params.offset = String(offset);
  }

  query = format(query, params);
  return query;
};

const GET_MULTIPLE_ARTISTS = (ids: Array<string>) => {
  let query = `${API_PREFIX}/artists`;
  query = format(query, { ids: ids.join(",") });
  return query;
};

const GET_ARTIST = (id: string) => {
  return `${API_PREFIX}/artists/${id}`;
};

const GET_ARTIST_TOP_TRACKS = (id: string, market: string) => {
  let query = `${API_PREFIX}/artists/${id}/top-tracks`;
  query = format(query, { market: market });
  return query;
};

const GET_RELATED_ARTISTS = (id: string) => {
  return `${API_PREFIX}/artists/${id}/related-artists`;
};

const GET_ARTISTS_ALBUMS = (
  id: string,
  includeGroups?: Array<string>,
  market?: string,
  limit?: number,
  offset?: number,
) => {
  const params: Record<string, string> = {};
  let query = `${API_PREFIX}/artists/${id}/albums`;

  if (includeGroups) {
    params.include_groups = includeGroups.join(",");
  }

  if (!market) {
    market = "US";
  }
  params.market = market;

  if (limit) {
    params.limit = String(limit);
  }
  if (offset) {
    params.offset = String(offset);
  }

  query = format(query, params);
  return query;
};

export enum SearchType {
  Album = "album",
  Artist = "artist",
  Playlist = "playlist",
  Track = "track",
  Show = "show",
  Episode = "episode",
}

const SEARCH = (
  q: string,
  type: SearchType,
  market?: string,
  limit?: number,
  offset?: number,
  includeExternal?: string,
) => {
  const params: Record<string, string> = {};
  let query = `${API_PREFIX}/search`;

  params.q = q;
  params.type = type;

  if (market) {
    params.market = market;
  }
  if (limit) {
    params.limit = String(limit);
  }
  if (offset) {
    params.offset = String(offset);
  }
  if (includeExternal) {
    params.include_external = includeExternal;
  }
  query = format(query, params);
  return query;
};

const format = (query: string, params: Record<string, string>) => {
  let result = "?";
  for (const [k, v] of Object.entries(params)) {
    result += `${k}=${v}&`;
  }
  return query.concat(result.substr(0, result.length - 1));
};

/*const toSnakeCase = (str: string) => {
    let result = "";
    let char = "";

    for(let i = 0; i < str.length; i++) {
        char = str[i];
        if (char == char.toUpperCase()) {
            char = char.toLowerCase();
            result += '_';
        }
        result += `${char}`;
    }
    return result;
}*/

export const endpoints = {
  GET_MULTIPLE_ALBUMS,
  GET_ALBUM,
  GET_ALBUM_TRACKS,

  GET_MULTIPLE_ARTISTS,
  GET_ARTIST,
  GET_ARTIST_TOP_TRACKS,
  GET_RELATED_ARTISTS,
  GET_ARTISTS_ALBUMS,

  SEARCH,
  /*GET_ALL_NEW_RELEASES,
    GET_ALL_FEATURED_PLAYLISTS,
    GET_ALL_CATEGORIES,
    GET_CATEGORY,
    GET_CATEGORYS_PLAYLIST,
    GET_RECOMMENDATIONS,
    GET_RECOMMENDATION_GENRES,

    GET_MULTIPLE_EPISODES,
    GET_EPISODE,*/

  /**
    * TODO:
    * 1. Episode endpoints
    * 2. Follow endpoints
    * 3. Library endpoints
    * 4. Markets endpoints
    * 5. Personalization endpoints
    * 6. Player endpoints
    * 7. Playlists endpoints
    * 8. Shows endpoints
    * 9. Tracks endpoints
    * 10. User profile endpoints
    */
};
