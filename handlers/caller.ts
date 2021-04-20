export interface CallerOpt {
  accessToken?: string;
  refreshToken?: string;
}

export class Caller {
  #accessToken: string;
  #refreshToken: string;
  #count: number;

  constructor(conf: CallerOpt) {
    this.#accessToken = conf.accessToken ?? "";
    this.#refreshToken = conf.refreshToken ?? "";
    this.#count = 0;
  }

  // deno-lint-ignore no-explicit-any
  async fetch(url: string, method?: string): Promise<any> {
    console.log(++this.#count);
    const response = await fetch(url, {
      method: method ?? "GET",
      headers: {
        "Authorization": this.#accessToken,
      },
    });
    // TODO:
    // Figure out a better way later
    if (response.body == null && response.status == 204) {
      return null;
    }

    const json = await response.json();

    // TODO:
    // Handle rate limiting
    if (response.status != 200) {
      const err = `Server returned a non-successful response. 
                ${JSON.stringify(json["error"])}`;
      throw new Error(err);
    }
    return json;
  }

  setCallerOpt(opt: CallerOpt) {
    if (!this.#accessToken) {
      this.#accessToken = opt.accessToken ?? "";
    }
    this.#refreshToken = opt.refreshToken ?? "";
  }
}

const caller = new Caller({});
export { caller };
