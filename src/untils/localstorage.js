//获取localStorage
function getStorage(name) {
  let data;
  try {
    let storage = window.localStorage;
    if (storage.getItem(name) !== null) {
      data = storage.getItem(name);
    } else {
      data = false;
    }
  } catch (err) {
    data = false;
  }
  return data;
}
//设置localStorage
function setStorage(name, data) {
  try {
    let storage = window.localStorage;
    storage.setItem(name, data);
  } catch (err) {
  }
}
//删除localStorage
function removeStorage(name) {
  try {
    let storage = window.localStorage;
    storage.removeItem(name);
  } catch (err) {
  }
}
export { getStorage, setStorage, removeStorage };
