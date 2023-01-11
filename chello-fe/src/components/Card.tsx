import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaArrowLeft, FaArrowRight, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { deleteCard, patchCard, patchIndexCard } from "../apis/card.api";
import { createItem, fetchItem } from "../apis/item.api";
import InputAdd from "./InputAdd";
import Item from "./Item";
import Modal from "./Modal";

const Card = (props: any) => {
  let { workspaceId } = useParams();
  const { card, fetchCardFromWorkspace, lastCard } = props;
  const [item, setItem] = useState<any[]>([]);
  const [showItemAdd, setShowItemAdd] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditCardName, setShowEditCardName] = useState(false);
  const [newCardName, setNewCardName] = useState(card.cardName);

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

  const handleSubmitAddItem = async () => {
    if (newItemName === "") {
      return alert("Please enter card name");
    }
    await createItem(workspaceId, card.cardId, newItemName);
    fetchItemData();
    setShowItemAdd(!showItemAdd);
  };

  const handleAddNewItem = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmitAddItem();
    }
  };

  // Handle edit card name
  const handleToggleShowEditCardName = () => {
    setShowEditCardName(!showEditCardName);
  };
  const handleNewCardName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardName(e.target.value);
  };
  const submitEditCardName = async (cardId: string | undefined) => {
    if (newCardName === "") {
      return alert("Please enter card name");
    } else if (card.cardName !== newCardName) {
      await patchCard(workspaceId, cardId, { cardName: newCardName });
      fetchCardFromWorkspace();
    }
    handleToggleShowEditCardName();
  };
  const handleKeyEditCardName = (
    e: React.KeyboardEvent,
    cardId: string | undefined
  ) => {
    if (e.key === "Enter") {
      submitEditCardName(cardId);
      handleToggleShowEditCardName();
    }
  };

  // Handle item data
  const fetchItemData = async () => {
    const res = await fetchItem(workspaceId, card.cardId);
    const itemSort = res.data.sort((a: any, b: any) => a.index - b.index);
    setItem(itemSort);
  };

  // Handle change index of card
  const submitMoveTo = async (direction: string) => {
    const value = direction === "left" ? -1 : 1;
    await patchIndexCard(workspaceId, card.cardId, {
      index: card.index + value,
    });
    fetchCardFromWorkspace();
  };

  useEffect(() => {
    fetchItemData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card">
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
      <div
        className="card-wrapper"
        style={{ backgroundColor: props.isUsingPlaceholder ? "#dae8fc" : "" }}
      >
        <div className="card-header">
          {!showEditCardName ? (
            <span onClick={handleToggleShowEditCardName}>{card.cardName}</span>
          ) : (
            <input
              type="text"
              defaultValue={card.cardName}
              autoFocus
              onChange={handleNewCardName}
              onKeyDown={(e) => handleKeyEditCardName(e, card.cardId)}
              onBlur={() => submitEditCardName(card.cardId)}
            />
          )}
          {card.index !== 0 && (
            <span onClick={(e) => submitMoveTo("left")}>
              <FaArrowLeft />
            </span>
          )}
          {!lastCard && (
            <span onClick={(e) => submitMoveTo("right")}>
              <FaArrowRight />
            </span>
          )}
          <span onClick={handleToggleDeleteModal}>
            <FaTrashAlt />
          </span>
        </div>
        <div className="card-body">
          {item &&
            item.map((item: any, index: any) => (
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
                        cardId={card.cardId}
                        item={item}
                        isDragging={snapshot.isDragging}
                        fetchItemData={fetchItemData}
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
              handleAddNew={handleAddNewItem}
              handleSubmitAdd={handleSubmitAddItem}
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
