import Storage from './Storage';

export default class ComstockSessionStorage implements Storage {

    public getItem(key: string): Promise<string | null> {
        return Promise.resolve(window.sessionStorage.getItem(key));
    }

    public setItem(key: string, value: string): Promise<void> {
        return Promise.resolve(window.sessionStorage.setItem(key, value));
    }
}

