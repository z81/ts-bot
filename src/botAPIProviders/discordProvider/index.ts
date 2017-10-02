import * as Discord from "discord.js";
import * as EventEmitter from "events";
import { APIProviderInterface } from "../APIProviderInterface";
import { Message } from "./message";

export class DiscordProvider implements APIProviderInterface {
  private client = null;
  private eventsEmiter = new EventEmitter();

  constructor() {
    this.client = new Discord.Client();
    this.eventsEmiter.setMaxListeners(50);
    this.bindEvents();
  }

  public auth({ token }) {
    return this.client.login(token);
  }

  public on(eventName: string, callback) {
    this.eventsEmiter.on(eventName, callback);
  }

  public off(eventName: string, callback) {
    this.eventsEmiter.removeListener(eventName, callback);
  }

  public emit(eventName: string, data) {
    this.eventsEmiter.emit(eventName, data);
  }

  private bindEvents() {
    this.client.on("ready", this.emit.bind(this, "ready"));
    this.client.on("message", this.onMessage.bind(this));
  }

  private onMessage(data): any {
    if (data.author.id === this.client.user.id || data.author.bot) {
      return;
    }

    const message = new Message(data);
    message.setClient(this.client);
    this.emit("message", message);
  }
}
