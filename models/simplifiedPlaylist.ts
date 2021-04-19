import { caller } from "../handlers/caller.ts";
import {
  ExternalUrlObj,
  ImageObj,
  PlaylistTrackObj,
  PublicUserObj,
  SimplifiedPlaylistObj,
} from "../types.ts";
import { PlaylistTrack } from "./models.ts";
import { endpoints } from "../endpoints.ts";

export class SimplifiedPlaylist {
  #data: SimplifiedPlaylistObj;

  constructor(data: SimplifiedPlaylistObj) {
    this.#data = data;
  }

  get isCollaborative(): boolean {
    return this.#data.collaborative;
  }

  get description(): string {
    return this.#data.description;
  }

  get externalUrls(): ExternalUrlObj {
    return this.#data.external_urls;
  }

  get href(): string {
    return this.#data.href;
  }

  get id(): string {
    return this.#data.id;
  }

  get images(): Array<ImageObj> {
    return this.#data.images;
  }

  get name(): string {
    return this.#data.name;
  }

  get owner(): PublicUserObj {
    return this.#data.owner;
  }

  get public(): boolean {
    return this.#data.public;
  }

  get snapshotId(): string {
    return this.#data.snapshot_id;
  }

  async getTracks(): Promise<Array<PlaylistTrack>> {
    const data = await caller.fetch(
      endpoints.GET_PLAYLIST_ITEMS(this.#data.id),
    );
    const playlistTracks: Array<PlaylistTrackObj> = data["items"];

    const result: Array<PlaylistTrack> = [];

    for (const track of playlistTracks) {
      result.push(new PlaylistTrack(track));
    }
    return result;
  }

  get type(): string {
    return this.#data.type;
  }

  get uri(): string {
    return this.#data.uri;
  }
}
