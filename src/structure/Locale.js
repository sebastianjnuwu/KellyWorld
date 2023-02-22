import i18next from 'i18next';
import i18nbackend from 'i18next-fs-backend';
import { readdirSync } from 'node:fs';

export default class Locale {
    constructor(client) {
        this.client = client;
    }

    async loadLocales() {
        this.client.i18next = i18next;
        await i18next.use(i18nbackend).init({
            backend: {
                loadPath: 'src/locales/{{lng}}/{{ns}}.json',
            },
            defaultNS: 'language',
            fallbackLng: 'en-US',
            interpolation: {
                escapeValue: false,
                useRawValueToEscape: true,
            },
            load: 'all',
            ns: ['language'],
            preload: readdirSync('src/locales'),
            returnEmptyString: false,
            returnObjects: true,
        });
    }
}
