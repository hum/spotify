import {
  AlbumObj,
  ArtistObj,
  CategoryObj,
  SimplifiedAlbumObj,
  SimplifiedPlaylistObj,
} from "./types.ts";
import { endpoints, SearchType } from "./endpoints.ts";
import {
  Album,
  Artist,
  Category,
  SimplifiedAlbum,
  SimplifiedPlaylist,
} from "./models/models.ts";
import { Caller, CallerOpt } from "./handlers/caller.ts";

export class Client {
  #caller: Caller;

  constructor(conf: CallerOpt) {
    this.#caller = new Caller(conf);
  }

  async getArtist(name: string): Promise<Artist> {
    const id = await this.getArtistId(name);
    return await this.getArtistById(id);
  }

  async getArtistById(id: string): Promise<Artist> {
    if (id.length == 0) {
      throw new Error("Parameter 'id' needs to be specified");
    }

    const result: ArtistObj = await this.#caller.fetch(
      endpoints.GET_ARTIST(id),
    );

    const artist = new Artist(result, this.#caller);
    return artist;
  }

  async getAlbum(name: string): Promise<Album> {
    const id = await this.getAlbumId(name);
    return await this.getAlbumById(id);
  }

  async getAlbumById(id: string, market?: string): Promise<Album> {
    if (id.length == 0) {
      throw new Error("Parameter 'id' needs to be specified.");
    }
    const result: AlbumObj = await this.#caller.fetch(
      endpoints.GET_ALBUM(id, market),
    );
    const album = new Album(result, this.#caller);
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

    const data = await this.#caller.fetch(
      endpoints.GET_MULTIPLE_ALBUMS(ids, market),
    );
    const values: Array<AlbumObj> = data["albums"];

    const result: Array<Album> = [];
    for (const album of values) {
      result.push(new Album(album, this.#caller));
    }
    return result;
  }

  private async getAlbumId(name: string): Promise<string> {
    if (name.length == 0) {
      throw new Error("Parameter 'name' needs to be specified.");
    }

    const data = await this.#caller.fetch(
      endpoints.SEARCH(name, SearchType.Album),
    );
    const album: AlbumObj = data["albums"]["items"][0];
    return album.id;
  }

  private async getArtistId(name: string): Promise<string> {
    if (name.length == 0) {
      throw new Error("Parameter 'name' needs to be specified.");
    }
    const data = await this.#caller.fetch(
      endpoints.SEARCH(name, SearchType.Artist),
    );
    const value: ArtistObj = data["artists"]["items"][0];
    return value.id;
  }

  async getMultipleArtists(artists: Array<string>): Promise<Array<Artist>> {
    const result: Array<Artist> = [];
    for (const artist of artists) {
      const id = await this.getArtistId(artist);
      result.push(await this.getArtistById(id));
    }
    return result;
  }

  async getNewReleases(
    country?: string,
    limit?: number,
    offset?: number,
  ): Promise<Array<SimplifiedAlbum>> {
    const result: Array<SimplifiedAlbum> = [];

    const data = await this.#caller.fetch(
      endpoints.GET_ALL_NEW_RELEASES(country, limit, offset),
    );

    const albums: Array<SimplifiedAlbumObj> = data["albums"].items;

    for (const album of albums) {
      result.push(new SimplifiedAlbum(album, this.#caller));
    }
    return result;
  }

  async getFeaturedPlaylists(
    country?: string,
    locale?: string,
    timestamp?: string,
    limit?: number,
    offset?: number,
  ): Promise<Array<SimplifiedPlaylist>> {
    const result: Array<SimplifiedPlaylist> = [];

    const data = await this.#caller.fetch(
      endpoints.GET_ALL_FEATURED_PLAYLISTS(
        country,
        locale,
        timestamp,
        limit,
        offset,
      ),
    );

    const playlists: Array<SimplifiedPlaylistObj> = data["playlists"].items;

    for (const playlist of playlists) {
      result.push(new SimplifiedPlaylist(playlist, this.#caller));
    }
    return result;
  }

  async getCategories(
    country?: string,
    locale?: string,
    limit?: number,
    offset?: number,
  ): Promise<Array<Category>> {
    const data = await this.#caller.fetch(
      endpoints.GET_ALL_CATEGORIES(country, locale, limit, offset),
    );

    const categories: Array<CategoryObj> = data["categories"]["items"];

    const result: Array<Category> = [];
    for (const category of categories) {
      result.push(new Category(category, this.#caller));
    }
    return result;
  }

  async getCategory(
    id: string,
    country?: string,
    locale?: string,
  ): Promise<Category> {
    const data: CategoryObj = await this.#caller.fetch(
      endpoints.GET_CATEGORY(id, country, locale),
    );
    const category = new Category(data, this.#caller);
    return category;
  }
}
