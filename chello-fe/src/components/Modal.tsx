import React, { FC } from "react";
import { FaTimes } from "react-icons/fa";

type ModalInterface = {
  name: string;
  children: React.ReactNode[] | React.ReactNode;
  type: "create" | "update" | "delete";
  handleToggleModal: () => void;
  handleSubmit?: () => void;
};

const Modal: FC<ModalInterface> = (props: ModalInterface) => {
  const { name, children, type, handleToggleModal, handleSubmit } = props;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <span>
            {type === "create" && `Tạo ${name} mới`}
            {type === "update" && `Chỉnh sửa ${name}`}
            {type === "delete" && `Xóa ${name}?`}
          </span>
          <span onClick={handleToggleModal}>
            <FaTimes />
          </span>
        </div>
        {children}
        <hr />
        <div className="modal-footer">
          <button className="btn-close" onClick={handleToggleModal}>
            Hủy
          </button>
          <button onClick={handleSubmit}>Đồng ý</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
