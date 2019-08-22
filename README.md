# **Comstock-Storage**, storage for Comstock.
[![npm version](https://img.shields.io/npm/v/comstock-storage.svg?style=flat)](https://www.npmjs.com/package/comstock-storage "View this project on npm")

## **This is also a work-in-progress**

The intention behind this plugin is to provide similar functionality to vuex-persist, but for Comstock.  This means that Comstock is required for this package, which can be found here:

https://www.npmjs.com/package/comstock


# Documentation

## Storage

Interface defining a common API for ComstockStorage to interact with a backing store.
Methods for interacting with the backing store are async, to allow for potential of
hitting web service endpoints on property change.

## ComstockLocalStorage

Storage implementation that uses window.localStorage as the backing storage.
This is a singleton, as the Storage object is completely stateless and just delegates to localStorage

## ComstockSessionStorage

Storage implementation that uses window.sessionStorage as the backing storage.
This is a singleton, as the Storage object is completely stateless and just delegates to sessionStorage

## ComstockStorageOptions

Options passed to ComstockStorage for configuring
how to store values on state change, or whether to store the value at all.

    ### storage: Storage -- the storage to use for the plugin.  required.

    ### properties: string[] -- a list of specific properties you want the plugin to watch for and persist into the storage.  Optional.  If not specified, or if empty, defaults to all properties.

    ### storageKey: string -- the key to use on the storage.  optional.  defaults to 'comstock'

## ComstockStorage

StorePlugin implementation that uses a backing Storage to save comstock state and load state upon store initialization.

# Example:

```ts
//in TestStore.ts

import { Store, StoreState } from 'comstock';
import { ComstockLocalStorage, ComstockStorage } from 'comstock-storage';

class ExampleStore extends Store {

    private static pExampleStore: ExampleStore | null;

    @StoreState({ defaultValue: 'foo' })
    public foo!: string;

    // Singleton pattern with private constructor and public static getter.
    private constructor() {
        super({
            plugins: [new ComstockStorage({ 
                storage: ComstockLocalStorage
            })],
        });
    }

    public static get instance(): ExampleStore {
        // Ensures once the static instance is set, it never gets re-instantiated.
        if (ExampleStore.pExampleStore == null) {
            ExampleStore.pExampleStore = new ExampleStore();
        }

        return ExampleStore.pExampleStore;
    }
}

// Even though we used singleton pattern, just export the single instance. 
export default ExampleStore.instance;

```

And that's it.  State is saved to the backing Storage upon state change.  Upon Store initialization, the state is pulled back out of the Storage and into the Store.  

If `Store.resetState` is called, those changes will propagate down into the ComstockStorage Storage state.