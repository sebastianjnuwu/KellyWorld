import Client from "../main";
import { Event } from "../structures/Event";
import chalk from "chalk";

export default new Event("clientReady", () => {
  console.log(
    `[Events] Logged in as: ${chalk.blue(`${Client.user?.username ?? "unknown"} (${Client.user?.id ?? "unknown"})`)}`,
  );
});
