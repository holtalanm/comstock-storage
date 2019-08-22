import FooStore from '../../test/FooStore';

describe('ComstockStorage', () => {
    test('values are stored within localStorage for plugins using ComstockLocalStorage', () => {
        const store = new FooStore();
        const localStorageKey = 'local-storage-all';

        store.bar = 'hahahahahaha';

        // Do assertions within setTimeout because the storage call is debounced.
        setTimeout(() => {
            const storageValueStr = window.localStorage.getItem(localStorageKey);
            expect(storageValueStr).toBeTruthy();

            const storageValue = JSON.parse(storageValueStr as string);

            expect(storageValue['bar']).toEqual(store.bar);
        }, 250);
    });

    test('values are stored within sessionStorage for plugins using ComstockSessionStorage', () => {
        const store = new FooStore();
        const sessionStorageKey = 'session-storage-all';

        store.bar = 'hahahahahaha';

        // Do assertions within setTimeout because the storage call is debounced.
        setTimeout(() => {
            const storageValueStr = window.sessionStorage.getItem(sessionStorageKey);
            expect(storageValueStr).toBeTruthy();

            const storageValue = JSON.parse(storageValueStr as string);

            expect(storageValue['bar']).toEqual(store.bar);
        }, 250);
    });

    test('only specified properties are stored within localStorage', () => {
        const store = new FooStore();
        const localStorageKey = 'local-storage-with-props';

        store.bar = 'hahahahahaha';
        store.zapArr = ['blah'];

        // Do assertions within setTimeout because the storage call is debounced.
        setTimeout(() => {
            const storageValueStr = window.localStorage.getItem(localStorageKey);
            expect(storageValueStr).toBeTruthy();

            const storageValue = JSON.parse(storageValueStr as string);

            expect(storageValue['bar']).toEqual(store.bar);
            expect(storageValue['zapArr']).toBeUndefined();
        }, 250);
    });

    test('only specified properties are stored within sessionStorage', () => {
        const store = new FooStore();
        const sessionStorageKey = 'session-storage-with-props';

        store.bar = 'hahahahahaha';
        store.zapArr = ['blah'];

        // Do assertions within setTimeout because the storage call is debounced.
        setTimeout(() => {
            const storageValueStr = window.localStorage.getItem(sessionStorageKey);
            expect(storageValueStr).toBeTruthy();

            const storageValue = JSON.parse(storageValueStr as string);

            expect(storageValue['zapArr']).toEqual(store.zapArr);
            expect(storageValue['bar']).toBeUndefined();
        }, 250);
    });

    test('state is set from Storage upon store initialization', () => {
        const localStorageKey = 'local-storage-all';

        const storageState = {
            bar: 'hahahahahaha',
            baz: 'das boot',
            zapArr: ['kitty', 'cat'],
        };

        window.localStorage.setItem(localStorageKey, JSON.stringify(storageState));

        const store = new FooStore();

        setTimeout(() => {
            expect(store.bar).toEqual(storageState.bar);
            expect(store.baz).toEqual(storageState.baz);
            expect(store.zapArr).toEqual(storageState.zapArr);
        }, 250);
    });
});
