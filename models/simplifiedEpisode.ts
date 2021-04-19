import {
  ExternalUrlObj,
  ImageObj,
  ResumePointObj,
  SimplifiedEpisodeObj,
} from "../types.ts";

export class SimplifiedEpisode {
  #data: SimplifiedEpisodeObj;

  constructor(data: SimplifiedEpisodeObj) {
    this.#data = data;
  }

  get audioPreviewUrl(): string {
    return this.#data.audio_preview_url;
  }

  get description(): string {
    return this.#data.description;
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

  get images(): Array<ImageObj> {
    return this.#data.images;
  }

  get isExternallyHosted(): boolean {
    return this.#data.is_externally_hosted;
  }

  get isPlayable(): boolean {
    return this.#data.is_playable;
  }

  get languages(): Array<string> {
    return this.#data.languages;
  }

  get name(): string {
    return this.#data.name;
  }

  get releaseDate(): string {
    return this.#data.release_date;
  }

  get releaseDatePrecision(): string {
    return this.#data.release_date_precision;
  }

  get resumePoint(): ResumePointObj {
    return this.#data.resume_point;
  }

  get type(): string {
    return this.#data.type;
  }

  get uri(): string {
    return this.#data.uri;
  }
}
