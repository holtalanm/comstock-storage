import FooStore from '../../test/FooStore';

describe('ComstockStorage', () => {
    test('values are stored within localStorage for plugins using ComstockLocalStorage', () => {
        const store = new FooStore();
        const localStorageKey = 'local-storage-all';

        store.bar = 'hahahahahaha';

        const storageValueStr = window.localStorage.getItem(localStorageKey);
        expect(storageValueStr).toBeTruthy();

        const storageValue = JSON.parse(storageValueStr as string);

        expect(storageValue['bar']).toEqual(store.bar);
    });
});
