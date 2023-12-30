import Client from "../main";
import { Event } from "../structures/Event";
import i18next from 'i18next';

const a = i18next.getFixedT('en-US');
export default new Event("ready", () => {
	Client.logger.info(`${Client.user.tag} is now online! ${a('language:on')}`, { tags: ["Bot"] });
});
