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
  async fetch(url: string): Promise<any> {
    console.log(++this.#count);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": this.#accessToken,
      },
    });
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
