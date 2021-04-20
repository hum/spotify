import * as opts from "../opts/opts.ts";

const API_PREFIX = "https://api.spotify.com/v1";

const GET_MULTIPLE_ALBUMS = (opts: opts.MultipleAlbumsOpt) => {
  if (opts.ids.length > 20 || opts.ids.length == 0) {
    throw new Error(
      `Parameter 'ids' did not provide an array between the size of 1 and 20.`,
    );
  }

  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/albums`;

  query = format(query, params);
  return query;
};

const GET_ALBUM = (opts: opts.AlbumOpt) => {
  let query = `${API_PREFIX}/albums/${opts.id}`;
  const params: Record<string, string> = parseOpts(opts);

  query = format(query, params);
  return query;
};

const GET_ALBUM_TRACKS = (opts: opts.AlbumTracksOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/albums/${opts.id}/tracks`;

  query = format(query, params);
  return query;
};

const GET_MULTIPLE_ARTISTS = (opts: opts.MultipleArtists) => {
  let query = `${API_PREFIX}/artists`;
  const params: Record<string, string> = parseOpts(opts);
  query = format(query, params);
  return query;
};

const GET_ARTIST = (opts: opts.ArtistOpt) => {
  return `${API_PREFIX}/artists/${opts.id}`;
};

const GET_ARTIST_TOP_TRACKS = (opts: opts.ArtistTopTracksOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/artists/${opts.id}/top-tracks`;
  query = format(query, params);
  return query;
};

const GET_RELATED_ARTISTS = (opts: opts.RelatedArtistsOpt) => {
  return `${API_PREFIX}/artists/${opts.id}/related-artists`;
};

const GET_ARTISTS_ALBUMS = (opts: opts.ArtistAlbumsOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/artists/${opts.id}/albums`;

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

const SEARCH = (opts: opts.SearchOpt) => {
  opts.q = opts.q.replace(" ", "%20");

  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/search`;

  query = format(query, params);
  return query;
};

const GET_ALL_NEW_RELEASES = (opts: opts.NewReleasesOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/browse/new-releases`;

  query = format(query, params);
  return query;
};

const GET_ALL_FEATURED_PLAYLISTS = (opts: opts.AllFeaturedPlaylistsOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/browse/featured-playlists`;

  query = format(query, params);
  return query;
};

const GET_PLAYLIST_ITEMS = (opts: opts.PlaylistItemsOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/playlists/${opts.id}/tracks`;

  query = format(query, params);
  return query;
};

const GET_ALL_CATEGORIES = (opts: opts.AllCategoriesOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/browse/categories`;

  query = format(query, params);
  return query;
};

const GET_CATEGORY = (opts: opts.CategoryOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/browse/categories/${opts.id}`;

  query = format(query, params);
  return query;
};

const GET_CATEGORY_PLAYLISTS = (opts: opts.CategoryPlaylistsOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/browse/categories/${opts.id}/playlists`;

  query = format(query, params);
  return query;
};

const GET_RECOMMENDATIONS = (opts: opts.RecommendationsOpt) => {
  const params: Record<string, string> = parseOpts(opts);

  let query = `${API_PREFIX}/recommendations`;
  query = format(query, params);
  return query;
};

const GET_RECOMMENDATION_GENRES = () => {
  const query = `${API_PREFIX}/recommendations/available-genre-seeds`;
  return query;
};

const GET_MULTIPLE_EPISODES = (opts: opts.MultipleEpisodesOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/episodes`;
  query = format(query, params);
  return query;
};

const GET_EPISODE = (opts: opts.EpisodeOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/episodes/${opts.id}`;
  query = format(query, params);
  return query;
};

const GET_AVAILABLE_MARKETS = () => {
  return `${API_PREFIX}/markets`;
};

const GET_MULTIPLE_SHOWS = (opts: opts.MultipleShowsOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/shows`;
  query = format(query, params);
  return query;
};

const GET_SHOW = (opts: opts.ShowOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/shows/${opts.id}`;
  query = format(query, params);
  return query;
};

const GET_SHOW_EPISODES = (opts: opts.ShowEpisodesOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/shows/${opts.id}/episodes`;
  query = format(query, params);
  return query;
};

const GET_SEVERAL_TRACKS = (opts: opts.SeveralTracksOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/tracks`;
  query = format(query, params);
  return query;
};

const GET_TRACK = (opts: opts.TrackOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/tracks/${opts.id}`;
  query = format(query, params);
  return query;
};

const GET_AUDIO_FEATURES_FOR_SEVERAL_TRACKS = (
  opts: opts.AudioFeaturesForSeveralTracksOpt,
) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/audio-features`;
  query = format(query, params);
  return query;
};

const GET_AUDIO_FEATURES_FOR_TRACK = (opts: opts.AudioFeaturesForTrackOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/audio-features/${opts.id}`;
  query = format(query, params);
  return query;
};

const GET_AUDIO_ANALYSIS_FOR_TRACK = (opts: opts.AudioAnalysisForTrackOpt) => {
  const params: Record<string, string> = parseOpts(opts);
  let query = `${API_PREFIX}/audio-analysis/${opts.id}`;
  query = format(query, params);
  return query;
};

function parseOpts<T>(opts: T): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [k, v] of Object.entries(opts)) {
    let value = "";
    if (Array.isArray(v)) {
      value = v.join(",");
    } else {
      value = String(v);
    }
    result[toSnakeCase(k)] = value;
  }
  return result;
}

const format = (query: string, params: Record<string, string>) => {
  if (params == {}) {
    return query;
  }
  let result = "?";
  for (const [k, v] of Object.entries(params)) {
    result += `${k}=${v}&`;
  }
  return query.concat(result.substr(0, result.length - 1));
};

const toSnakeCase = (str: string) => {
  let result = "";
  let char = "";

  for (let i = 0; i < str.length; i++) {
    char = str[i];
    if (char == char.toUpperCase()) {
      char = char.toLowerCase();
      result += "_";
    }
    result += `${char}`;
  }
  return result;
};

export const endpoints = {
  GET_MULTIPLE_ALBUMS,
  GET_ALBUM,
  GET_ALBUM_TRACKS,

  GET_MULTIPLE_ARTISTS,
  GET_ARTIST,
  GET_ARTIST_TOP_TRACKS,
  GET_RELATED_ARTISTS,
  GET_ARTISTS_ALBUMS,

  GET_ALL_NEW_RELEASES,
  GET_ALL_FEATURED_PLAYLISTS,
  GET_ALL_CATEGORIES,
  GET_CATEGORY,
  GET_CATEGORY_PLAYLISTS,
  GET_RECOMMENDATIONS,
  GET_RECOMMENDATION_GENRES,

  GET_PLAYLIST_ITEMS,

  SEARCH,
  GET_MULTIPLE_EPISODES,
  GET_EPISODE,

  GET_AVAILABLE_MARKETS,
  GET_MULTIPLE_SHOWS,
  GET_SHOW,
  GET_SHOW_EPISODES,
  GET_SEVERAL_TRACKS,
  GET_TRACK,
  GET_AUDIO_FEATURES_FOR_SEVERAL_TRACKS,
  GET_AUDIO_FEATURES_FOR_TRACK,
  GET_AUDIO_ANALYSIS_FOR_TRACK,
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
