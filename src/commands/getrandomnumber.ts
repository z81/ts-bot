import { CommandBase } from './commandBase';

class GetRandomNumber extends CommandBase {
  protected commandName = "getrandomnumber";
  protected description = "Выводит 42";

  public async exec(message) {
    message.reply("42");
  }
}

export default new GetRandomNumber();
