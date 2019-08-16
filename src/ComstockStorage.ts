import { StorePlugin, StorePluginValueChangeEvent, Store } from 'comstock';
import { debounce } from 'debounce';
import Storage from './Storage';
import ComstockLocalStorage from './ComstockLocalStorage';
import ComstockStorageOptions from './ComstockStorageOptions';

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
        if (this.properties.length > 0) {
            // Only hit storage if a property we care about was modified
            if (this.properties.includes(event.property)) {
                const currentStoredState = await this.getStorageValue();
                currentStoredState[event.property] = event.newValue;
                await this.debouncedSetItem(
                    this.storageKey,
                    JSON.stringify(currentStoredState),
                );
            }
        } else {
            // No specific properties to watch?  Hit storage on all state changes.  We don't discriminate.
            await this.debouncedSetItem(
                this.storageKey,
                JSON.stringify(event.store.getState()),
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
