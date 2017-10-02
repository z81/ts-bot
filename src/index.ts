import "reflect-metadata";
import { Bot } from "./bot/";
import { DiscordProvider } from "./botAPIProviders/";
import { ConfigLoader } from "./configLoader/";

const main = async () => {
  const configLoader = new ConfigLoader();
  await configLoader.load(__dirname + "/../config/config.json");
  await configLoader.join(__dirname + "/../config/secret.json");

  const bot = new Bot();
  bot.setAPIProvider(DiscordProvider);
  bot.setConfig(configLoader.get("discord"));
  bot.setCommands(require(__dirname + "/commands").default);
  await bot.start();
};

main();
