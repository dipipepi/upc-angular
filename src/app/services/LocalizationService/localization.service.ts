import { Injectable } from '@angular/core';
import { Logger } from '../../../Logger';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private logger = new Logger('ConfigureTranslateProvider');
  private supportedLanguages = ['de-DE',
    'en-US',
    'es-XL',
    'fr-FR',
    'it-IT',
    'ja-JP',
    'ko-KR',
    'pt-BR',
    'ru-RU',
    'zh-CN',
    'zh-TW',
    'pl-PL',
    'cs-CZ'
  ];

  constructor() { }

  initLocalization = () => {
    // @ts-ignore
    const lang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
    let selectedLang = 'en-US';
    if (lang) {
      this.logger.log('Browser prefers %s language', lang);
      let formattedLang;
      const shortLang = lang.substr(0, 2);

      const languages = this.supportedLanguages.filter((item) => {
        return item.lastIndexOf(shortLang, 0) === 0;
      });

      if (languages.length === 0) {
        return selectedLang;
      } else if (languages.length === 1) {
        selectedLang = languages[0];
      } else {
        formattedLang = this.getFormattedLanguage(lang);
        selectedLang = languages.indexOf(formattedLang) > -1 ? formattedLang : languages[0];
      }

      this.logger.info('Defined lang is \'%s\'', selectedLang);

      // Handle exceptional cases
      if (lang.indexOf('pt') === 0 && this.getFormattedLanguage(lang) !== 'pt-BR') {
        this.logger.info('Defined lang is \'pt\', but not \'pt-BR\', change selected lang to \'en-US\'');
        selectedLang = 'en-US';
      }

      if (lang.indexOf('zh') === 0) {
        formattedLang = this.getFormattedLanguage(lang);
        if (formattedLang !== 'zh' && formattedLang !== 'zh-CN' && formattedLang !== 'zh-HA' && formattedLang !== 'zh-SG' && formattedLang
          !== 'zh-TW') {
          this.logger.info('Defined lang is \'zh\', but not \'zh-CN\' or \'zh-Hans\' or \'zh-SG\' or \'zh-TW\', change selected lang to \'en-US\'');
          selectedLang = 'en-US';
        }
      }
    }
    this.logger.log('Returned selected lang is \'%s\'', selectedLang);
    return selectedLang;
  }

  private getFormattedLanguage(lang): string {
    this.logger.info('getFormattedLanguage: lang to convert, lang=%s', lang);
    const convertedLang = lang.replace(/^(\w\w)[-_](\w\w)$/i, (...arg) => {
      return arg[1].toLowerCase() + '-' + arg[2].toUpperCase();
    });
    this.logger.info('getFormattedLanguage: converted lang=%s', convertedLang);
    return convertedLang;
  }
}
