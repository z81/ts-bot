import { readFile } from "fs";
import { promisify } from "util";

export class ConfigLoader {
  private config = {};

  async readJSONFile(path: string) {
    const data = await promisify(readFile)(path, "utf-8");
    return JSON.parse(data);
  }

  async load(path: string) {
    this.config = await this.readJSONFile(path);
  }

  async join(path: string) {
    this.config = { ...this.config, ...await this.readJSONFile(path) };
  }

  get(key) {
    if (!key) return this.config;
    return this.config[key];
  }
}
