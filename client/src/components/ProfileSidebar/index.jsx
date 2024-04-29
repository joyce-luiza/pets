import { Children, cloneElement, useState } from "react";
import styles from "./styles.module.css";
import "remixicon/fonts/remixicon.css";
import { Upload, message } from "antd";
import { axiosRequest } from "../../utils/axiosRequest";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export default function ProfileSidebar({
  children,
  content,
  setContent,
  isAdopter = true,
  imgUrl = "",
}) {
  const [imageUrl, setImageUrl] = useState(imgUrl);

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      if (isAdopter) {
        await axiosRequest({
          method: "POST",
          authenticated: true,
          body: {
            file,
          },
          type: "multipart",
          path: "/",
        });
      }
      onSuccess();
    } catch (error) {
      onError();
    }
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }

    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setImageUrl(url);
      });
      message.success("Imagem alterada com sucesso");
    }

    if (info.file.status === "error") {
      message.error("Erro ao alterar a imagem.");
    }
  };

  return (
    <div className={styles.container}>
      <Upload
        className={styles.uploadWrapper}
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={customRequest}
      >
        <div className={styles.upload}>
          {imageUrl ? (
            <img
              src={imageUrl}
              className={styles.profileImg}
              alt="Foto de perfil"
            />
          ) : (
            <i className={`ri-user-line ${styles.userIcon}`} />
          )}

          <div className={styles.uploadImage}>
            <i className="ri-camera-fill"></i>
            <p>Enviar imagem</p>
          </div>
        </div>
      </Upload>

      <ul className={styles.menus}>
        {Children.map(children, (child) =>
          cloneElement(child, {
            onClick: () => setContent(child.key),
            className: child.key === content ? `${styles.selected}` : "",
          })
        )}
      </ul>
    </div>
  );
}
