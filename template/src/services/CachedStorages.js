import Storage from 'services/Storage'

class CachedStorage {
  constructor(key) {
    this.storageKey = key
    this.cache = ''
  }

  set(val) {
    this.cache = ''
    Storage.set(this.storageKey, val)
  }

  get() {
    if (this.cache) {
      return this.cache
    }

    this.cache = Storage.get(this.storageKey)
    return this.cache
  }

  remove() {
    this.cache = ''
    Storage.remove(this.storageKey)
  }
}

export const CachedSelectedRoom = new CachedStorage('selectedRoom')
export const CachedRooms = new CachedStorage('rooms')
