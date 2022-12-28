import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaEllipsisH, FaPlus, FaTimes } from "react-icons/fa";
import Item from "./Item";

// interface CardObject {
//   cardId: string;
//   cardName: string;
//   isActived: boolean;
//   items: [];
// }

const Card = (props: any) => {
  const [card, setCard] = useState(props.data);

  const [showCardAdd, setShowCardAdd] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  const handleShowCard = () => {
    setShowCardAdd(!showCardAdd);
    if (showCardAdd === false) {
      setNewItemName("");
    }
  };

  const handleSetNewItemName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemName(e.target.value);
  };

  const handleSubmitAddCard = (cardId: string) => {
    if (card.cardId === cardId) {
      card.items.push({
        itemId: 123,
        itemName: newItemName,
        // member: [],
      });
    }
    setCard(card);
    setShowCardAdd(!showCardAdd);
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
          {showCardAdd && (
            <div className="card-add">
              <div className="item card-add-content">
                <input
                  type="textbox"
                  autoFocus
                  placeholder="Nhập tiêu đề thẻ"
                  onChange={(e) => handleSetNewItemName(e)}
                />
              </div>
              <div className="card-add-button">
                <button onClick={(e) => handleSubmitAddCard(card.cardId)}>
                  Thêm thẻ
                </button>
                <span onClick={handleShowCard}>
                  <FaTimes />
                </span>
              </div>
            </div>
          )}
        </div>
        {!showCardAdd && (
          <div className="card-footer" onClick={handleShowCard}>
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
