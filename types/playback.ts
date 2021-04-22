import { caller } from "../handlers/caller.ts";
import { endpoints } from "../endpoints/endpoints.ts";
import { Episode, PlaybackContext, Track } from "./types.ts";
import {
  CurrentlyPlayingContextObj,
  CurrentlyPlayingObj,
  EpisodeObj,
  TrackObj,
} from "../structures/structs.ts";

export enum RepeatState {
  TRACK = "track",
  CONTEXT = "context",
  OFF = "off",
}

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

  async nextTrack(deviceId?: string) {
    await caller.fetch({
      url: endpoints.SKIP_PLAYBACK_TO_NEXT_TRACK({ deviceId: deviceId }),
      method: "POST",
    });
  }

  async previousTrack(deviceId?: string) {
    await caller.fetch({
      url: endpoints.SKIP_PLAYBACK_TO_PREVIOUS_TRACK({ deviceId: deviceId }),
      method: "POST",
    });
  }

  async seekTo(miliseconds: number, deviceId?: string) {
    if (miliseconds < 1) {
      throw new Error("miliseconds parameter must be a positive number.");
    }
    await caller.fetch({
      url: endpoints.SEEK_POSITION_IN_CURRENT_TRACK({
        positionMs: miliseconds,
        deviceId: deviceId,
      }),
      method: "PUT",
    });
  }

  async setRepeatMode(state: RepeatState, deviceId?: string) {
    await caller.fetch({
      url: endpoints.SET_REPEAT_MODE({
        state: state,
        deviceId: deviceId,
      }),
      method: "PUT",
    });
  }

  async getVolume(): Promise<number> {
    const ctx: PlaybackContext = await this.refreshContext();
    return ctx.device.volumePercent;
  }

  async setVolume(volume: number, deviceId?: string) {
    if (volume > 100 || volume < 0) {
      throw new Error(
        `The volume you are trying to set, "${volume}", is not in the correct range.`,
      );
    }
    await caller.fetch({
      url: endpoints.SET_VOLUME({
        volumePercent: volume,
        deviceId: deviceId,
      }),
      method: "PUT",
    });
  }

  async toggleShuffle(shuffle: boolean, deviceId?: string) {
    await caller.fetch({
      url: endpoints.TOGGLE_SHUFFLE({
        state: shuffle,
        deviceId: deviceId,
      }),
      method: "PUT",
    });
  }

  async addItemToQueue(uri: string, deviceId?: string) {
    if (uri == "") {
      throw new Error("Uri is not specified.");
    }
    await caller.fetch({
      url: endpoints.ADD_ITEM_TO_QUEUE({
        uri: uri,
        deviceId: deviceId,
      }),
    });
  }

  async refreshContext(market?: string): Promise<PlaybackContext> {
    const data = await caller.fetch({
      url: endpoints.GET_USER_CURRENT_PLAYBACK({
        market: market ?? "US",
        additionalTypes: "episode",
      }),
    });
    this.#ctx = new PlaybackContext(data);
    return this.#ctx;
  }
}
