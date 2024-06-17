class StorageList<T> {
  private list: T[] = []
  private readonly variable: string
  private readonly area: chrome.storage.StorageArea

  constructor (variable: string, area: chrome.storage.StorageArea = chrome.storage.local) {
    this.variable = variable
    this.area = area
  }

  get length (): number {
    return this.list.length
  }

  load (): void {
    this.area.get([this.variable], (data) => {
      this.list = data[this.variable] || []
    })
  }

  save (): void {
    this.area.set({ [this.variable]: this.list })
  }

  change (changes: {
    [key: string]: chrome.storage.StorageChange
  }): void {
    if (changes[this.variable]) {
      this.list = changes[this.variable].newValue
    }
  }

  add (item: T) {
    this.list.push(item)
  }

  get (index: number): T {
    return this.list[index]
  }

  getAll (): T[] {
    return this.list
  }

  remove (index: number) {
    this.list.splice(index, 1)
  }

  update (index: number, item: T) {
    this.list[index] = item
  }

  find (predicate: (element: T) => boolean): T | undefined {
    return this.list.find(predicate)
  }

  clear () {
    this.list = []
  }
}
