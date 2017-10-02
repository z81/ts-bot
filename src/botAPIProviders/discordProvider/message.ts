import * as Discord from "discord.js";
import { Answer } from "../../bot/answer";
import { MessageInterface } from "../../bot/message";

export class Message implements MessageInterface {
  private originalMessage;
  private client;

  constructor(originalMessage) {
    this.originalMessage = originalMessage;
  }

  public getText() {
    return this.originalMessage.content;
  }

  public reply(text) {
    const msg = this.answerToMessage(text);
    return this.originalMessage.reply(msg);
  }

  public setClient(client) {
    this.client = client;
  }

  private answerToMessage(answer: Answer | string) {
    if (typeof answer === "string") {
      return answer;
    }
    const rich = new Discord.RichEmbed();

    if (answer.getTitle()) {
      rich.setTitle(answer.getTitle());
    }

    if (answer.getImage()) {
      rich.setImage(answer.getImage());
    }

    if (answer.getColor()) {
      rich.setColor(answer.getColor());
    }

    if (answer.getDescription()) {
      rich.setDescription(answer.getDescription());
    }

    if (answer.getUrl()) {
      rich.setURL(answer.getUrl());
    }

    for (const [name, field] of answer.getFields()) {
      rich.addField(name, field);
    }

    return { embed: rich };
  }
}
