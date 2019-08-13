import { StorePlugin, StorePluginValueChangeEvent } from 'comstock';
import { debounce } from 'debounce';
import Storage from './Storage';
import ComstockLocalStorage from './ComstockLocalStorage';
import ComstockStorageOptions from './ComstockStorageOptions';

export default class ComstockStorage implements StorePlugin {
    private readonly storage: Storage;
    private readonly properties: string[];
    private readonly storageKey: string;

    constructor(options?: ComstockStorageOptions) {
        const opts = options || {
            storage: new ComstockLocalStorage(),
        };

        this.storage = opts.storage;
        this.properties = opts.properties || [];
        this.storageKey = opts.storageKey || 'comstock';
    }

    public afterValueChange(event: StorePluginValueChangeEvent<any>): void {
        // TODO: Implement me!
    }
}
