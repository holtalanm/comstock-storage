import { Store, StoreState } from 'comstock';
import ComstockStorage from '../src/ComstockStorage';
import ComstockLocalStorage from '../src/ComstockLocalStorage';
import ComstockSessionStorage from '../src/ComstockSessionStorage';

export default class FooStore extends Store {

    @StoreState({ defaultValue: 'bar' })
    public bar!: string;
    @StoreState({ defaultValue: 'baz' })
    public baz!: string;
    @StoreState({ defaultValue: [] })
    public zapArr!: string[];

    public constructor() {
        super({
            plugins: [
                new ComstockStorage({
                    storage: ComstockLocalStorage,
                    storageKey: 'local-storage-all',
                }),
                new ComstockStorage({
                    storage: ComstockSessionStorage,
                    storageKey: 'session-storage-all',
                }),
                new ComstockStorage({
                    storage: ComstockLocalStorage,
                    storageKey: 'local-storage-with-props',
                    properties: ['bar', 'baz'],
                }),
                new ComstockStorage({
                    storage: ComstockSessionStorage,
                    storageKey: 'session-storage-with-props',
                    properties: ['zapArr'],
                }),
            ],
        });
    }
}
