import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import {
  FaBolt,
  FaChevronDown,
  FaEllipsisH,
  FaFilter,
  FaPuzzlePiece,
  FaTable,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import Card from "../components/Card";

const api = {
  name: "Chello",
  member: [
    {
      userId: 10,
      name: "Nguyễn Tiến Thành",
      avatar:
        "https://trello-members.s3.amazonaws.com/6208185d22378908eaf17722/6d5088726de9a21d241ba149c30f957c/50.png",
    },
    {
      userId: 20,
      name: "Thanh Sơn",
      avatar:
        "https://trello-members.s3.amazonaws.com/639ad9d4cbedbd01e3a44305/0b1305f382fac9e4d2312fab74fbd394/original.png",
    },
  ],
  cards: [
    {
      cardId: "card1",
      cardName: "Cần làm",
      isActived: true,
      items: [
        {
          itemId: 1,
          itemName: "Profile page",
          description: "This is profile page design",
          member: [
            {
              userId: 10,
              name: "Nguyễn Tiến Thành",
              avatar:
                "https://trello-members.s3.amazonaws.com/6208185d22378908eaf17722/6d5088726de9a21d241ba149c30f957c/50.png",
            },
            {
              userId: 20,
              name: "Thanh Sơn",
              avatar:
                "https://trello-members.s3.amazonaws.com/639ad9d4cbedbd01e3a44305/0b1305f382fac9e4d2312fab74fbd394/original.png",
            },
          ],
        },
        {
          itemId: 2,
          itemName: "Sign in page",
          description: "This is sign in page design",
          member: [
            {
              userId: 10,
              name: "Nguyễn Tiến Thành",
              avatar:
                "https://trello-members.s3.amazonaws.com/6208185d22378908eaf17722/6d5088726de9a21d241ba149c30f957c/50.png",
            },
          ],
        },
        {
          itemId: 3,
          itemName: "Sign up page",
          description: "It is so hard to design",
          member: [
            {
              userId: 10,
              name: "Nguyễn Tiến Thành",
              avatar:
                "https://trello-members.s3.amazonaws.com/6208185d22378908eaf17722/6d5088726de9a21d241ba149c30f957c/50.png",
            },
          ],
        },
        {
          itemId: 4,
          itemName: "Layout",
          todoListId: 1,
          member: [
            {
              userId: 10,
              name: "Nguyễn Tiến Thành",
              avatar:
                "https://trello-members.s3.amazonaws.com/6208185d22378908eaf17722/6d5088726de9a21d241ba149c30f957c/50.png",
            },
          ],
        },
        {
          itemId: 5,
          itemName: "ERD",
          member: [
            {
              userId: 10,
              name: "Nguyễn Tiến Thành",
              avatar:
                "https://trello-members.s3.amazonaws.com/6208185d22378908eaf17722/6d5088726de9a21d241ba149c30f957c/50.png",
            },
          ],
        },
        {
          itemId: 6,
          itemName: "Connect to Firebase",
          member: [
            {
              userId: 10,
              name: "Nguyễn Tiến Thành",
              avatar:
                "https://trello-members.s3.amazonaws.com/6208185d22378908eaf17722/6d5088726de9a21d241ba149c30f957c/50.png",
            },
          ],
        },
        {
          itemId: 7,
          itemName: "Authentication",
          member: [
            {
              userId: 10,
              name: "Nguyễn Tiến Thành",
              avatar:
                "https://trello-members.s3.amazonaws.com/6208185d22378908eaf17722/6d5088726de9a21d241ba149c30f957c/50.png",
            },
          ],
        },
        {
          itemId: 8,
          itemName: "Example 1 Example 1Example 1Example 1Example 1Example 1",
          member: [
            {
              userId: 10,
              name: "Nguyễn Tiến Thành",
              avatar:
                "https://trello-members.s3.amazonaws.com/6208185d22378908eaf17722/6d5088726de9a21d241ba149c30f957c/50.png",
            },
          ],
        },
        {
          itemId: 9,
          itemName: "Example 2",
          member: [],
        },
      ],
    },
    {
      cardId: "card2",
      cardName: "Đang làm",
      isActived: false,
      items: [
        {
          itemId: 10,
          itemName: "Profile page",
          todoListId: 2,
          member: [
            {
              userId: 10,
              name: "Nguyễn Tiến Thành",
              avatar:
                "https://trello-members.s3.amazonaws.com/6208185d22378908eaf17722/6d5088726de9a21d241ba149c30f957c/50.png",
            },
          ],
        },
      ],
    },
    {
      cardId: "card3",
      cardName: "Đã xong",
      isActived: true,
      items: [
        {
          itemId: 11,
          itemName: "Profile page",
          member: [
            {
              userId: 20,
              name: "Thanh Sơn",
              avatar:
                "https://trello-members.s3.amazonaws.com/639ad9d4cbedbd01e3a44305/0b1305f382fac9e4d2312fab74fbd394/original.png",
            },
          ],
        },
        {
          itemId: 12,
          itemName: "WBS",
          member: [
            {
              userId: 20,
              name: "Thanh Sơn",
              avatar:
                "https://trello-members.s3.amazonaws.com/639ad9d4cbedbd01e3a44305/0b1305f382fac9e4d2312fab74fbd394/original.png",
            },
          ],
        },
      ],
    },
    {
      cardId: "card4",
      cardName: "Đã xong",
      isActived: true,
      items: [
        {
          itemId: 13,
          itemName: "Profile page",
          member: [
            {
              userId: 20,
              name: "Thanh Sơn",
              avatar:
                "https://trello-members.s3.amazonaws.com/639ad9d4cbedbd01e3a44305/0b1305f382fac9e4d2312fab74fbd394/original.png",
            },
          ],
        },
        {
          itemId: 14,
          itemName: "WBS",
          member: [
            {
              userId: 20,
              name: "Thanh Sơn",
              avatar:
                "https://trello-members.s3.amazonaws.com/639ad9d4cbedbd01e3a44305/0b1305f382fac9e4d2312fab74fbd394/original.png",
            },
          ],
        },
      ],
    },
    {
      cardId: "card5",
      cardName: "Deploy",
      isActived: true,
      items: [
        {
          itemId: 15,
          itemName: "Profile page",
          member: [
            {
              userId: 20,
              name: "Thanh Sơn",
              avatar:
                "https://trello-members.s3.amazonaws.com/639ad9d4cbedbd01e3a44305/0b1305f382fac9e4d2312fab74fbd394/original.png",
            },
          ],
        },
        {
          itemId: 16,
          itemName: "WBS",
          member: [
            {
              userId: 20,
              name: "Thanh Sơn",
              avatar:
                "https://trello-members.s3.amazonaws.com/639ad9d4cbedbd01e3a44305/0b1305f382fac9e4d2312fab74fbd394/original.png",
            },
          ],
        },
      ],
    },
  ],
};

const Workspace = () => {
  const [workspace, setWorkspace] = useState(api);

  return (
    <div className="workspace-container">
      <div className="wrapper">
        <div className="header">
          <div className="header-workspace-name">{workspace.name}</div>
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
              {workspace.member.map((user, index) => (
                <img src={user.avatar} alt="" key={index} />
              ))}
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
          {workspace.cards.map((card) => {
            return (
              <Droppable droppableId={card.cardId} key={card.cardId}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      key={card.cardId}
                    >
                      <Card
                        data={card}
                        setCard={setWorkspace}
                        placeholder={provided.placeholder}
                        isUsingPlaceholder={snapshot.isUsingPlaceholder}
                      />
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Workspace;