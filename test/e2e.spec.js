import {Application}  from 'spectron';
import electronPath  from 'electron';
import path from 'path';

const delay = time => new Promise(resolve => setTimeout(resolve, time));

describe('main window', function spec() {
    beforeAll(async () => {
        this.app = new Application({
            path: electronPath,
            args: [path.join(__dirname, "..", "test/e2eWindow.js")],
        });

        return this.app.start();
    });

    afterAll(() => {
        if (this.app && this.app.isRunning()) {
            return this.app.stop();
        }
    });


    const findStatusAuth = () => this.app.client.element('[data-tid="status-auth"]');
    const findListIntels = () => this.app.client.element('[data-tid="listIntels"] > li');

    const findInputNameUser = () => this.app.client.elementIdAttribute('input-nameUser', 'data-tid');

    const findBtnAuth = async () => {
        const { value } = await this.app.client.elements('[data-tid="btn-auth"]');
        return value.map(btn => btn.ELEMENT);
    };

    const findBtnLogout = async () => {
        const { value } = await this.app.client.elements('[data-tid="btn-logout"]');
        return value.map(btn => btn.ELEMENT);
    };




    it('should open window', async () => {
        const { client, browserWindow } = this.app;

        await client.waitUntilWindowLoaded();

        const title = await browserWindow.getTitle();
        expect(title).toBe('Electron Soundcloud Player');
    });

    it('should display status not authorized', async () => {
        expect(await findStatusAuth().getText()).toBe('Auth user: not authorized');
    });

    it('should display status authorized for user 111', async () => {
        const { client } = this.app;

        const buttons = await findBtnAuth();
        await client.elementIdClick(buttons[0]); // authorized
        expect(await findStatusAuth().getText()).toBe('Auth user: not authorized');
        await delay(1500);
        expect(await findStatusAuth().getText()).toBe('Auth user: 111');
    });

    it('should display status authorized for user 111', async () => {
        const { client } = this.app;

        const buttons = await findBtnLogout();
        expect(await findStatusAuth().getText()).toBe('Auth user: 111');
        await client.elementIdClick(buttons[0]); // logout
        await delay(1500);
        expect(await findStatusAuth().getText()).toBe('Auth user: not authorized');
    });

    it('should add user', async () => {

        const { client } = this.app;
        await client
            .waitUntilWindowLoaded()
            .waitForExist('[data-tid="input-nameUser"]')
            .then(() => client.setValue('[data-tid="input-nameUser"]', "test@test.com"))
            // .setValue('[data-tid="input-nameUser"]', "test@test.com")
            .click('[data-tid="btn-addUser"]')
            .then(async () =>  expect(await findListIntels().getText()).toBe('test@test.comUpdate + oleDelete'));

    });
});