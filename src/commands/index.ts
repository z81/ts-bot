import { readdirSync } from 'fs';

const commands = [];

readdirSync(__dirname).forEach(name => {
  if (name !== "commandBase.ts" && name !== "index.ts") {
    const exportDefault = require(__dirname + "/" + name).default;

    if (typeof exportDefault === "object") {
      commands.push(exportDefault);
    }
  }
});

export default commands;
