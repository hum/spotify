import { SimplifiedArtist } from "./models.ts";
import {
  ExternalUrlObj,
  LinkedTrackObj,
  SimplifiedTrackObj,
  TrackRestrictionObj,
} from "../types.ts";

export class SimplifiedTrack {
  #data: SimplifiedTrackObj;

  constructor(data: SimplifiedTrackObj) {
    this.#data = data;
  }

  get artists(): Array<SimplifiedArtist> {
    const artists: Array<SimplifiedArtist> = [];
    for (const artist of this.#data.artists) {
      artists.push(new SimplifiedArtist(artist));
    }
    return artists;
  }

  get availableMarkets(): Array<string> {
    return this.#data.available_markets;
  }

  get discNumber(): number {
    return this.#data.disc_number;
  }

  get durationMs(): number {
    return this.#data.duration_ms;
  }

  get isExplicit(): boolean {
    return this.#data.explicit;
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

  get isLocal(): boolean {
    return this.#data.is_local;
  }

  get isPlayable(): boolean {
    return this.#data.is_playable;
  }

  get linkedFrom(): LinkedTrackObj {
    return this.#data.linked_from;
  }

  get name(): string {
    return this.#data.name;
  }

  get previewUrl(): string {
    return this.#data.preview_url;
  }

  get restrictions(): TrackRestrictionObj {
    return this.#data.restrictions;
  }

  get trackNumber(): number {
    return this.#data.track_number;
  }

  get type(): string {
    return this.#data.type;
  }

  get uri(): string {
    return this.#data.uri;
  }
}
