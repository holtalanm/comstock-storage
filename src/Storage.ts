/**
 * Interface defining a common API for ComstockStorage to interact with a backing store.
 *
 * Methods for interacting with the backing store are async, to allow for potential of
 * hitting web service endpoints on property change.
 */
export default interface Storage {
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
    setItem(key: string, value: string): Promise<void>;
}
