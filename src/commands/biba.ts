import { MessageInterface } from '../bot/message';
import { CommandBase } from './commandBase';

class Biba extends CommandBase {
  protected commandName = ["b", "biba"];
  protected description = "Измеряет размер бибы";

  public test(msg: MessageInterface): boolean {
    const text = msg.getText().toLowerCase();
    return text === "b" || text === "biba" || text === "/b" || text === "/biba";
  }

  public async exec(message) {
    const query = this.getCommandArgs(message.getText());
    message.reply(`Твоя биба ${Math.round(Math.random() * 50)}см`);
  }
}

export default new Biba();
