 class LocalStorageMock {
     public values: any = {};

     public clear() {
         this.values = {};
     }

     public getItem(key: string): string | null {
         return this.values[key] || null;
     }

     public setItem(key: string, value: string) {
         this.values[key] = value;
     }

     public removeItem(key: string) {
         delete this.values[key];
     }
 }

 (global as any).localStorage = new LocalStorageMock();
