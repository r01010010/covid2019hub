import en_en from './en_en';
import es_es from './es_es';

const texts = {
  en_en,
  es_es
}

const defaultL = 'es_es'

class T {
  constructor(lang) {
    let _texts = lang ? texts[lang] : texts[defaultL];
    this.texts = _texts || texts[defaultL];
  }

  say(section, what) {
    return this.texts[section][what];
  }

  sayByTheme(section, what, theme) {
    return this.texts[section][what][theme];
  }

  switchTo(lang) {
    let _texts = lang ? texts[lang] : texts[defaultL];
    this.texts = _texts || texts[defaultL];
  }
}

const t = new T();

export default t;
