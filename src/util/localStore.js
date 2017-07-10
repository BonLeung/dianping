export default {
  getItem: function(key) {
    let value;
    try {
      value = localStore.getItem(key);
    } catch (e) {
      if (__DEV__) {
        console.error('localStorage.getItem报错，', e.message);
      }
    } finally {
      return value;
    }
  },
  setItem: function(key, value) {
    try {
      // isosafari 无痕模式下，直接使用 localStorage.setItem 会报错
      localStorage.setItem(key, value);
    } catch (e) {
      // 开发环境下提示 error
      if (__DEV__) {
        console.error('localStorage.setItem报错，', e.message);
      }
    }
  }
}
