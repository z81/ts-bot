import 'reflect-metadata';

import * as fs from 'fs';
import { promisify } from 'util';

import { Bot } from './bot/';
import { DiscordProvider } from './botAPIProviders/';
import { ConfigLoader } from './configLoader/';

const CONFIG_FOLDER_PATH = __dirname + "/../config";

const main = async () => {
  const configLoader = new ConfigLoader();

  const cfgList = await promisify(fs.readdir)(CONFIG_FOLDER_PATH);

  for (const name of cfgList) {
    await configLoader.join(`${CONFIG_FOLDER_PATH}/${name}`);
  }

  const bot = new Bot();
  bot.setAPIProvider(DiscordProvider);
  bot.setConfig(configLoader.get("discord"));
  bot.setCommands(require(__dirname + "/commands").default);
  await bot.start();
};

main();
