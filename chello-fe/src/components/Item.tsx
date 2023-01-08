import React, { useState } from "react";
import {
  FaAlignLeft,
  FaCircle,
  FaClock,
  FaEdit,
  FaEye,
  FaRegCheckSquare,
  FaTrash,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { deleteItem, patchItem } from "../apis/item.api";
import { ItemInterface } from "../types";
import Modal from "./Modal";
// import { ItemInterface } from "../types";

const Item = (props: any) => {
  const { item, cardId, fetchItemData } = props;
  let { workspaceId } = useParams();
  const [toggleUpdateModal, setToggleUpdateModal] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<ItemInterface>(item);

  const handleSetItemName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataUpdate((prev) => {
      return { ...prev, itemName: e.target.value };
    });
  };
  const handleSetItemDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataUpdate((prev) => {
      return { ...prev, description: e.target.value };
    });
  };
  const handleSetItemBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataUpdate((prev) => {
      return { ...prev, background: e.target.value };
    });
  };
  const handleSetItemDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataUpdate((prev) => {
      return { ...prev, deadline: e.target.value };
    });
  };

  // Update modal and function
  const handleToggleUpdateModal = () => {
    setToggleUpdateModal(!toggleUpdateModal);
    if (toggleUpdateModal === false) {
      setDataUpdate(item);
    }
  };
  const handleSubmitUpdateModal = async () => {
    if (dataUpdate.itemName === "")
      return alert("Please fill the required field");
    await patchItem(workspaceId, cardId, item.itemId, dataUpdate);
    setToggleUpdateModal(!toggleUpdateModal);
    fetchItemData();
  };

  // Delete modal and function
  const handleToggleDeleteModal = () => {
    setToggleDeleteModal(!toggleDeleteModal);
  };
  const handleSubmitDeleteModal = async () => {
    await deleteItem(workspaceId, cardId, item.itemId);
    handleToggleDeleteModal();
    fetchItemData();
  };

  return (
    <div
      className="item"
      style={{ fontWeight: props.isDragging ? "bold" : "" }}
    >
      {/* Bị drag */}
      {toggleUpdateModal && (
        <Modal
          type="update"
          handleToggleModal={handleToggleUpdateModal}
          handleSubmit={handleSubmitUpdateModal}
          name={item.itemName}
        >
          <div className="modal-body">
            <label className="modal-title" htmlFor="name">
              Tên
            </label>
            <input
              type="text"
              id="name"
              defaultValue={dataUpdate.itemName}
              onChange={handleSetItemName}
              style={{
                borderColor: dataUpdate.itemName ? "" : "#DC3545",
              }}
            />
            <label className="modal-title" htmlFor="description">
              Mô tả
            </label>
            <input
              type="text"
              id="description"
              defaultValue={dataUpdate.description}
              onChange={handleSetItemDescription}
              style={{
                backgroundColor: dataUpdate.description ? "" : "#e8e2e2",
              }}
            />
            <label className="modal-title">Nhãn dán</label>
            <div className="radio-options">
              <label>
                <input
                  type="radio"
                  value="red"
                  checked={dataUpdate.background === "red"}
                  onChange={handleSetItemBackground}
                />{" "}
                <FaCircle color="red" />
              </label>
              <label>
                <input
                  type="radio"
                  value="black"
                  checked={dataUpdate.background === "black"}
                  onChange={handleSetItemBackground}
                />{" "}
                <FaCircle color="black" />
              </label>
              <label>
                <input
                  type="radio"
                  value="green"
                  checked={dataUpdate.background === "green"}
                  onChange={handleSetItemBackground}
                />{" "}
                <FaCircle color="green" />
              </label>
              <label>
                <input
                  type="radio"
                  value="purple"
                  checked={dataUpdate.background === "purple"}
                  onChange={handleSetItemBackground}
                />{" "}
                <FaCircle color="purple" />
              </label>
              <label>
                <input
                  type="radio"
                  value="blue"
                  checked={dataUpdate.background === "blue"}
                  onChange={handleSetItemBackground}
                />{" "}
                <FaCircle color="blue" />
              </label>
              <label>
                <input
                  type="radio"
                  value="orange"
                  checked={dataUpdate.background === "orange"}
                  onChange={handleSetItemBackground}
                />{" "}
                <FaCircle color="orange" />
              </label>
              <label>
                <input
                  type="radio"
                  value=""
                  checked={dataUpdate.background === ""}
                  onChange={handleSetItemBackground}
                />
              </label>
            </div>
            <label className="modal-title" htmlFor="deadline">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              // Ko convert được
              // value={
              //   dataUpdate.deadline
              // }
              onChange={handleSetItemDeadline}
            />
          </div>
        </Modal>
      )}
      {toggleDeleteModal && (
        <Modal
          type="delete"
          handleToggleModal={handleToggleDeleteModal}
          handleSubmit={handleSubmitDeleteModal}
          name={item.itemName}
        >
          <div className="modal-body">
            <label className="modal-title">Bạn có chắc chắn là muốn xóa?</label>
          </div>
        </Modal>
      )}
      {item.background && (
        <div
          className="item-label-top"
          style={{ backgroundColor: item.background }}
        ></div>
      )}
      <div className="item-top">
        <span>{item.itemName}</span>
        <span>
          <FaTrash onClick={handleToggleDeleteModal} />
          <FaEdit onClick={handleToggleUpdateModal} />
        </span>
      </div>
      <div className="item-bottom">
        <span>
          <FaEye />
          {item.todoListId && <FaRegCheckSquare />}
          {item.description && <FaAlignLeft />}
          {item.deadline && <FaClock />}
        </span>
        <span>
          {item.member &&
            item.member.map((user: any, index: number) => {
              return (
                <img
                  src={user.avatar}
                  alt={user.name}
                  title={user.name}
                  key={index}
                />
              );
            })}
        </span>
      </div>
    </div>
  );
};

export default Item;
