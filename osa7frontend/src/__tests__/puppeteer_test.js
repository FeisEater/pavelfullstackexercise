const puppeteer = require('puppeteer')

describe('blog app', () => {
  let page
  let browser
  beforeEach(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage();
    await page.goto('http://localhost:3000')
  })

  afterEach(async() => {
    await browser.close()
  })

  it('can login', async () => {
    await page.type("input[name='username']", 'pasmpasm')
    await page.type("input[name='password']", 'salasana')    
    await page.click('form button')

    await page.waitForSelector('.message-info')  // ilman tätä testi ei mene läpi
  
    const textContent = await page.$eval('body', el => el.textContent)
    expect(textContent.includes('logged in')).toBe(true)
  }, 60000)

  it('cant login with wrong credentials', async () => {
    await page.type("input[name='username']", 'pasmpasm')
    await page.type("input[name='password']", 'poopybutthole')    
    await page.click('form button')

    await page.waitForSelector('.message-error')  // ilman tätä testi ei mene läpi
  
    const textContent = await page.$eval('body', el => el.textContent)
    expect(textContent.includes('käyttäjänimi tai salasana väärin')).toBe(true)
  }, 60000)
})
