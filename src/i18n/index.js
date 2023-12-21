import * as translations from './translations';

class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.listeners = [];
    this.lang = "ru";
  }
  setLang(lang) {
    this.lang = lang;
    this.services.api.setHeader("Accept-Language", this.lang);
    for (const listener of this.listeners) listener(this.lang);
  }
  translate(lang, text, plural) {
    let result =
      translations[lang] && text in translations[lang]
        ? translations[lang][text]
        : text;
    if (typeof plural !== "undefined") {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
    return result;
  }
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }
}

export default I18nService;