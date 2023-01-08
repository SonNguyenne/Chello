import React from "react";
import { FaTimes } from "react-icons/fa";

type InputAddProps = {
  handleSetNewName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddNew: (e: React.KeyboardEvent) => void;
  handleSubmitAdd: () => void;
  handleShowAdd: () => void;
  placeholder: string;
};
const InputAdd = (props: InputAddProps) => {
  const {
    handleSetNewName,
    handleAddNew,
    handleSubmitAdd,
    handleShowAdd,
    placeholder,
  } = props;

  return (
    <div className="item-add">
      <div className="item item-add-content">
        <input
          type="textbox"
          autoFocus
          placeholder={`Nhập tên ${placeholder}`}
          onChange={handleSetNewName}
          onKeyDown={(e) => handleAddNew(e)}
        />
      </div>
      <div className="item-add-button">
        <button onClick={(e) => handleSubmitAdd()}>Thêm {placeholder}</button>
        <span onClick={handleShowAdd}>
          <FaTimes />
        </span>
      </div>
    </div>
  );
};

export default InputAdd;
