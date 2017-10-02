import { readdirSync } from "fs";

const commands = [];

readdirSync(__dirname).forEach(name => {
  if (name !== "commandBase.ts" && name !== "index.ts") {
    commands.push(require(__dirname + "/" + name).default);
  }
});

export default commands;
