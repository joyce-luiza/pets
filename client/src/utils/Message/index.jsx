import { message } from "antd";

/**
 *
 * @param {"success" | "error" | "warning"} type
 * @param {string} msg
 */
const showMessage = (type, msg) => {
  switch (type) {
    case "success":
      message.success(msg);
      break;
    case "error":
      message.error(msg);
      break;
    case "warning":
      message.warning(msg);
      break;
    default:
      message.info(msg);
  }
};

export default showMessage;
