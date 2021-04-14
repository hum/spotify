import {
  AlbumObj,
  ArtistObj,
  ExternalUrlObj,
  FollowersObj,
  ImageObj,
} from "../types.ts";
import { Caller } from "../handlers/caller.ts";
import { endpoints } from "../endpoints.ts";

export class Artist implements ArtistObj {
  externalUrls: ExternalUrlObj;
  followers: FollowersObj;
  genres: Array<string>;
  href: string;
  id: string;
  images: Array<ImageObj>;
  name: string;
  popularity: number;
  type: string;
  uri: string;
  #caller: Caller;

  constructor(data: ArtistObj, caller: Caller) {
    this.externalUrls = data.externalUrls,
      this.followers = data.followers,
      this.genres = data.genres,
      this.href = data.href,
      this.id = data.id,
      this.images = data.images,
      this.name = data.name,
      this.popularity = data.popularity,
      this.type = data.type;
    this.uri = data.uri;
    this.#caller = caller;
  }

  /**
   * @param includeGroups A string array of keywords to filter the response - album | single | appears_on | compilation
   * @param market Synonym for 'country'. ISO 3166-1 alpha-2 country code. 
   * @param limit The number of objects to return
   * @param offset The index of the first album to return.
   * @default market="US", offset=0, limit=2
   * @returns An array of AlbumObj items from the specific artist. 
   */
  async getAlbums(
    includeGroups?: Array<string>,
    market?: string,
    limit?: number,
    offset?: number,
  ): Promise<Array<AlbumObj>> {
    const data = await this.#caller.fetch(
      endpoints.GET_ARTISTS_ALBUMS(
        this.id,
        includeGroups,
        market,
        limit,
        offset,
      ),
    );

    let result: AlbumObj[] = data["items"];
    result = result.filter((value, _x, _y) => {
      return value.album_type == "album";
    });
    return result;
  }
}
