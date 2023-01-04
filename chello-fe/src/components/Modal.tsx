import React from "react";
import { FaTimes } from "react-icons/fa";

type ModalInterface = {
  name: string;
  handleToggleModal: () => void;
  handleSubmit?: () => void;
  handleSetNewWorkspaceName?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Modal = (props: ModalInterface) => {
  const { name, handleToggleModal, handleSubmit, handleSetNewWorkspaceName } =
    props;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <span>Tạo {name} mới</span>
          <span onClick={handleToggleModal}>
            <FaTimes />
          </span>
        </div>
        <div className="modal-body">
          <label htmlFor="modal-input">Tên {name}</label>
          <input
            type="text"
            id="modal-input"
            onChange={handleSetNewWorkspaceName}
          />
        </div>
        <hr />
        <div className="modal-footer">
          <button className="btn-close" onClick={handleToggleModal}>
            Hủy
          </button>
          <button onClick={handleSubmit}>Thêm {name}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
