export interface CallerOpt {
  accessToken: string;
  refreshToken?: string;
}

export interface fetchOpt {
  url: string;
  method?: string;
  body?: Record<string, unknown>;
}

export class Caller {
  #accessToken: string;
  #refreshToken: string;

  constructor(conf?: CallerOpt) {
    this.#accessToken = conf?.accessToken ?? "";
    this.#refreshToken = conf?.refreshToken ?? "";
  }

  // deno-lint-ignore no-explicit-any
  async fetch(opts: fetchOpt): Promise<any> {
    const response = await fetch(opts.url, {
      method: opts.method ?? "GET",
      headers: {
        "Authorization": this.#accessToken,
      },
      body: opts.body ? JSON.stringify(opts.body) : ``,
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

const caller = new Caller();
export { caller };
