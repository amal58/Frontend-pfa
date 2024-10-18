import React from "react";

const SideBarEtudiant = () => {
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
            <a href="/dashEtudiant" className="menu-link">
              <i className="menu-icon tf-icons bx bx-home-circle"></i>
              <div>Dashboard</div>
            </a>
          </li>

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Pages</span>
          </li>
          <li className="menu-item">
            <a href="/ListMat" className="menu-link ">
              <i className="menu-icon tf-icons bx bx-dock-top"></i>
              <div>Matiéres</div>
            </a>
          </li>

          <li className="menu-item">
            <a href="/AllNotif" className="menu-link ">
              <i className="menu-icon tf-icons bx bx-lock-open-alt"></i>
              <div>Notifications</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="/listEnsg" className="menu-link ">
              <i className="menu-icon tf-icons bx bx-lock-open-alt"></i>
              <div>Enseignants</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="/profil" className="menu-link ">
              <i className="menu-icon tf-icons bx bx-lock-open-alt"></i>
              <div>Profil</div>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
};
export default SideBarEtudiant;
