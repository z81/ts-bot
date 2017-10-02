import { Answer } from '../../bot/answer';
import { MessageInterface } from '../../bot/message';
import { CommandBase } from '../commandBase';

class Or extends CommandBase {
  protected commandName = ["or", "ор"];
  protected commandPrefix = "";
  protected description = "Измеряет ваш ор";
  protected ignoreCaseEnabled = true;
  private mountains = require("./mountains").default;

  public test(msg: MessageInterface): boolean {
    const text = msg.getText().toLowerCase();
    return (
      text === "or" ||
      text === "ор" ||
      text.includes(" or ") ||
      text.includes(" ор ")
    );
  }

  public exec(message: MessageInterface) {
    const id = Math.round(Math.random() * (this.mountains.length * 1.07));
    const answer = new Answer();
    answer.setColor(0x2196f3);

    if (id > this.mountains.length - 1) {
      answer.setDescription("Ваш ор выше всех гор!");
    } else if (id <= 2) {
      answer.setDescription("Ваш ор ниже всех гор!");
    } else if (id === this.mountains.length - 1) {
      const m = this.mountains[id];
      if (m.img) {
        answer.setImage(m.img);
      }
      answer.setDescription(
        `Ваш ор выше самой высокой горы - ${m.name} ${m.height}м!`
      );
    } else {
      const m1 = this.mountains[id + 1];
      const m2 = this.mountains[id];

      answer.setImage(m1.img);
      answer.setDescription(
        `Ваш ор выше ${m1.name} ${m1.height}м и ниже ${m2.name} ${m2.height}м!`
      );
    }

    message.reply(answer);
  }
}

export default new Or();
