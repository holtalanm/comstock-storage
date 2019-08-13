import Storage from './Storage';

export default class ComstockLocalStorage implements Storage {

    public getItem(key: string): Promise<string | null> {
        return Promise.resolve(window.localStorage.getItem(key));
    }

    public setItem(key: string, value: string): Promise<void> {
        return Promise.resolve(window.localStorage.setItem(key, value));
    }
}
