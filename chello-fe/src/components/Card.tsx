import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaEllipsisH, FaPlus } from "react-icons/fa";
import InputAdd from "./InputAdd";
import Item from "./Item";

const Card = (props: any) => {
  const [card, setCard] = useState(props.data);
  const [showItemAdd, setShowItemAdd] = useState(false);
  const [newItemName, setNewItemName] = useState("");

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

  return (
    <div className="card">
      <div
        className="card-wrapper"
        style={{ backgroundColor: props.isUsingPlaceholder ? "#dae8fc" : "" }}
      >
        <div className="card-header">
          <span>{card.cardName}</span>
          <span>
            <FaEllipsisH />
          </span>
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
