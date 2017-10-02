import { CommandBase } from './commandBase';

class Lurk extends CommandBase {
  protected commandName = [" или ", " or ", " | "];
  protected description = "Выбирает случайный вариант";
  protected commandPrefix = "";

  public async exec(message) {
    const query = this.getCommandArgs(message.getText());
    if (!query) {
      return;
    }

    const items = message
      .getText()
      .replace(/\?/gm, "")
      .split(/или/i);
    message.reply(items[Math.round(Math.random() * (items.length - 1))]);
  }
}

export default new Lurk();
