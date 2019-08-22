import Storage from './Storage';

/**
 * Storage implementation that uses window.sessionStorage as the backing storage.
 *
 * This is a singleton, as the Storage object is completely stateless and just delegates to sessionStorage
 */
class ComstockSessionStorage implements Storage {
    private static pInstance: ComstockSessionStorage | null = null;

    private constructor() {}

    public static get instance(): ComstockSessionStorage {
        if (ComstockSessionStorage.pInstance == null) {
            ComstockSessionStorage.pInstance = new ComstockSessionStorage();
        }

        return ComstockSessionStorage.pInstance;
    }

    public getItem(key: string): Promise<string | null> {
        return Promise.resolve(window.sessionStorage.getItem(key));
    }

    public setItem(key: string, value: string | null): Promise<void> {
        if (value == null) {
            return Promise.resolve(window.sessionStorage.removeItem(key));
        } else {
            return Promise.resolve(window.sessionStorage.setItem(key, value));
        }
    }
}

export default ComstockSessionStorage.instance;
