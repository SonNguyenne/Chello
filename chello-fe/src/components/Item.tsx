import { FaAlignLeft, FaEdit, FaEye, FaRegCheckSquare } from "react-icons/fa";

const Item = (props: any) => {
  const item = props.data;

  return (
    <div
      className="item"
      style={{ fontWeight: props.isDragging ? "bold" : "" }}
    >
      <div className="item-top">
        <span>{item.itemName}</span>
        <span>
          <FaEdit />
        </span>
      </div>
      <div className="item-bottom">
        <span>
          <FaEye />
          {item.todoListId && <FaRegCheckSquare />}
          {item.description && <FaAlignLeft />}
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
