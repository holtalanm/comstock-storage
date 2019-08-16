import { Store, StorePlugin, StorePluginValueChangeEvent } from 'comstock';

/**
 * Interface defining a common API for ComstockStorage to interact with a backing store.
 * 
 * Methods for interacting with the backing store are async, to allow for potential of
 * hitting web service endpoints on property change.
 */
export declare interface Storage {
    /**
     * Get a value from the backing storage, or null. 
     * 
     * @param key the key for the item
     */
    getItem(key: string): Promise<string | null>;
    /**
     * Set a value into the backing storage.
     * 
     * @param key the key for the item
     * @param value the value for the item, may be null.
     */
    setItem(key: string, value: string | null): Promise<void>;
}

/**
 * Storage implementation that uses window.localStorage as the backing storage.
 * 
 * This is a singleton, as the Storage object is completely stateless and just delegates to localStorage
 */
export declare class ComstockLocalStorage implements Storage {
    public getItem(key: string): Promise<string | null>;
    public setItem(key: string, value: string | null): Promise<void>;
}

/**
 * Storage implementation that uses window.sessionStorage as the backing storage.
 * 
 * This is a singleton, as the Storage object is completely stateless and just delegates to sessionStorage
 */
export declare class ComstockSessionStorage implements Storage {
    public getItem(key: string): Promise<string | null>;
    public setItem(key: string, value: string | null): Promise<void>;
}

/**
 * Options passed to ComstockStorage for configuring how to store values on state change, or whether to store the value at all.
 */
export declare interface ComstockStorageOptions {
    /**
     * The storage to use
     */
    storage: Storage;
    /**
     * Properties that we care about.  Used to filter the property state changes for this Storage.
     * If undefined or empty, ComstockStorage will save Store state to the backing storage on every state change.
     */
    properties?: string[];
    /**
     * Key to use on the Storage for storing the Store state.  Could I have used the word Store more within that?  Dunno.
     * 
     * 
     * Store.
     */
    storageKey?: string;
}

/**
 * StorePlugin instance that will store the Store state into the Storage specified within the options.
 */
export declare class ComstockStorage implements StorePlugin {
    constructor(options?: ComstockStorageOptions);

    public afterValueChange(event: StorePluginValueChangeEvent<any>): Promise<void>;
    public onStoreInitialized(store: Store): Promise<void>

}