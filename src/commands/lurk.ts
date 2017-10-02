import * as og from 'open-graph-scraper';
import * as querystring from 'querystring';
import { promisify } from 'util';

import { Answer } from '../bot/answer';
import { CommandBase } from './commandBase';

class Lurk extends CommandBase {
  protected commandName = ["l", "lurk", "lurkomre", "л", "лурка"];
  protected description = "Поиск по lurkmore.to";

  public async exec(message) {
    const query = this.getCommandArgs(message.getText());
    if (!query) {
      return;
    }

    const searchStr = query.replace(/ /gim, "_");
    const options = {
      url: `http://lurkmore.to/${querystring.escape(searchStr)}`
    };

    try {
      const { data: result } = await promisify(og)(options);
      const answer = new Answer();
      console.log(result);

      answer.setTitle(result.ogTitle);
      answer.setColor(0x8bc34a);

      if (result.ogDescription) {
        answer.setDescription(result.ogDescription);
      }

      message.reply(answer);
    } catch (e) {
      message.reply("Не найдено");
    }
  }
}

export default new Lurk();
