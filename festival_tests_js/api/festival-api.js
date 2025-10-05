import { CONSTANTS } from "../utils/constants.js";

export class FestivalAPI {
  constructor() {
    this.baseURL = CONSTANTS.FESTIVAL_URL;
    this.headers = CONSTANTS.FESTIVAL_HEADERS;
  }

  async startFestival() {
    const response = await fetch(this.baseURL, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ operation: "start" }),
    });
    return await response.json();
  }

  async endFestival() {
    const response = await fetch(this.baseURL, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ operation: "end" }),
    });
    return await response.json();
  }
}
