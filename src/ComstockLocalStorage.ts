import Storage from './Storage';

/**
 * Storage implementation that uses window.localStorage as the backing storage.
 *
 * This is a singleton, as the Storage object is completely stateless and just delegates to localStorage
 */
class ComstockLocalStorage implements Storage {
    private static pInstance: ComstockLocalStorage | null = null;

    private constructor() {}

    static get instance(): ComstockLocalStorage {
        if (ComstockLocalStorage.pInstance == null) {
            ComstockLocalStorage.pInstance = new ComstockLocalStorage();
        }

        return ComstockLocalStorage.pInstance;
    }

    public getItem(key: string): Promise<string | null> {
        return Promise.resolve(window.localStorage.getItem(key));
    }

    public setItem(key: string, value: string | null): Promise<void> {
        if (value == null) {
            return Promise.resolve(window.localStorage.removeItem(key));
        } else {
            return Promise.resolve(window.localStorage.setItem(key, value));
        }
    }
}

export default ComstockLocalStorage.instance;
