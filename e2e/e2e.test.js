import puppetteer from 'puppeteer';
import { fork } from 'child_process';
// const childProcess = require('child_process');

jest.setTimeout(50000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 450,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
    // await page.goto(baseUrl);// ? или здесь
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('Должен открыть подсказку - создать новый элемент', async () => {
    await page.goto(baseUrl);

    // const button = await page.$('[data-id=button-widjet]');через дата-ай-ди
    const button = await page.$('button.btn.btn-secondary');// обычный
    button.click();
    // await page.waitForFunction(() => document.body.firstElementChild.children[0].length === 2);
    await page.waitForFunction(() => document.body.querySelector('[data-id=button-widjet]').nextElementSibling !== null);
  });

  test('Должен закрыть подсказку - удалить новый элемент', async () => {
    await page.goto(baseUrl);

    const button = await page.$('[data-id=button-widjet]');
    // const button = await buttonEl.$('.btn btn-secondary');
    button.click();
    await page.waitForFunction(() => document.body.querySelector('[data-id=button-widjet]').nextElementSibling !== null);
    button.click();
    // await page.waitForFunction(() => document.body.firstElementChild.children[0].length === 1);
    await page.waitForFunction(() => document.body.querySelector('[data-id=button-widjet]').nextElementSibling === null);
  });
});
