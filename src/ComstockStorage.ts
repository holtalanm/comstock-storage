import { StorePlugin, StorePluginValueChangeEvent, Store } from 'comstock';
import { debounce } from 'debounce';
import Storage from './Storage';
import ComstockLocalStorage from './ComstockLocalStorage';
import ComstockStorageOptions from './ComstockStorageOptions';

/**
 * StorePlugin instance that will store the Store state into the Storage specified within the options.
 */
export default class ComstockStorage implements StorePlugin {
    private readonly storage: Storage;
    private readonly properties: string[];
    private readonly storageKey: string;
    private readonly debouncedSetItem: (key: string, value: any) => Promise<void>;

    constructor(options?: ComstockStorageOptions) {
        const opts = options || {
            storage: ComstockLocalStorage,
        };

        this.storage = opts.storage;
        this.properties = opts.properties || [];
        this.storageKey = opts.storageKey || 'comstock';
        this.debouncedSetItem = debounce(this.storage.setItem, 100);
    }

    public async afterValueChange(event: StorePluginValueChangeEvent<any>): Promise<void> {
        const storeState = event.store.getState();
        if (this.properties.length > 0) {
            // Only hit storage if a property we care about was modified
            if (this.properties.includes(event.property)) {
                const propertyValues: any = {};
                this.properties.forEach((prop) => {
                    propertyValues[prop] = storeState[prop];
                });
                await this.debouncedSetItem(
                    this.storageKey,
                    JSON.stringify(propertyValues),
                );
            }
        } else {
            // No specific properties to watch?  Hit storage on all state changes.  We don't discriminate.
            await this.debouncedSetItem(
                this.storageKey,
                JSON.stringify(storeState),
            );
        }
    }

    public async onStoreInitialized(store: Store): Promise<void> {
        const storageState = await this.getStorageValue();
        if (storageState != null) {
            store.setState(storageState);
        }
    }

    private async getStorageValue(): Promise<any | null> {
        const storageStateStr = await this.storage.getItem(this.storageKey);
        if (storageStateStr != null) {
            return JSON.parse(storageStateStr);
        } else {
            return null;
        }
    }
}
