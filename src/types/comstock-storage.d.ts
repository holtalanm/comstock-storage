import { StorePlugin, StorePluginValueChangeEvent } from 'comstock';

export declare interface Storage {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
}

export declare class ComstockLocalStorage implements Storage {
    public getItem(key: string): Promise<string | null>;
    public setItem(key: string, value: string): Promise<void>;
}

export declare class ComstockSessionStorage implements Storage {
    public getItem(key: string): Promise<string | null>;
    public setItem(key: string, value: string): Promise<void>;
}

export declare interface ComstockStorageOptions {
    storage: Storage;
    properties?: string[];
    storageKey?: string;
}

export declare class ComstockStorage implements StorePlugin {
    constructor(options?: ComstockStorageOptions);

    public afterValueChange(event: StorePluginValueChangeEvent<any>): void;
}