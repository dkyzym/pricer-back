import * as cheerio from 'cheerio';

export const loadHtml = (htmlString) => {
  return cheerio.load(htmlString);
};
