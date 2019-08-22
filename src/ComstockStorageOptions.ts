import Storage from './Storage';

/**
 * Options passed to ComstockStorage for configuring
 * how to store values on state change, or whether to store the value at all.
 */
export default interface ComstockStorageOptions {
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
     * Key to use on the Storage for storing the Store state.
     * Could I have used the word Store more within that?  Dunno.
     *
     *
     * Store.
     */
    storageKey?: string;
}
