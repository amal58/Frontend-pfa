import React from "react";
import SideBarEtudiant from "../../../components/Etudiant/sideBarEtudiant";
import TopBarEtud from "../../../components/Etudiant/topBarEtud";
function DashEtud() {
  return (
<>

<div class="layout-wrapper layout-content-navbar">
  <div class="layout-container">
  <SideBarEtudiant />
  <div class="layout-page">
  <TopBarEtud />
  </div>
  </div>
  </div>
  </>
  );
}

export default DashEtud;
