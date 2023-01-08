import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { deleteCard } from "../apis/card.api";
import InputAdd from "./InputAdd";
import Item from "./Item";
import Modal from "./Modal";

const Card = (props: any) => {
  let { workspaceId } = useParams();
  const [card, setCard] = useState(props.data);
  const [showItemAdd, setShowItemAdd] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const fetchCardFromWorkspace = props.fetchCardFromWorkspace;

  const handleToggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const handleSubmitDeleteCard = async (cardId: string | undefined) => {
    await deleteCard(workspaceId, cardId);
    fetchCardFromWorkspace();
    setShowDeleteModal(!showDeleteModal);
  };

  const handleShowAddItem = () => {
    setShowItemAdd(!showItemAdd);
    if (showItemAdd === false) {
      setNewItemName("");
    }
  };

  const handleSetNewItemName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemName(e.target.value);
  };

  const handleSubmitAddItem = (cardId: string) => {
    if (newItemName === "") {
      return alert("Please enter card name");
    }
    if (card.cardId === cardId) {
      card.items.push({
        itemId: "" + Math.random(),
        itemName: newItemName,
        // member: [],
      });
    }
    setCard(card);
    setShowItemAdd(!showItemAdd);
  };

  const handleAddNewItem = (e: React.KeyboardEvent, cardId: string) => {
    if (e.key === "Enter") {
      handleSubmitAddItem(cardId);
    }
  };

  const handleEditCardName = (e: any) => {
    console.log(e.target);
  };

  return (
    <div className="card">
      <div
        className="card-wrapper"
        style={{ backgroundColor: props.isUsingPlaceholder ? "#dae8fc" : "" }}
      >
        <div className="card-header">
          <span onClick={handleEditCardName}>{card.cardName}</span>
          <span onClick={handleToggleDeleteModal}>
            <FaTrashAlt />
          </span>
          {showDeleteModal && (
            <Modal
              type="delete"
              handleToggleModal={handleToggleDeleteModal}
              handleSubmit={(e) => handleSubmitDeleteCard(card.cardId)}
              name={card.cardName}
            >
              <div className="modal-body">
                <label className="modal-title">
                  Bạn có chắc chắn là muốn xóa thẻ này?
                </label>
              </div>
            </Modal>
          )}
        </div>
        <div className="card-body">
          {card.items &&
            card.items.map((item: any, index: any) => (
              <Draggable
                key={item.itemId}
                draggableId={"" + item.itemId}
                index={index}
              >
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      key={item.itemId}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Item
                        key={index}
                        data={item}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  );
                }}
              </Draggable>
            ))}
          {props.placeholder}
          {showItemAdd && (
            <InputAdd
              handleSetNewName={(e) => handleSetNewItemName(e)}
              handleAddNew={(e) => handleAddNewItem(e, card.cardId)}
              handleSubmitAdd={() => handleSubmitAddItem(card.cardId)}
              handleShowAdd={handleShowAddItem}
              placeholder={"thẻ"}
            />
          )}
        </div>
        {!showItemAdd && (
          <div className="card-footer" onClick={handleShowAddItem}>
            <span>
              <FaPlus />
              Thêm thẻ
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
