/*
 * Keeps the prototype clickable in browsers where storage is unavailable.
 *
 * Real localStorage/sessionStorage are left untouched. The in-memory fallback
 * only lasts for the current page session, so it is safe for preview/testing.
 */
(function initBrowserStorageFallback(root) {
  "use strict";

  function createMemoryStorage() {
    var data = {};
    var keys = [];

    function syncKeys() {
      keys = Object.keys(data);
    }

    return {
      get length() {
        syncKeys();
        return keys.length;
      },
      key: function key(index) {
        syncKeys();
        return keys[index] || null;
      },
      getItem: function getItem(key) {
        key = String(key);
        return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null;
      },
      setItem: function setItem(key, value) {
        data[String(key)] = String(value);
        syncKeys();
      },
      removeItem: function removeItem(key) {
        delete data[String(key)];
        syncKeys();
      },
      clear: function clear() {
        data = {};
        keys = [];
      }
    };
  }

  function canUseStorage(name) {
    try {
      var storage = root[name];
      if (!storage || typeof storage.getItem !== "function") return false;
      var testKey = "__hearth_storage_probe__";
      storage.setItem(testKey, "1");
      storage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  function ensureStorage(name) {
    if (canUseStorage(name)) return false;
    try {
      Object.defineProperty(root, name, {
        configurable: true,
        enumerable: true,
        value: createMemoryStorage()
      });
    } catch (error) {
      root[name] = createMemoryStorage();
    }
    return true;
  }

  var localFallback = ensureStorage("localStorage");
  var sessionFallback = ensureStorage("sessionStorage");

  root.HearthBrowserStorageFallback = {
    localStorage: localFallback,
    sessionStorage: sessionFallback,
    active: localFallback || sessionFallback
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
