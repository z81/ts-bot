export const TEXT_COMMAND_MODES = {
  START_WITH: 2
};

export class CommandBase {
  protected commandName;
  protected description = "";
  protected commandPrefix = "/";
  protected ignoreCaseEnabled = false;
  // protected commandTestMode = TEXT_COMMAND_MODES.START_WITH;
  private cmdRegExp;

  public test(message): boolean {
    let text = message.getText();
    let commandText = `${this.commandPrefix}${this.commandName}`;

    if (typeof this.commandName === "string") {
      if (this.ignoreCaseEnabled) {
        text = text.toLowerCase();
        commandText = commandText.toLowerCase();
      }

      // if (this.commandTestMode === TEXT_COMMAND_MODES.START_WITH) {
      if (text.indexOf(commandText) === 0) {
        return true;
      }
      // }
    } else if (this.commandName instanceof Array) {
      if (!this.cmdRegExp) {
        const prefix = this.commandPrefix;
        const regExpMod = this.ignoreCaseEnabled ? "gmi" : "gm";
        const regexp = `^(\\${prefix}${this.commandName.join(`|${prefix}`)})`;
        this.cmdRegExp = new RegExp(regexp, regExpMod);
      }

      return text.match(this.cmdRegExp) !== null;
    }

    return false;
  }

  public getCommandArgs(text) {
    text = text.split(" ", 2);
    if (text.length < 2) {
      return "";
    }
    return text[1].trim();
  }
}
