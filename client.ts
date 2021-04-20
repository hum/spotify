import {
  AlbumObj,
  ArtistObj,
  CategoryObj,
  RecommendationsObj,
  SimplifiedAlbumObj,
  SimplifiedEpisodeObj,
  SimplifiedPlaylistObj,
  SimplifiedShowObj,
  TrackObj,
} from "./types.ts";
import { endpoints, SearchType } from "./endpoints.ts";
import {
  Album,
  Artist,
  Category,
  Episode,
  SimplifiedAlbum,
  SimplifiedEpisode,
  SimplifiedPlaylist,
} from "./models/models.ts";
import { caller, CallerOpt } from "./handlers/caller.ts";
import * as opts from "./opts.ts";

export class Client {
  constructor(opt: CallerOpt) {
    caller.setCallerOpt(opt);
  }

  async getArtist(name: string): Promise<Artist> {
    const id = await this.getArtistId(name);
    return await this.getArtistById({ id: id });
  }

  async getArtistById(opts: opts.ArtistOpt): Promise<Artist> {
    if (opts.id.length == 0) {
      throw new Error("Parameter 'id' needs to be specified");
    }

    const result: ArtistObj = await caller.fetch(
      endpoints.GET_ARTIST(opts),
    );

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
    const result: AlbumObj = await caller.fetch(
      endpoints.GET_ALBUM(opts),
    );
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

    const data = await caller.fetch(
      endpoints.GET_MULTIPLE_ALBUMS({ ids: ids, market: market ?? "US" }),
    );
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

    const data = await caller.fetch(
      endpoints.SEARCH({ q: name, type: SearchType.Album }),
    );
    const album: AlbumObj = data["albums"]["items"][0];
    return album.id;
  }

  private async getArtistId(name: string): Promise<string> {
    if (name.length == 0) {
      throw new Error("Parameter 'name' needs to be specified.");
    }
    const data = await caller.fetch(
      endpoints.SEARCH({ q: name, type: SearchType.Artist }),
    );
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

    const data = await caller.fetch(
      endpoints.GET_ALL_NEW_RELEASES(opts ?? {}),
    );

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

    const data = await caller.fetch(
      endpoints.GET_ALL_FEATURED_PLAYLISTS(opts ?? {}),
    );

    const playlists: Array<SimplifiedPlaylistObj> = data["playlists"].items;

    for (const playlist of playlists) {
      result.push(new SimplifiedPlaylist(playlist));
    }
    return result;
  }

  async getCategories(opts: opts.AllCategoriesOpt): Promise<Array<Category>> {
    const data = await caller.fetch(
      endpoints.GET_ALL_CATEGORIES(opts),
    );

    const categories: Array<CategoryObj> = data["categories"]["items"];

    const result: Array<Category> = [];
    for (const category of categories) {
      result.push(new Category(category));
    }
    return result;
  }

  async getCategory(opts: opts.CategoryOpt): Promise<Category> {
    const data: CategoryObj = await caller.fetch(
      endpoints.GET_CATEGORY(opts),
    );
    const category = new Category(data);
    return category;
  }

  async getRecommendations(
    opts: opts.RecommendationsOpt,
  ): Promise<RecommendationsObj> {
    const data: RecommendationsObj = await caller.fetch(
      endpoints.GET_RECOMMENDATIONS(opts),
    );
    return data;
  }

  async getRecommendationGenres(): Promise<Array<string>> {
    const data = await caller.fetch(endpoints.GET_RECOMMENDATION_GENRES());
    return data["genres"];
  }

  async getMultipleEpisodes(
    opts: opts.MultipleEpisodesOpt,
  ): Promise<Array<Episode>> {
    const data = await caller.fetch(endpoints.GET_MULTIPLE_EPISODES(opts));
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
    const data = await caller.fetch(endpoints.SEARCH({
      q: name,
      type: SearchType.Episode,
      market: market ?? "US",
    }));
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
    const data = await caller.fetch(endpoints.GET_EPISODE(opts));
    return new Episode(data);
  }

  // TODO:
  // Expose raw endpoints
  async rawSearch(
    opts: opts.SearchOpt,
  ): Promise<
    | Array<ArtistObj>
    | Array<SimplifiedAlbumObj>
    | Array<TrackObj>
    | Array<SimplifiedShowObj>
    | Array<SimplifiedEpisodeObj>
  > {
    const data = await caller.fetch(endpoints.SEARCH(opts));
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
