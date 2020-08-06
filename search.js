const puppeteer = require('puppeteer');

function getSearchPageUrl(query){
  const encodedQuery = encodeURIComponent(query);
  const url = `https://twitter.com/search?q=${encodedQuery}&f=live&vertical=default`;
  return url;
}

async function getSearchResult(query){
  browser = null;
  let result = {};
  async function getSearchResultRes(response){
    try {
      if(response.url().indexOf('https://api.twitter.com/2/search/adaptive.json') >= 0){
        const text = await response.text();
        const json = JSON.parse(text);
        Object.assign(result, json.globalObjects.tweets);
      }
    } catch (error) {
    }
  }
  const url = getSearchPageUrl(query);
  browser = await puppeteer.launch();
  const [page] = await browser.pages();
  page.on('response', getSearchResultRes);
  await page.goto(url, {waitUntil: 'networkidle2'});
  await utils.autoScroll(page);
  await browser.close();
  return result;
}
exports.getSearchResult = getSearchResult;