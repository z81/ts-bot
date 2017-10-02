import { CommandBase } from './commandBase';

class Kill extends CommandBase {
  protected commandName = "kill";
  protected description = "Выводит `Тобi пизда!`";

  public async exec(message) {
    let [, user = ""] = message.getText().split(" ");
    if (user) {
      user += ", ";
    }

    message.reply(`${user} Тобi пизда!`);
  }
}

export default new Kill();
