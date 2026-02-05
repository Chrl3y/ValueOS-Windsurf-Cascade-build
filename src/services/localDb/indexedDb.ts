export interface LocalStore {
  get<T>(table: string, id: string): Promise<T | null>;
  list<T>(table: string): Promise<T[]>;
  upsert<T>(table: string, row: T): Promise<void>;
  remove(table: string, id: string): Promise<void>;
  clear(table: string): Promise<void>;
}

class IndexedDBStore implements LocalStore {
  private dbName = 'ValueOS';
  private version = 1;
  private db: IDBDatabase | null = null;

  private async init(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object stores for different data types
        if (!db.objectStoreNames.contains('projects')) {
          db.createObjectStore('projects', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('tasks')) {
          db.createObjectStore('tasks', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('tickets')) {
          db.createObjectStore('tickets', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('automation_rules')) {
          db.createObjectStore('automation_rules', { keyPath: 'id' });
        }
      };
    });
  }

  async get<T>(table: string, id: string): Promise<T | null> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([table], 'readonly');
      const store = transaction.objectStore(table);
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async list<T>(table: string): Promise<T[]> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([table], 'readonly');
      const store = transaction.objectStore(table);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  async upsert<T>(table: string, row: T): Promise<void> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([table], 'readwrite');
      const store = transaction.objectStore(table);
      const request = store.put(row);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async remove(table: string, id: string): Promise<void> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([table], 'readwrite');
      const store = transaction.objectStore(table);
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async clear(table: string): Promise<void> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([table], 'readwrite');
      const store = transaction.objectStore(table);
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

export const localStore = new IndexedDBStore();
