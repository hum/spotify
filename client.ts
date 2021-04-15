import { AlbumObj, ArtistObj, SimplifiedAlbumObj } from "./types.ts";
import { endpoints, SearchType } from "./endpoints.ts";
import { Album, Artist, SimplifiedAlbum } from "./models/models.ts";
import { Caller, CallerOpt } from "./handlers/caller.ts";

export class Client {
  #caller: Caller;

  constructor(conf: CallerOpt) {
    this.#caller = new Caller(conf);
  }

  async getArtist(name: string, market?: string): Promise<Artist> {
    if (name.length == 0) {
      throw new Error("Parameter 'name' needs to be specified.");
    }
    if (!market) {
      market = "US";
    }

    const result = await this.#caller.fetch(
      endpoints.SEARCH(name, SearchType.Artist, market),
    );
    // This might not always be the correct item to pick.
    // It returns an array of values, picking the first one could be wrong. (?)
    const data = result["artists"]["items"][0] as ArtistObj;
    const artist = new Artist(data, this.#caller);
    return artist;
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
    if (name.length == 0) {
      throw new Error("Parameter 'id' needs to be specified.");
    }

    const result = await this.#caller.fetch(
      endpoints.SEARCH(name, SearchType.Album),
    );
    const data = result["albums"]["items"][0] as SimplifiedAlbumObj;
    const simpleAlbum = new SimplifiedAlbum(data, this.#caller);
    const album = await simpleAlbum.getAllData();
    return album;
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
}
