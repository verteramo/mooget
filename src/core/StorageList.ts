class StorageList<T> {
  private list: T[] = [];
  private variable: string;
  private area: chrome.storage.StorageArea;

  constructor(variable: string, area: chrome.storage.StorageArea = chrome.storage.local) {
    this.variable = variable;
    this.area = area;
  }

  get length() {
    return this.list.length;
  }

  load() {
    this.area.get([this.variable], (data) => {
      this.list = data[this.variable] || [];
    });
  }

  save() {
    this.area.set({ [this.variable]: this.list });
  }

  change(changes: {
    [key: string]: chrome.storage.StorageChange;
  }) {
    if (changes[this.variable]) {
      this.list = changes[this.variable].newValue;
    }
  }

  add(item: T) {
    this.list.push(item);
  }

  get(index: number): T {
    return this.list[index];
  }

  getAll(): T[] {
    return this.list;
  }

  remove(index: number) {
    this.list.splice(index, 1);
  }

  update(index: number, item: T) {
    this.list[index] = item;
  }

  find(predicate: (element: T) => boolean): T | undefined {
    return this.list.find(predicate);
  }

  clear() {
    this.list = [];
  }
}
