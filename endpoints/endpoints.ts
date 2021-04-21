import * as opts from "../opts/opts.ts";
import { format, parseOpts } from "../utils/utils.ts";

const API_PREFIX = "https://api.spotify.com/v1";

const GET_MULTIPLE_ALBUMS = (opts: opts.MultipleAlbumsOpt) => {
  if (opts.ids.length > 20 || opts.ids.length == 0) {
    throw new Error(
      `Parameter 'ids' did not provide an array between the size of 1 and 20.`,
    );
  }
  const query = `${API_PREFIX}/albums`;
  return format(query, parseOpts(opts));
};

const GET_ALBUM = (opts: opts.AlbumOpt) => {
  const query = `${API_PREFIX}/albums/${opts.id}`;
  return format(query, parseOpts(opts));
};

const GET_ALBUM_TRACKS = (opts: opts.AlbumTracksOpt) => {
  const query = `${API_PREFIX}/albums/${opts.id}/tracks`;
  return format(query, parseOpts(opts));
};

const GET_MULTIPLE_ARTISTS = (opts: opts.MultipleArtists) => {
  const query = `${API_PREFIX}/artists`;
  return format(query, parseOpts(opts));
};

const GET_ARTIST = (opts: opts.ArtistOpt) => {
  return `${API_PREFIX}/artists/${opts.id}`;
};

const GET_ARTIST_TOP_TRACKS = (opts: opts.ArtistTopTracksOpt) => {
  const query = `${API_PREFIX}/artists/${opts.id}/top-tracks`;
  return format(query, parseOpts(opts));
};

const GET_RELATED_ARTISTS = (opts: opts.RelatedArtistsOpt) => {
  return `${API_PREFIX}/artists/${opts.id}/related-artists`;
};

const GET_ARTISTS_ALBUMS = (opts: opts.ArtistAlbumsOpt) => {
  const query = `${API_PREFIX}/artists/${opts.id}/albums`;
  return format(query, parseOpts(opts));
};

const SEARCH = (opts: opts.SearchOpt) => {
  const query = `${API_PREFIX}/search`;
  opts.q = opts.q.replace(" ", "%20");

  return format(query, parseOpts(opts));
};

const GET_ALL_NEW_RELEASES = (opts: opts.NewReleasesOpt) => {
  const query = `${API_PREFIX}/browse/new-releases`;
  return format(query, parseOpts(opts));
};

const GET_ALL_FEATURED_PLAYLISTS = (opts: opts.AllFeaturedPlaylistsOpt) => {
  const query = `${API_PREFIX}/browse/featured-playlists`;
  return format(query, parseOpts(opts));
};

const GET_PLAYLIST_ITEMS = (opts: opts.PlaylistItemsOpt) => {
  const query = `${API_PREFIX}/playlists/${opts.id}/tracks`;
  return format(query, parseOpts(opts));
};

const GET_ALL_CATEGORIES = (opts: opts.AllCategoriesOpt) => {
  const query = `${API_PREFIX}/browse/categories`;
  return format(query, parseOpts(opts));
};

const GET_CATEGORY = (opts: opts.CategoryOpt) => {
  const query = `${API_PREFIX}/browse/categories/${opts.id}`;
  return format(query, parseOpts(opts));
};

const GET_CATEGORY_PLAYLISTS = (opts: opts.CategoryPlaylistsOpt) => {
  const query = `${API_PREFIX}/browse/categories/${opts.id}/playlists`;
  return format(query, parseOpts(opts));
};

const GET_RECOMMENDATIONS = (opts: opts.RecommendationsOpt) => {
  const query = `${API_PREFIX}/recommendations`;
  return format(query, parseOpts(opts));
};

const GET_RECOMMENDATION_GENRES = () => {
  const query = `${API_PREFIX}/recommendations/available-genre-seeds`;
  return query;
};

const GET_MULTIPLE_EPISODES = (opts: opts.MultipleEpisodesOpt) => {
  const query = `${API_PREFIX}/episodes`;
  return format(query, parseOpts(opts));
};

const GET_EPISODE = (opts: opts.EpisodeOpt) => {
  const query = `${API_PREFIX}/episodes/${opts.id}`;
  return format(query, parseOpts(opts));
};

const GET_AVAILABLE_MARKETS = () => {
  const query = `${API_PREFIX}/markets`;
  return query;
};

const GET_MULTIPLE_SHOWS = (opts: opts.MultipleShowsOpt) => {
  const query = `${API_PREFIX}/shows`;
  return format(query, parseOpts(opts));
};

const GET_SHOW = (opts: opts.ShowOpt) => {
  const query = `${API_PREFIX}/shows/${opts.id}`;
  return format(query, parseOpts(opts));
};

const GET_SHOW_EPISODES = (opts: opts.ShowEpisodesOpt) => {
  const query = `${API_PREFIX}/shows/${opts.id}/episodes`;
  return format(query, parseOpts(opts));
};

const GET_SEVERAL_TRACKS = (opts: opts.SeveralTracksOpt) => {
  const query = `${API_PREFIX}/tracks`;
  return format(query, parseOpts(opts));
};

const GET_TRACK = (opts: opts.TrackOpt) => {
  const query = `${API_PREFIX}/tracks/${opts.id}`;
  return format(query, parseOpts(opts));
};

const GET_AUDIO_FEATURES_FOR_SEVERAL_TRACKS = (
  opts: opts.AudioFeaturesForSeveralTracksOpt,
) => {
  const query = `${API_PREFIX}/audio-features`;
  return format(query, parseOpts(opts));
};

const GET_AUDIO_FEATURES_FOR_TRACK = (opts: opts.AudioFeaturesForTrackOpt) => {
  const query = `${API_PREFIX}/audio-features/${opts.id}`;
  return format(query, parseOpts(opts));
};

const GET_AUDIO_ANALYSIS_FOR_TRACK = (opts: opts.AudioAnalysisForTrackOpt) => {
  const query = `${API_PREFIX}/audio-analysis/${opts.id}`;
  return format(query, parseOpts(opts));
};

const GET_USER_CURRENT_PLAYBACK = (opts: opts.UserCurrentPlaybackOpt) => {
  const query = `${API_PREFIX}/me/player`;
  return format(query, parseOpts(opts));
};

const GET_USER_DEVICES = () => {
  return `${API_PREFIX}/me/player/devices`;
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

  GET_USER_CURRENT_PLAYBACK,
  GET_USER_DEVICES,
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
