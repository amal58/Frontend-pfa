import React from "react";

const SideBar = () => {
  return (
    <div className="layout-menu menu-vertical menu bg-menu-theme">
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme"
      >
        <div className="app-brand demo">
          <a href="" className="app-brand-link">
            <span className="app-brand-logo demo"></span>
            <span className="app-brand-text demo menu-text fw-bolder ms-2">
              ISAMM
            </span>
          </a>
        </div>

        <div className="menu-inner-shadow"></div>

        <ul className="menu-inner py-1">
          <li className="menu-item active">
            <a href="/dashAdmin" className="menu-link">
              <i className="menu-icon tf-icons bx bx-home-circle"></i>
              <div>Dashboard</div>
            </a>
          </li>

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Pages</span>
          </li>
          <li className="menu-item">
            <a href="/Matiere" className="menu-link ">
              <i className="menu-icon tf-icons bx bx-dock-top"></i>
              <div>Liste des Matiéres </div>
            </a>
          </li>
          <li className="menu-item">
            <a href="/dashAdmin/Depart" className="menu-link ">
              <i className="menu-icon tf-icons bx bx-dock-top"></i>
              <div>Liste des Départments</div>
            </a>
          </li>

          <li className="menu-item">
            <a href="/dashAdmin/ClasseList" className="menu-link ">
              <i className="menu-icon tf-icons bx bx-lock-open-alt"></i>
              <div>Liste des Classes </div>
            </a>
          </li>
          <li className="menu-item">
            <a href="/dashAdmin/ListeEtudiants" className="menu-link ">
              <i className="menu-icon tf-icons bx bx-lock-open-alt"></i>
              <div>Liste des Etudiants</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="/dashAdmin/ListeEnseignants" className="menu-link ">
              <i className="menu-icon tf-icons bx bx-lock-open-alt"></i>
              <div>Liste des Enseignants</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="/Upload" className="menu-link ">
              <i className="menu-icon tf-icons bx bx-down-arrow-alt"></i>
              <box-icon name="down-arrow-alt"></box-icon>
              <div>Charger un fichier </div>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
};
export default SideBar;
