import * as og from 'open-graph-scraper';
import { promisify } from 'util';

import { Answer } from '../bot/answer';
import { CommandBase } from './commandBase';

class Xkcd extends CommandBase {
  protected commandName = ["x", "xkcd", "х"];
  protected description = "Случайны комикс с xkcd.ru";

  public async getRandomCommics(id) {
    const options = {
      url: `https://xkcd.ru/${id}`
    };

    try {
      await promisify(og)(options);
      return id;
    } catch (e) {
      return await this.getRandomCommics(Math.round(Math.random() * 1851));
    }
  }

  public async exec(message) {
    const query = this.getCommandArgs(message.getText());

    let id = parseInt(query, 10);
    id = await this.getRandomCommics(id);

    const answer = new Answer();
    answer.setColor(0x2196f3);

    answer.setTitle(`Комикс - ${id}`);
    answer.setUrl(`https://xkcd.ru/${id}/`);
    answer.setImage(`https://xkcd.ru/i/${id}_v1.png`);

    message.reply(answer);
  }
}

export default new Xkcd();
