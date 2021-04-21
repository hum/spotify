import { caller } from "../handlers/caller.ts";
import { endpoints } from "../endpoints/endpoints.ts";
import {
  CurrentlyPlayingContextObj,
  DeviceObj,
} from "../structures/structs.ts";

export class Player {
  #devices: Array<DeviceObj>;

  constructor() {
    this.#devices = [];
  }

  async getCurrentPlaybackInfo(
    market?: string,
  ): Promise<CurrentlyPlayingContextObj> {
    const data = await caller.fetch(
      endpoints.GET_USER_CURRENT_PLAYBACK({ market: market ?? "US" }),
    );
    return data as CurrentlyPlayingContextObj;
  }

  async getDevices(): Promise<Array<DeviceObj>> {
    const data = await caller.fetch(endpoints.GET_USER_DEVICES());
    this.#devices = data["devices"] as Array<DeviceObj>;
    return this.#devices;
  }
}
