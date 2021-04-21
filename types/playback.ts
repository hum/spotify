import { caller } from "../handlers/caller.ts";
import { endpoints } from "../endpoints/endpoints.ts";
import { Episode, PlaybackContext, Track } from "./types.ts";
import {
  CurrentlyPlayingContextObj,
  CurrentlyPlayingObj,
  EpisodeObj,
  TrackObj,
} from "../structures/structs.ts";

export class Playback {
  #ctx: PlaybackContext | null;

  constructor(data: CurrentlyPlayingContextObj) {
    console.log(data);
    this.#ctx = new PlaybackContext(data);
  }

  get ctx(): PlaybackContext | null {
    return this.#ctx;
  }

  async transferToDevice(deviceId: string, play?: boolean) {
    await caller.fetch({
      url: endpoints.TRANSFER_PLAYBACK(),
      body: {
        device_ids: [deviceId],
        play: play ?? false,
      },
    });
    await this.refreshContext();
  }

  /**
     * TODO:
     * Unify naming conventions.
     * Track vs. Song
     * Track vs. Episode
     * Episode vs. Podcast
     * Podcast vs. Track
     */
  async getCurrentPlayingTrack(
    market?: string,
  ): Promise<Track | Episode | null> {
    const data: CurrentlyPlayingObj = await caller.fetch({
      url: endpoints.GET_USER_CURRENTLY_PLAYING_SONG({
        market: market ?? "US",
        additionalTypes: "episode",
      }),
    });
    if (data.currently_playing_type == "episode") {
      return new Episode(data.item as EpisodeObj);
    } else {
      return new Track(data.item as TrackObj);
    }
  }

  async startOrResume() {
    await this.refreshContext();
  }

  async play(deviceId?: string) {
    await this.refreshContext();

    if (this.#ctx == null || await this.isPlaying()) {
      return;
    }
    await caller.fetch({
      url: endpoints.START_RESUME_PLAYBACK({
        deviceId: deviceId ?? this.#ctx.device.id,
      }),
      method: "PUT",
    });
  }

  async isPlaying() {
    await this.refreshContext();
    return this.#ctx?.isPlaying;
  }

  async pause(deviceId?: string) {
    await this.refreshContext();

    if (this.#ctx == null || !(await this.isPlaying())) {
      return;
    }
    await caller.fetch({
      url: endpoints.PAUSE_USER_PLAYBACK({
        deviceId: deviceId ?? this.#ctx.device.id,
      }),
      method: "PUT",
    });
  }

  async nextTrack() {
    await this.refreshContext();
  }

  async previousTrack() {
    await this.refreshContext();
  }

  async jumpTo() {
    await this.refreshContext();
  }

  async setRepeatMode() {
    await this.refreshContext();
  }

  async setVolume() {
    await this.refreshContext();
  }

  async toggleShuffle() {
    await this.refreshContext();
  }

  async addItemToQueue() {
    await this.refreshContext();
  }

  async refreshContext(market?: string) {
    const data = await caller.fetch({
      url: endpoints.GET_USER_CURRENT_PLAYBACK({
        market: market ?? "US",
        additionalTypes: "episode",
      }),
    });
    this.#ctx = new PlaybackContext(data);
  }
}
