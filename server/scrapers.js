const puppeteer = require('puppeteer');

async function scrapeChannel(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el2] = await page.$x('/html/body/ytd-app/div/ytd-page-manager/ytd-browse/div[3]/ytd-c4-tabbed-header-renderer/tp-yt-app-header-layout/div/tp-yt-app-header/div[2]/div[2]/div/div[1]/div/div[1]/ytd-channel-name/div/div/yt-formatted-string');
    const text = await el2.getProperty('textContent');
    const name = await text.jsonValue();

    const [el] = await page.$x('//*[@id="img"]');
    const src = await el.getProperty('src');
    const avatarURL = await src.jsonValue();
    
    
    // const [el3] = await page.$x('//*[@id="newBuyBoxPrice"]');
    // const txt2 = await el3.getProperty('textContent');
    // const price = await txt2.jsonValue();
    
    browser.close();

    console.log({avatarURL, name});

    return {name, avatarURL}
}
// scrapeChannel('https://www.youtube.com/channel/UCRLEADhMcb8WUdnQ5_Alk7g')

module.exports = {
    scrapeChannel
}