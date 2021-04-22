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

  async getAlbum(name: string): Promise<Album> {
    const id = await this.getAlbumId(name);
    return await this.getAlbumById({ id: id });
  }

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

  async getMultipleArtists(artists: Array<string>): Promise<Array<Artist>> {
    const result: Array<Artist> = [];
    for (const artist of artists) {
      const id = await this.getArtistId(artist);
      result.push(await this.getArtistById({ id: id }));
    }
    return result;
  }

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

  async getCategories(opts: opts.AllCategoriesOpt): Promise<Array<Category>> {
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

  async getCategory(opts: opts.CategoryOpt): Promise<Category> {
    const data: CategoryObj = await caller.fetch({
      url: endpoints.GET_CATEGORY(opts),
    });
    const category = new Category(data);
    return category;
  }

  async getRecommendations(
    opts: opts.RecommendationsOpt,
  ): Promise<RecommendationsObj> {
    const data: RecommendationsObj = await caller.fetch({
      url: endpoints.GET_RECOMMENDATIONS(opts),
    });
    return data;
  }

  async getRecommendationGenres(): Promise<Array<string>> {
    const data = await caller.fetch({
      url: endpoints.GET_RECOMMENDATION_GENRES(),
    });
    return data["genres"];
  }

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

  async getEpisode(name: string, market?: string): Promise<SimplifiedEpisode> {
    const data: SimplifiedEpisodeObj = await this.getEpisodeId(name, market);
    return new SimplifiedEpisode(data);
  }

  async getEpisodeById(opts: opts.EpisodeOpt): Promise<Episode> {
    const data = await caller.fetch({
      url: endpoints.GET_EPISODE(opts),
    });
    return new Episode(data);
  }

  async getAvailableMarkets(): Promise<Array<string>> {
    const data = await caller.fetch({
      url: endpoints.GET_AVAILABLE_MARKETS(),
    });
    return data["markets"] as Array<string>;
  }

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

  async getShow(name: string, market?: string): Promise<Show> {
    const data: Array<SimplifiedShowObj> = await this.rawSearch({
      q: name,
      type: SearchType.Show,
      market: market,
    });
    const simpleShow = new SimplifiedShow(data[0]);
    return simpleShow.getAllData();
  }

  async getShowById(opts: opts.ShowOpt): Promise<Show> {
    const data = await caller.fetch({
      url: endpoints.GET_SHOW(opts),
    });
    return new Show(data);
  }

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

  async getTrack(name: string, market?: string): Promise<Track> {
    const data: Array<TrackObj> = await this.rawSearch({
      q: name,
      type: SearchType.Track,
      market: market ?? "US",
    });
    return new Track(data[0]);
  }

  async getTrackById(opts: opts.TrackOpt): Promise<Track> {
    const data = await caller.fetch({ url: endpoints.GET_TRACK(opts) });
    return new Track(data);
  }

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

  async getAudioFeaturesForTrack(
    opts: opts.AudioFeaturesForTrackOpt,
  ): Promise<AudioFeatures> {
    const data = await caller.fetch({
      url: endpoints.GET_AUDIO_FEATURES_FOR_TRACK(opts),
    });
    return new AudioFeatures(data);
  }

  async getAudioAnalysis(id: string): Promise<AudioAnalysisObj> {
    const data = await caller.fetch({
      url: endpoints.GET_AUDIO_ANALYSIS_FOR_TRACK({ id: id }),
    });
    return data;
  }

  getPlayer(): Player {
    return new Player();
  }

  // TODO:
  // Expose raw endpoints
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
