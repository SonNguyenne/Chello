import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import {
  FaBolt,
  FaChevronDown,
  FaEllipsisH,
  FaFilter,
  FaPlus,
  FaPuzzlePiece,
  FaTable,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { createCard, fetchCard } from "../apis/card.api";
import { getWorkspaceById } from "../apis/workspace.api";
import Card from "../components/Card";
import InputAdd from "../components/InputAdd";
import Loading from "../components/Loading";
import { CardInterface, WorkspaceInterface } from "../types";

// const api = {
//   workspaceId: "123",
//   name: "Chello",
//   member: [
//     {
//       userId: 10,
//       name: "Nguyễn Tiến Thành",
//       avatar:
//         "https://www.dungplus.com/wp-content/uploads/2019/02/Roronoa-zoro-2-584x400.jpg",
//     },
//     {
//       userId: 20,
//       name: "Thanh Sơn",
//       avatar:
//         "https://trello-members.s3.amazonaws.com/639ad9d4cbedbd01e3a44305/0b1305f382fac9e4d2312fab74fbd394/original.png",
//     },
//   ],
//   cards: [
//     {
//       cardId: "card1",
//       cardName: "Cần làm",
//       isActived: true,
//       items: [
//         {
//           itemId: 1,
//           itemName: "Profile page",
//           description: "This is profile page design",
//           member: [
//             {
//               userId: 10,
//               name: "Nguyễn Tiến Thành",
//               avatar:
//                 "https://www.dungplus.com/wp-content/uploads/2019/02/Roronoa-zoro-2-584x400.jpg",
//             },
//             {
//               userId: 20,
//               name: "Thanh Sơn",
//               avatar:
//                 "https://trello-members.s3.amazonaws.com/639ad9d4cbedbd01e3a44305/0b1305f382fac9e4d2312fab74fbd394/original.png",
//             },
//           ],
//         },
//         {
//           itemId: 2,
//           itemName: "Sign in page",
//           description: "This is sign in page design",
//           member: [
//             {
//               userId: 10,
//               name: "Nguyễn Tiến Thành",
//               avatar:
//                 "https://www.dungplus.com/wp-content/uploads/2019/02/Roronoa-zoro-2-584x400.jpg",
//             },
//           ],
//         },
//         {
//           itemId: 3,
//           itemName: "Sign up page",
//           description: "It is so hard to design",
//           member: [
//             {
//               userId: 10,
//               name: "Nguyễn Tiến Thành",
//               avatar:
//                 "https://www.dungplus.com/wp-content/uploads/2019/02/Roronoa-zoro-2-584x400.jpg",
//             },
//           ],
//         },
//         {
//           itemId: 4,
//           itemName: "Layout",
//           todoListId: 1,
//           member: [
//             {
//               userId: 10,
//               name: "Nguyễn Tiến Thành",
//               avatar:
//                 "https://www.dungplus.com/wp-content/uploads/2019/02/Roronoa-zoro-2-584x400.jpg",
//             },
//           ],
//         },
//         {
//           itemId: 5,
//           itemName: "ERD",
//           member: [
//             {
//               userId: 10,
//               name: "Nguyễn Tiến Thành",
//               avatar:
//                 "https://www.dungplus.com/wp-content/uploads/2019/02/Roronoa-zoro-2-584x400.jpg",
//             },
//           ],
//         },
//         {
//           itemId: 6,
//           itemName: "Connect to Firebase",
//           member: [
//             {
//               userId: 10,
//               name: "Nguyễn Tiến Thành",
//               avatar:
//                 "https://www.dungplus.com/wp-content/uploads/2019/02/Roronoa-zoro-2-584x400.jpg",
//             },
//           ],
//         },
//         {
//           itemId: 7,
//           itemName: "Authentication",
//           member: [
//             {
//               userId: 10,
//               name: "Nguyễn Tiến Thành",
//               avatar:
//                 "https://www.dungplus.com/wp-content/uploads/2019/02/Roronoa-zoro-2-584x400.jpg",
//             },
//           ],
//         },
//         {
//           itemId: 8,
//           itemName: "Example 1 Example 1Example 1Example 1Example 1Example 1",
//           member: [
//             {
//               userId: 10,
//               name: "Nguyễn Tiến Thành",
//               avatar:
//                 "https://www.dungplus.com/wp-content/uploads/2019/02/Roronoa-zoro-2-584x400.jpg",
//             },
//           ],
//         },
//         {
//           itemId: 9,
//           itemName: "Example 2",
//           member: [],
//         },
//       ],
//     },
//     {
//       cardId: "card2",
//       cardName: "Đang làm",
//       isActived: false,
//       items: [
//         {
//           itemId: 10,
//           itemName: "Profile page",
//           todoListId: 2,
//           member: [
//             {
//               userId: 10,
//               name: "Nguyễn Tiến Thành",
//               avatar:
//                 "https://www.dungplus.com/wp-content/uploads/2019/02/Roronoa-zoro-2-584x400.jpg",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       cardId: "card3",
//       cardName: "Đã xong",
//       isActived: true,
//       items: [
//         {
//           itemId: 11,
//           itemName: "Profile page",
//           member: [
//             {
//               userId: 20,
//               name: "Thanh Sơn",
//               avatar:
//                 "https://trello-members.s3.amazonaws.com/639ad9d4cbedbd01e3a44305/0b1305f382fac9e4d2312fab74fbd394/original.png",
//             },
//           ],
//         },
//         {
//           itemId: 12,
//           itemName: "WBS",
//           member: [
//             {
//               userId: 20,
//               name: "Thanh Sơn",
//               avatar:
//                 "https://trello-members.s3.amazonaws.com/639ad9d4cbedbd01e3a44305/0b1305f382fac9e4d2312fab74fbd394/original.png",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       cardId: "card4",
//       cardName: "Đã xong",
//       isActived: true,
//       items: [
//         {
//           itemId: 13,
//           itemName: "Profile page",
//           member: [
//             {
//               userId: 20,
//               name: "Thanh Sơn",
//               avatar:
//                 "https://trello-members.s3.amazonaws.com/639ad9d4cbedbd01e3a44305/0b1305f382fac9e4d2312fab74fbd394/original.png",
//             },
//           ],
//         },
//         {
//           itemId: 14,
//           itemName: "WBS",
//           member: [
//             {
//               userId: 20,
//               name: "Thanh Sơn",
//               avatar:
//                 "https://trello-members.s3.amazonaws.com/639ad9d4cbedbd01e3a44305/0b1305f382fac9e4d2312fab74fbd394/original.png",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       cardId: "card5",
//       cardName: "Deploy",
//       isActived: true,
//       items: [
//         {
//           itemId: 15,
//           itemName: "Profile page",
//           member: [
//             {
//               userId: 20,
//               name: "Thanh Sơn",
//               avatar:
//                 "https://trello-members.s3.amazonaws.com/639ad9d4cbedbd01e3a44305/0b1305f382fac9e4d2312fab74fbd394/original.png",
//             },
//           ],
//         },
//         {
//           itemId: 16,
//           itemName: "WBS",
//           member: [
//             {
//               userId: 20,
//               name: "Thanh Sơn",
//               avatar:
//                 "https://trello-members.s3.amazonaws.com/639ad9d4cbedbd01e3a44305/0b1305f382fac9e4d2312fab74fbd394/original.png",
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

const Workspace = () => {
  let { workspaceId } = useParams();
  const [loading, setLoading] = useState(false);
  const [workspace, setWorkspace] = useState<WorkspaceInterface>();
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [showCardAdd, setShowCardAdd] = useState(false);
  const [newCardName, setNewCardName] = useState("");

  const handleShowCardAdd = () => {
    setShowCardAdd(!showCardAdd);
  };

  const handleSetNewCardName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardName(e.target.value);
  };

  const handleAddNewCard = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmitAddCard();
      setNewCardName("");
    }
  };

  const handleSubmitAddCard = async () => {
    if (newCardName === "") {
      return alert("Please enter card name");
    }
    setNewCardName("");
    setShowCardAdd(!showCardAdd);
    await createCard(workspaceId, newCardName);
    await fetchCardFromWorkspace();
    // workspace.cards.push({
    //   cardId: "" + Math.random(),
    //   cardName: newCardName,
    //   isActived: true,
    //   items: [],
    // });
    // setWorkspace(workspace);
  };

  const fetchWorkspace = async () => {
    setLoading(true);
    const res = await getWorkspaceById(workspaceId);
    setWorkspace(res.data);
    setLoading(false);
  };

  const fetchCardFromWorkspace = async () => {
    setLoading(true);
    const res = await fetchCard(workspaceId);
    setCards(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkspace();
    fetchCardFromWorkspace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="workspace-container">
      {loading && <Loading />}
      <div
        className="wrapper"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${workspace?.workspaceImage})`,
        }}
      >
        <div className="header">
          <div className="header-workspace-name">
            {workspace?.workspaceName}
          </div>
          <div className="header-btn">
            <div title="Nhấn để xóa khỏi danh sách ưa thích">
              <span
                className="workspace-header-star-icon"
                onClick={() => alert("Đã hủy")}
              ></span>
            </div>
          </div>
          <div className="header-divider"></div>
          <div className="header-btn">
            <div>
              <span>
                <FaUsers />
              </span>
              <span>Hiển thị trong không gian làm việc</span>
            </div>
            <div className="header-divider"></div>
            <div>
              <span>
                <FaTable />
              </span>
              <span>Bảng</span>
            </div>
            <div>
              <span>
                <FaChevronDown />
              </span>
            </div>
            <div>
              <span>
                <FaPuzzlePiece />
              </span>
              <span>Tiện ích bổ sung</span>
            </div>
            <div>
              <span>
                <FaBolt />
              </span>
              <span>Tự động hóa</span>
            </div>

            <div className="header-divider"></div>
            <div>
              <span>
                <FaFilter />
              </span>
              <span>Lọc</span>
            </div>
          </div>
          <div className="header-divider"></div>

          <div className="header-participants">
            <div>
              {/* {workspace.member.map((user, index) => (
                <img src={user.avatar} alt="" key={index} />
              ))} */}
            </div>
            <div className="header-btn">
              <span>
                <FaUserPlus />
              </span>
              <span>Chia sẻ</span>
            </div>
          </div>
          <div className="header-divider"></div>
          <div className="header-btn">
            <div>
              <span>
                <FaEllipsisH />
              </span>
            </div>
          </div>
        </div>
        <div className="body">
          {cards.map((card) => {
            return (
              <Droppable droppableId={card.cardId!} key={card.cardId}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      key={card.cardId}
                    >
                      <Card
                        card={card}
                        placeholder={provided.placeholder}
                        isUsingPlaceholder={snapshot.isUsingPlaceholder}
                        fetchCardFromWorkspace={fetchCardFromWorkspace}
                      />
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
          <div className="card card-create">
            <div
              className="card-wrapper"
              style={{ backgroundColor: showCardAdd ? "#ebecf0" : "" }}
            >
              {!showCardAdd ? (
                <div className="card-header" onClick={handleShowCardAdd}>
                  <span>Tạo bảng mới</span>
                  <span>
                    <FaPlus />
                  </span>
                </div>
              ) : (
                <div className="card-body">
                  <InputAdd
                    handleSetNewName={handleSetNewCardName}
                    handleAddNew={(e) => handleAddNewCard(e)}
                    handleSubmitAdd={handleSubmitAddCard}
                    handleShowAdd={handleShowCardAdd}
                    placeholder={"bảng"}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
