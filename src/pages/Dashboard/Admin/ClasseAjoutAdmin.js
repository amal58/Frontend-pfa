import React from "react";
import SideBar from "../../../components/sideBar";
import TopBar from "../../../components/topBar";
import ClasseAjout from "../../../components/Admin/Classe/ClasseAjout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
const ClasseAjoutAdmin = () => {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBar />
        <div className="layout-page">
          <TopBar />
          <br />
          <h4 className="fw-bold py-1 mb-2" style={{ marginLeft: "1%" }}>
            <span className="text-muted">list/Classe/</span>
            Ajout
          </h4>
          <hr className="my-2" />
          <a
            href="/dashAdmin/ClasseList"
            style={{ fontSize: "110%", marginLeft: "3%" }}
          >
            <FontAwesomeIcon icon={faReply} /> retour
          </a>
          <div className="container mt-4">
            <div
              className="card"
              style={{
                backgroundColor: "white",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "0.5rem",
              }}
            >
              <ClasseAjout />
              <br></br>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClasseAjoutAdmin;
