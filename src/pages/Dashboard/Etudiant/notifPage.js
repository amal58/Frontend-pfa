import React from "react";
import SideBarEtudiant from "../../../components/Etudiant/sideBarEtudiant";
import TopBarEtud from "../../../components/Etudiant/topBarEtud";
import NotifList from "../../../components/Etudiant/notif";

const NotifPage = () => {
    return (
  <div className="layout-wrapper layout-content-navbar">
  <div className="layout-container">
  <SideBarEtudiant />
  <div className="layout-page">
  <TopBarEtud />
  <div className="content-wrapper">
<div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">All/</span> Notifications</h4>
            <NotifList/>
    </div>
    </div>
      
  </div>
  </div>
  </div>
      
    )


}


export default NotifPage;