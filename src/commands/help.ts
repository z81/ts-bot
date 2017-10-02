import { Answer } from '../bot/answer';
import commands from '../commands/';
import { CommandBase } from './commandBase';

class Help extends CommandBase {
  protected commandName = "help";
  protected description = "Выводит список всех команд.";

  public exec(message) {
    const cmdList = [];
    const answer = new Answer();
    answer.setTitle("Список команд");

    for (const cmd of commands) {
      let cmdName = "";

      if (typeof cmd.commandName === "string") {
        cmdName = `${cmd.commandPrefix}${cmd.commandName}`;
      }

      if (cmd.commandName instanceof Array) {
        cmdName = `${cmd.commandPrefix}${cmd.commandName.join(
          `, ${cmd.commandPrefix}`
        )}`;
      }

      answer.addField(cmdName, cmd.description);
    }

    answer.addField("Исходники", " https://github.com/z81/ts-bot ");

    message.reply(answer);
  }
}

export default new Help();
