import { MessageInterface } from '../bot/message';
import { CommandBase } from './commandBase';

class Kek extends CommandBase {
  protected commandName = ["kek", "кек"];
  protected commandPrefix = "";
  protected description = "Выводит случайны ответ на кек,kek";
  protected ignoreCaseEnabled = true;
  private answers = ["4eburek", "kukarek", "кукарек", "чебурек"];

  public test(msg: MessageInterface): boolean {
    const text = msg.getText().toLowerCase();
    return text === "kek" || text === "кек";
  }

  public exec(message: MessageInterface) {
    const id = Math.round(Math.random() * (this.answers.length - 1));
    message.reply(this.answers[id]);
  }
}

export default new Kek();
