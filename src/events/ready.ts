import Client from "../main";
import { Event } from "../structures/Event";

export default new Event("ready", () => {
	Client.logger.info(`${Client.user.tag} is now online!`, { tags: ["Bot"] });
});
