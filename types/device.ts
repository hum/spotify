import { DeviceObj } from "../structures/structs.ts";

export class Device {
  #data: DeviceObj;

  constructor(data: DeviceObj) {
    this.#data = data;
  }

  get id(): string {
    return this.#data.id;
  }
  get isActive(): boolean {
    return this.#data.is_active;
  }
  get isPrivateSession(): boolean {
    return this.#data.is_private_session;
  }
  get isRestricted(): boolean {
    return this.#data.is_restricted;
  }
  get name(): string {
    return this.#data.name;
  }
  get type(): string {
    return this.#data.type;
  }
  get volumePercent(): number {
    return this.#data.volume_percent;
  }
}
