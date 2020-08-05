const puppeteer = require('puppeteer');

let browser;
async function getPage(url, scroll){
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    // jsの読み込みを待つ
    await page.goto(url, {waitUntil: 'networkidle0'});
    // スクロールする
    await autoScroll(page, scroll);
    return page;
  } catch(e) {
    console.error(e);
  }
}
exports.getPage = getPage;

function closeBrowser(){
  browser.close();
}
exports.closeBrowser = closeBrowser;

// スクロールする便利なやつ
async function autoScroll(page, maxCount){
  await page.evaluate(async (maxCount) => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var count = 0;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        count++;

        if(count >= maxCount){
            clearInterval(timer);
            resolve();
        }
        if(totalHeight >= scrollHeight){
            clearInterval(timer);
            resolve();
        }
      }, 100);
    });
  }, maxCount);
}



async function getInnerText(elementHandle, querySelector){
  return await elementHandle.$eval(querySelector, e => e.innerText).catch(()=>null);
}
exports.getInnerText = getInnerText;

async function getNestedInnerText(elementHandle, querySelector1, querySelector2){
  const parentElement = await elementHandle.$(querySelector1);
  return await parentElement.$eval(querySelector2, e => e.innerText).catch(()=>null);
}
exports.getNestedInnerText = getNestedInnerText;

async function getAttribute(elementHandle, querySelector, attr){
  return await elementHandle.$eval(querySelector, (e, attr) => e.getAttribute(attr), attr).catch(()=>null);
}
exports.getAttribute = getAttribute;

async function getAttributes(elementHandle, querySelector, attr){
  return await elementHandle.$$eval(querySelector, (es, attr) => es.map(e => e.getAttribute(attr)), attr).catch(()=>null);
}
exports.getAttributes = getAttributes;
