import {
  AlbumObj,
  ArtistObj,
  AudioAnalysisObj,
  CategoryObj,
  RecommendationsObj,
  SimplifiedAlbumObj,
  SimplifiedEpisodeObj,
  SimplifiedPlaylistObj,
  SimplifiedShowObj,
  TrackObj,
} from "./structures/structs.ts";
import { endpoints } from "./endpoints/endpoints.ts";
import {
  Album,
  Artist,
  AudioFeatures,
  Category,
  Episode,
  Player,
  PrivateUser,
  PublicUser,
  Show,
  SimplifiedAlbum,
  SimplifiedEpisode,
  SimplifiedPlaylist,
  SimplifiedShow,
  Track,
} from "./types/types.ts";
import { caller, CallerOpt } from "./handlers/caller.ts";
import * as opts from "./opts/opts.ts";
import { SearchType } from "./opts/opts.ts";

export class Client {
  constructor(opt: CallerOpt) {
    caller.setCallerOpt(opt);
  }

  /**
   * Get information for a single artist
   * @param name Name of the artist
   * @param market Optional 2 letter country code
   * @returns Artist
   */
  async getArtist(name: string, market?: string): Promise<Artist> {
    if (!name) {
      throw new Error("Parameter 'name' needs to be specified");
    }
    const artist = await this.rawSearch({
      q: name,
      type: SearchType.Artist,
      market: market ?? "US",
    });
    return new Artist(artist[0]);
  }

  /**
   * Get information for a single artist.
   * @param opts Parameters passed to the endpoint
   * @example opts = {id: '123'}
   * @returns Artist
   */
  async getArtistById(opts: opts.ArtistOpt): Promise<Artist> {
    if (opts.id.length == 0) {
      throw new Error("Parameter 'id' needs to be specified");
    }

    const result: ArtistObj = await caller.fetch({
      url: endpoints.GET_ARTIST(opts),
    });

    const artist = new Artist(result);
    return artist;
  }

  /**
   * Get information for a single album.
   * @param name Name of the album
   * @returns Album
   */
  async getAlbum(name: string): Promise<Album> {
    const id = await this.getAlbumId(name);
    return await this.getAlbumById({ id: id });
  }

  /**
   * Get information for a single album.
   * @param opts Parameters passed to the endpoint
   * @example opts = {id: '123'}
   * @returns Album
   */
  async getAlbumById(opts: opts.AlbumOpt): Promise<Album> {
    if (opts.id.length == 0) {
      throw new Error("Parameter 'id' needs to be specified.");
    }
    const result: AlbumObj = await caller.fetch({
      url: endpoints.GET_ALBUM(opts),
    });
    const album = new Album(result);
    return album;
  }

  /**
   * Get catalog information for multiple albums.
   * @param albums Array of Spotify IDs of the albums.
   * @param market Optional 2 letter country code
   * @returns Array 
   * @throws Error 'albums' not specified.
   */
  async getMultipleAlbums(
    albums: Array<string>,
    market?: string,
  ): Promise<Array<Album>> {
    if (albums.length == 0) {
      throw new Error("Parameter 'albums' needs to be specified.");
    }

    const ids: Array<string> = [];
    for (const album of albums) {
      const id = await this.getAlbumId(album);
      ids.push(id);
    }

    const data = await caller.fetch({
      url: endpoints.GET_MULTIPLE_ALBUMS({ ids: ids, market: market ?? "US" }),
    });
    const values: Array<AlbumObj> = data["albums"];

    const result: Array<Album> = [];
    for (const album of values) {
      result.push(new Album(album));
    }
    return result;
  }

  private async getAlbumId(name: string): Promise<string> {
    if (name.length == 0) {
      throw new Error("Parameter 'name' needs to be specified.");
    }

    const data = await caller.fetch({
      url: endpoints.SEARCH({ q: name, type: SearchType.Album }),
    });
    const album: AlbumObj = data["albums"]["items"][0];
    return album.id;
  }

  private async getArtistId(name: string): Promise<string> {
    if (name.length == 0) {
      throw new Error("Parameter 'name' needs to be specified.");
    }
    const data = await caller.fetch({
      url: endpoints.SEARCH({ q: name, type: SearchType.Artist }),
    });
    const value: ArtistObj = data["artists"]["items"][0];
    return value.id;
  }

  /**
   * Get catalog information for several artists.
   * @param artists Array of Spotify IDs for the given artists.
   * @returns Array
   */
  async getMultipleArtists(artists: Array<string>): Promise<Array<Artist>> {
    const result: Array<Artist> = [];
    for (const artist of artists) {
      const id = await this.getArtistId(artist);
      result.push(await this.getArtistById({ id: id }));
    }
    return result;
  }

  /**
   * Get a list of new album releases featured in Spotify
   * (shown, for example, on a Spotify player's "Browse" tab)
   * @param opts Parameters passed to the endpoint
   * @returns Array
   */
  async getNewReleases(
    opts?: opts.NewReleasesOpt,
  ): Promise<Array<SimplifiedAlbum>> {
    const result: Array<SimplifiedAlbum> = [];

    const data = await caller.fetch({
      url: endpoints.GET_ALL_NEW_RELEASES(opts ?? {}),
    });

    const albums: Array<SimplifiedAlbumObj> = data["albums"].items;

    for (const album of albums) {
      result.push(new SimplifiedAlbum(album));
    }
    return result;
  }

  /**
   * Get a list of Spotify featured playlists
   * (shown, for example, on a Spotify player's "Browse" tab)
   * @param opts Parameters passed to the endpoint
   * @returns Array
   */
  async getFeaturedPlaylists(
    opts?: opts.AllFeaturedPlaylistsOpt,
  ): Promise<Array<SimplifiedPlaylist>> {
    const result: Array<SimplifiedPlaylist> = [];

    const data = await caller.fetch({
      url: endpoints.GET_ALL_FEATURED_PLAYLISTS(opts ?? {}),
    });

    const playlists: Array<SimplifiedPlaylistObj> = data["playlists"].items;

    for (const playlist of playlists) {
      result.push(new SimplifiedPlaylist(playlist));
    }
    return result;
  }

  /**
   * Get a list of categories used to tag items in Spotify
   * (on, for example, the Spotify player's "Browse" tab).
   * @param opts Parameters passed to the endpoint
   * @returns Array
   */
  async getCategories(opts?: opts.AllCategoriesOpt): Promise<Array<Category>> {
    const data = await caller.fetch({
      url: endpoints.GET_ALL_CATEGORIES(opts),
    });

    const categories: Array<CategoryObj> = data["categories"]["items"];

    const result: Array<Category> = [];
    for (const category of categories) {
      result.push(new Category(category));
    }
    return result;
  }

  /**
   * Get a single category used to tag items in Spotify
   * (on, for example, the Spotify player's "Browse" tab).
   * @param opts Parameters passed to the endpoint
   * @example opts = {categoryId: '123'}
   * @returns Category
   */
  async getCategory(opts: opts.CategoryOpt): Promise<Category> {
    const data: CategoryObj = await caller.fetch({
      url: endpoints.GET_CATEGORY(opts),
    });
    const category = new Category(data);
    return category;
  }

  /**
   * Recommendations are generated based on the available information.
   * @param opts - Parameters passed to the endpoint
   * @returns RecommendationsObj 
   */
  async getRecommendations(
    opts: opts.RecommendationsOpt,
  ): Promise<RecommendationsObj> {
    const data: RecommendationsObj = await caller.fetch({
      url: endpoints.GET_RECOMMENDATIONS(opts),
    });
    return data;
  }

  /**
   * Retrieve a list of available genres.
   * @returns Array
   */
  async getRecommendationGenres(): Promise<Array<string>> {
    const data = await caller.fetch({
      url: endpoints.GET_RECOMMENDATION_GENRES(),
    });
    return data["genres"];
  }

  /**
   * Get information for several episodes
   * @param opts Parameter passed to the endpoint
   * @example opts = {ids: ['123', '456']}
   * @returns Array
   */
  async getMultipleEpisodes(
    opts: opts.MultipleEpisodesOpt,
  ): Promise<Array<Episode>> {
    const data = await caller.fetch({
      url: endpoints.GET_MULTIPLE_EPISODES(opts),
    });
    const result: Array<Episode> = [];

    for (const episode of data["episodes"]) {
      result.push(new Episode(episode));
    }
    return result;
  }

  private async getEpisodeId(
    name: string,
    market?: string,
  ): Promise<SimplifiedEpisodeObj> {
    const data = await caller.fetch({
      url: endpoints.SEARCH({
        q: name,
        type: SearchType.Episode,
        market: market ?? "US",
      }),
    });
    // TODO:
    // Return an array instead?
    const result = data["episodes"]["items"][0];
    return result;
  }
  /**
   * Get information for a single episode.
   * @param name Name of the episode
   * @param market Optional 2 letter country code 
   * @returns SimplifiedEpisode
   */
  async getEpisode(name: string, market?: string): Promise<SimplifiedEpisode> {
    const data: SimplifiedEpisodeObj = await this.getEpisodeId(name, market);
    return new SimplifiedEpisode(data);
  }

  /**
   * Get information for a single episode.
   * @param opts Params passed to the endpoint
   * @example opts = {id: '123'}
   * @returns Episode
   */
  async getEpisodeById(opts: opts.EpisodeOpt): Promise<Episode> {
    const data = await caller.fetch({
      url: endpoints.GET_EPISODE(opts),
    });
    return new Episode(data);
  }

  /**
   * Get the list of markets where Spotify is available.
   * @returns Array
   */
  async getAvailableMarkets(): Promise<Array<string>> {
    const data = await caller.fetch({
      url: endpoints.GET_AVAILABLE_MARKETS(),
    });
    return data["markets"] as Array<string>;
  }

  /**
   * Get information for several shows.
   * @param opts Parameters passed to the endpoint
   * @example opts = {id: '123'}
   * @returns Array
   */
  async getMultipleShows(
    opts: opts.MultipleShowsOpt,
  ): Promise<Array<SimplifiedShow>> {
    const result: Array<SimplifiedShow> = [];
    const data = await caller.fetch({
      url: endpoints.GET_MULTIPLE_SHOWS(opts),
    });
    for (const show of data["shows"]) {
      result.push(new SimplifiedShow(show));
    }
    return result;
  }

  /**
   * Get Spotify catalog information for a single show.
   * @param name Name of the show
   * @param market Optional 2 letter country code
   * @returns Show 
   */
  async getShow(name: string, market?: string): Promise<Show> {
    const data: Array<SimplifiedShowObj> = await this.rawSearch({
      q: name,
      type: SearchType.Show,
      market: market,
    });
    const simpleShow = new SimplifiedShow(data[0]);
    return simpleShow.getAllData();
  }

  /**
   * Get Spotify catalog information for a single show.
   * @param opts Parameters passed to the endpoint
   * @example opts = {id: '123'} 
   * @returns Show
   */
  async getShowById(opts: opts.ShowOpt): Promise<Show> {
    const data = await caller.fetch({
      url: endpoints.GET_SHOW(opts),
    });
    return new Show(data);
  }

  /**
   * Get Spotify catalog information for multiple tracks.
   * @param opts - Params passed to the endpoint
   * @example opts = {ids: ['123', '456']}
   * @returns Array 
   */
  async getSeveralTracks(opts: opts.SeveralTracksOpt): Promise<Array<Track>> {
    const data = await caller.fetch({
      url: endpoints.GET_SEVERAL_TRACKS(opts),
    });
    const result: Array<Track> = [];

    for (const track of data["tracks"]) {
      result.push(new Track(track));
    }
    return result;
  }

  /**
   * Get Spotify catalog information for a single track.
   * @param name Name of the track
   * @param market - Optional 2 letter country code
   * @returns Track
   */
  async getTrack(name: string, market?: string): Promise<Track> {
    const data: Array<TrackObj> = await this.rawSearch({
      q: name,
      type: SearchType.Track,
      market: market ?? "US",
    });
    return new Track(data[0]);
  }

  /**
   * Get Spotify catalog information for a single track.
   * @param opts Parameters passed to the endpoint
   * @example opts = {id: '123'}
   * @example opts = {id: '12345', market: "US"}
   * @returns Track
   */
  async getTrackById(opts: opts.TrackOpt): Promise<Track> {
    const data = await caller.fetch({ url: endpoints.GET_TRACK(opts) });
    return new Track(data);
  }

  /**
   * Get audio features for multiple tracks.
   * @param opts Parameters passed to the endpoint.
   * @example opts = {ids: ['1', '2']}
   * @returns Array<AudioFeatures>
   */
  async getAudioFeaturesForSeveralTracks(
    opts: opts.AudioFeaturesForSeveralTracksOpt,
  ): Promise<Array<AudioFeatures>> {
    const result: Array<AudioFeatures> = [];
    const data = await caller.fetch({
      url: endpoints.GET_AUDIO_FEATURES_FOR_SEVERAL_TRACKS(opts),
    });

    for (const audioFeature of data) {
      result.push(new AudioFeatures(audioFeature));
    }
    return result;
  }

  /**
   * Get audio feature information for a single track.
   * @param opts Parameters passed to the endpoint
   * @example opts = {id: '123'}
   * @returns AudioFeatures
   */
  async getAudioFeaturesForTrack(
    opts: opts.AudioFeaturesForTrackOpt,
  ): Promise<AudioFeatures> {
    const data = await caller.fetch({
      url: endpoints.GET_AUDIO_FEATURES_FOR_TRACK(opts),
    });
    return new AudioFeatures(data);
  }

  /**
   * Get a detailed audio analysis for a single track.
   * @param id Spotify ID of the track
   * @returns AudioAnalysisObj
   */
  async getAudioAnalysis(id: string): Promise<AudioAnalysisObj> {
    const data = await caller.fetch({
      url: endpoints.GET_AUDIO_ANALYSIS_FOR_TRACK({ id: id }),
    });
    return data;
  }

  /**
   * Get an instance of the Player API client.
   * @returns Player
   */
  getPlayer(): Player {
    return new Player();
  }

  /**
   * Get detailed profile information about the current user 
   * (including the current user's username).
   * @returns PrivateUser
   */
  async getCurrentUser(): Promise<PrivateUser> {
    const data = await caller.fetch({
      url: endpoints.GET_CURRENT_USER(),
    });

    return new PrivateUser(data);
  }

  /**
   * Get public profile information about a Spotify user.
   * @param userId - Spotify ID of the specific user.
   * @returns PublicUser
   */
  async getUser(userId: string): Promise<PublicUser> {
    const data = await caller.fetch({
      url: endpoints.GET_USER_PROFILE({
        userId: userId,
      }),
    });
    return new PublicUser(data);
  }

  async getUsersPlaylists(
    userId: string,
    opts?: opts.UserPlaylistOpts,
  ): Promise<Array<SimplifiedPlaylist>> {
    const data: Array<SimplifiedPlaylistObj> = (await caller.fetch({
      url: endpoints.GET_USER_PLAYLISTS(userId, opts),
    }))["items"];

    const result: Array<SimplifiedPlaylist> = [];
    for (const playlist of data) {
      result.push(new SimplifiedPlaylist(playlist));
    }
    return result;
  }

  async checkFollowsPlaylist(
    playlistId: string,
    userIds: Array<string>,
  ): Promise<Array<boolean>> {
    const data: Array<boolean> = await caller.fetch({
      url: endpoints.CHECK_FOLLOWS_PLAYLIST(playlistId, userIds),
    });
    return data;
  }

  async followPlaylist(opts: opts.FollowPlaylistOpts) {
    await caller.fetch({
      url: endpoints.FOLLOW_PLAYLIST(opts.playlistId),
      method: "PUT",
      body: {
        public: opts.public ?? false,
      },
    });
  }

  async unfollowPlaylist(playlistId: string) {
    await caller.fetch({
      url: endpoints.UNFOLLOW_PLAYLIST(playlistId),
      method: "DELETE",
    });
  }

  /**
   * Get information about albums, artists, playlists, tracks, shows or episodes
   * that match a keyword string 
   * @param opts Parameters passed to the function
   * @example opts = {q: "aaa", type: SearchType.ARTIST}
   * @returns Array 
   */
  async rawSearch(
    opts: opts.SearchOpt,
    // deno-lint-ignore no-explicit-any
  ): Promise<Array<any>> {
    const data = await caller.fetch({ url: endpoints.SEARCH(opts) });
    switch (opts.type) {
      case SearchType.Album: {
        return data["albums"].items as Array<SimplifiedAlbumObj>;
      }
      case SearchType.Artist: {
        return data["artists"].items as Array<ArtistObj>;
      }
      case SearchType.Episode: {
        return data["tracks"].items as Array<TrackObj>;
      }
      case SearchType.Playlist: {
        break;
      }
      case SearchType.Show: {
        return data["shows"].items as Array<SimplifiedShowObj>;
      }
      case SearchType.Track: {
        return data["tracks"].items as Array<TrackObj>;
      }
    }
    return [];
  }
}
