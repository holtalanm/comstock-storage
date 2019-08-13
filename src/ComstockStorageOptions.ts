import Storage from './Storage';

export default interface ComstockStorageOptions {
    storage: Storage;
    properties?: string[];
    storageKey?: string;
}
