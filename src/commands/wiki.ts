import * as wtf from 'wtf_wikipedia';

import { Answer } from '../bot/answer';
import { CommandBase } from './commandBase';

class Wiki extends CommandBase {
  protected commandName = ["w", "wiki", "в", "вики"];
  protected description = "Поиск по ru.wikipedia.org";

  public async exec(message) {
    const query = this.getCommandArgs(message.getText());
    if (!query) {
      return;
    }

    wtf.from_api(query, "ru", markup => {
      const page = wtf.parse(markup);

      if (
        !page.sections ||
        page.sections.length === 0 ||
        !page.sections[0].sentences ||
        page.sections[0].sentences.length === 0
      ) {
        return void message.reply("Не найдено");
      }

      const text = page.sections[0].sentences[0].text;

      const answer = new Answer();
      answer.setTitle(query);
      answer.setColor(0x8bc34a);
      answer.setDescription(text);
      message.reply(answer);
    });
  }
}

export default new Wiki();
