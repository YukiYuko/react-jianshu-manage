import {message, Modal} from "antd";
const confirm = Modal.confirm;
// 通用提示
const tips = (msg, type = "info") => {
  message[type](msg)
};
// 通用删除
const drop = (title = "提示", content = "删除之后无法恢复哦~") => new Promise((resolve, reject) => {
  confirm({
    title: title,
    centered: true,
    content,
    cancelText: "取消",
    okText: "确定",
    onOk() {
      resolve();
    },
    onCancel() {
      reject();
    },
  });
});

export {
  tips,
  drop
}
