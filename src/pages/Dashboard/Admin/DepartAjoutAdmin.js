import React from "react";
import SideBar from "../../../components/sideBar";
import TopBar from "../../../components/topBar";
import DepartementAjout from "../../../components/Admin/Departement/DepartementAjout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
const DepartAjoutAdmin = () => {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBar />
        <div className="layout-page">
          <TopBar />

          <h4 className="fw-bold py-1 mb-2" style={{ marginLeft: "1%" }}>
            <span className="text-muted">list/Département/</span>
            Ajout
          </h4>
          <hr className="my-2" />
          <a
            href="/dashAdmin/Depart"
            style={{ fontSize: "110%", marginLeft: "3%" }}
          >
            <FontAwesomeIcon icon={faReply} /> retour
          </a>
          <div className="container mt-4">
            <div>
              <DepartementAjout />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartAjoutAdmin;
