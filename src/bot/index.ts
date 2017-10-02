// import { Logger } from "../logger/";

// @Logger
export class Bot {
  private provider = null;
  private config = null;
  private commands = null;

  public async start() {
    if (this.provider === null) {
      throw Error("Pls set api provider first");
    }
    if (this.config === null) {
      throw Error("Pls set config first");
    }
    if (this.commands === null) {
      throw Error("Pls set commands first");
    }

    this.provider.on("message", this.onMessage.bind(this));

    this.provider.on("ready", data => {
      // tslint:disable-next-line:no-console
      console.log("ready");
    });
    await this.provider.auth(this.config.auth);
  }

  public setAPIProvider(provider) {
    this.provider = new provider();
  }

  public setConfig(config) {
    this.config = config;
  }

  public setCommands(commands) {
    this.commands = commands;
  }

  private onMessage(message) {
    for (const cmd of this.commands) {
      if (cmd.test(message)) {
        cmd.exec(message);
      }
    }
  }
}
