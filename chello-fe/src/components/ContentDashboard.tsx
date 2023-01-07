import React, { Fragment } from "react";
import {
  FaInfoCircle,
  FaUser,
  FaRegStar,
  FaLock,
  FaUnlock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { WorkspaceInterface } from "../types";

interface Props {
  data: WorkspaceInterface[];
  isFavorite: boolean;
  filter: "favorited" | "another" | "mine" | "private";
  handleSubmit: (
    workspaceId: string | undefined,
    isFavorite: boolean | undefined
  ) => void;
}

const ContentDashboard = (props: Props) => {
  const { data, filter, handleSubmit } = props;
  const favoritedData = data.filter((x: any) => x.isFavorite === true);
  const mineData = data.filter((x: any) => x.isPublic === true);
  const privateData = data.filter((x: any) => x.isPublic === false);

  const handleClickStar = (
    workspaceId: string | undefined,
    isFavorite: boolean | undefined
  ) => {
    handleSubmit(workspaceId, isFavorite);
  };

  return (
    <section>
      <div className="content-title">
        {filter === "favorited" && (
          <>
            <FaRegStar />
            <h3>Các bảng ưa thích</h3>
          </>
        )}
        {filter === "another" && (
          <>
            <FaInfoCircle />
            <h3>CÁC KHÔNG GIAN LÀM VIỆC</h3>
          </>
        )}
        {filter === "mine" && (
          <>
            <FaUser />
            <h3>CÁC KHÔNG GIAN CÔNG KHAI CỦA BẠN</h3>
          </>
        )}
        {filter === "private" && (
          <>
            <FaLock />
            <h3>Không gian riêng tư</h3>
          </>
        )}
      </div>
      <div className="content-body">
        {filter === "favorited" &&
          favoritedData.map((ws: WorkspaceInterface) => (
            <Fragment key={ws.workspaceId}>
              <div key={ws.workspaceId}>
                <Link to={`/workspace/${ws.workspaceId}`}>
                  <img src={ws.workspaceImage} alt="" />
                  <span className="content-body-star-name">
                    {ws.workspaceName}
                  </span>
                </Link>
                <span
                  className={
                    ws.isFavorite
                      ? "content-body-star-icon"
                      : "content-body-unstar-icon"
                  }
                  onClick={(e) =>
                    handleClickStar(ws.workspaceId, ws.isFavorite)
                  }
                  title="Nhấn để xóa khỏi danh sách ưa thích"
                ></span>
              </div>
            </Fragment>
          ))}
        {filter === "mine" &&
          mineData.map((ws: WorkspaceInterface) => (
            <Fragment key={ws.workspaceId}>
              <div key={ws.workspaceId}>
                <Link to={`/workspace/${ws.workspaceId}`}>
                  <img src={ws.workspaceImage} alt="" />
                  <span className="content-body-star-name">
                    {ws.workspaceName}
                  </span>
                </Link>
                <span
                  className={
                    ws.isFavorite
                      ? "content-body-star-icon"
                      : "content-body-unstar-icon"
                  }
                  onClick={(e) =>
                    handleClickStar(ws.workspaceId, ws.isFavorite)
                  }
                  title="Nhấn để xóa khỏi danh sách ưa thích"
                ></span>
              </div>
            </Fragment>
          ))}
        {filter === "another" &&
          data.map((ws: WorkspaceInterface) => (
            <Fragment key={ws.workspaceId}>
              <div key={ws.workspaceId}>
                <Link to={`/workspace/${ws.workspaceId}`}>
                  <img src={ws.workspaceImage} alt="" />
                  <span className="content-body-star-name">
                    {ws.workspaceName}
                  </span>
                </Link>
                <span
                  className={
                    ws.isFavorite
                      ? "content-body-star-icon"
                      : "content-body-unstar-icon"
                  }
                  onClick={(e) =>
                    handleClickStar(ws.workspaceId, ws.isFavorite)
                  }
                  title="Nhấn để xóa khỏi danh sách ưa thích"
                ></span>
              </div>
            </Fragment>
          ))}
        {filter === "private" &&
          privateData.map((ws: WorkspaceInterface) => (
            <Fragment key={ws.workspaceId}>
              <div key={ws.workspaceId}>
                <Link to={`/workspace/${ws.workspaceId}`}>
                  <img src={ws.workspaceImage} alt="" />
                  <span className="content-body-star-name">
                    {ws.workspaceName}
                  </span>
                </Link>
                <span
                  className="content-body-lock-icon"
                  onClick={(e) => handleClickStar(ws.workspaceId, ws.isPublic)}
                  title="Nhấn để đổi chê độ thành công khai"
                >
                  <FaUnlock color="lightblue" size="20" />
                </span>
              </div>
            </Fragment>
          ))}
      </div>
    </section>
  );
};

export default ContentDashboard;
