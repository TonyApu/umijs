import { CODE_MESSAGE } from "@/constants";
import { notification } from "antd";

export function handleStatus(status) {
  const notiText = CODE_MESSAGE[status];
  if (status === 200) {
    notification.success({
      description: notiText,
    });
  } else {
    notification.error({
      description: notiText,
    });
  }
}
