const puppeteer = require('puppeteer');

describe('App E2E Tests', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    it('should display the login page', async () => {
        await page.goto('http://localhost:3000/login');
        await page.waitForSelector('form');
        expect(await page.title()).toBe('Login');
    });

    it('should log in a user successfully', async () => {
        await page.type('input[name="username"]', 'testuser');
        await page.type('input[name="password"]', 'password');
        await page.click('button[type="submit"]');
        await page.waitForSelector('.alert-success');
        expect(await page.$eval('.alert-success', el => el.textContent)).toBe('Logged in successfully!');
    });

    it('should display the dashboard page', async () => {
        await page.goto('http://localhost:3000/dashboard');
        await page.waitForSelector('.dashboard');
        expect(await page.title()).toBe('Dashboard');
    });
});
