const puppeteer = require('puppeteer');
const utils = require('./utils');


function getUserPageUrl (username){
  const url = `https://twitter.com/${username}`;
  return url;
}

/*
 * Fetch user profile
 */
async function getProfile(screenName){
  browser = null;
  let result = {};
  async function getUserByScreenName(response){
    try {
      if (response.url().indexOf("UserByScreenName") > 0){
        const text = await response.text();
        const json = JSON.parse(text);
        result = json.data.user.legacy;
        result.user_id_str = json.data.user.rest_id;
        page.off('response', getUserByScreenName);
      }
    } catch (error) {
    }
  }
  const url = getUserPageUrl(screenName);
  browser = await puppeteer.launch();
  const [page] = await browser.pages();
  page.on('response', getUserByScreenName);
  await page.goto(url, {waitUntil: 'networkidle0'});
  await browser.close();
  return result;
}
exports.getProfile = getProfile;

/*
 * Fetch user timeline
 */
async function getTimeline(screenName, scroll){
  let result = {};
  async function getTimelineRes(response){
    try {
      if (response.url().indexOf("https://api.twitter.com/2/timeline/profile/") >= 0){
        const text = await response.text();
        const json = JSON.parse(text);
        Object.assign(result, json.globalObjects.tweets);
      }
    } catch (error) {
    }
  }
  const url = getUserPageUrl(screenName);
  browser = await puppeteer.launch();
  const [page] = await browser.pages();
  page.on('response', getTimelineRes);
  await page.goto(url, {waitUntil: 'networkidle2'});
  await utils.autoScroll(page);
  await browser.close();
  return result;
}
exports.getTimeline = getTimeline;

