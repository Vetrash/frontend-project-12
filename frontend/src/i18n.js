import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import resources from './resource/index.js';

i18n
  .use(initReactI18next)
  .use(intervalPlural)
  .init({ lng: 'ru', resources });

export default i18n;
