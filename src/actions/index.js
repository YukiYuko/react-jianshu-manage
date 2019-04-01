import {message} from "antd";

const tips = (msg, type = "info") => {
  message[type](msg)
};

export {
  tips
}
