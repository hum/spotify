import { AudioFeaturesObj } from "../structures/structs.ts";

export class AudioFeatures {
  #data: AudioFeaturesObj;

  constructor(data: AudioFeaturesObj) {
    this.#data = data;
  }

  get acousticness(): number {
    return this.#data.acousticness;
  }
  get analysisUrl(): string {
    return this.#data.analysis_url;
  }
  get danceability(): number {
    return this.#data.danceability;
  }
  get durationMs(): number {
    return this.#data.duration_ms;
  }
  get energy(): number {
    return this.#data.energy;
  }
  get id(): string {
    return this.#data.id;
  }
  get instrumentalness(): number {
    return this.#data.instrumentalness;
  }
  get key(): number {
    return this.#data.key;
  }
  get liveness(): number {
    return this.#data.liveness;
  }
  get loudness(): number {
    return this.#data.loudness;
  }
  get mode(): number {
    return this.#data.mode;
  }
  get speechiness(): number {
    return this.#data.speechiness;
  }
  get tempo(): number {
    return this.#data.tempo;
  }
  get timeSignature(): number {
    return this.#data.time_signature;
  }
  get trackHref(): string {
    return this.#data.track_href;
  }
  get type(): string {
    return this.#data.type;
  }
  get uri(): string {
    return this.#data.uri;
  }
  get valence(): number {
    return this.#data.valence;
  }
}
