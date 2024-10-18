import React from "react";
import io from "socket.io-client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const TopBarEtud = () => {
  const [count, setCount] = useState([]);
  const [data, setData] = useState([]);
  const nom = localStorage.getItem("nom");
  const prenom = localStorage.getItem("prenom");
  const navigate = useNavigate();
  useEffect(() => {
    const id = localStorage.getItem("idUser");
    const socket = io("http://localhost:5000");
    console.log(localStorage.getItem("idUser"));
    socket.emit("notification", localStorage.getItem("idUser"));
    socket.on("newNotifs", (dataServer) => {
      setCount(dataServer.length);
      setData(dataServer);
    });
  }, [data]);

  async function NotiList() {
    try {
      const id = localStorage.getItem("idUser");
      const response = await axios.patch(
        `http://localhost:5000/notif/update/${id}`
      );
    } catch (err) {
      console.log(err.response);
    }
  }

  async function logout() {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("idUser");
      navigate("/");
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    }
  }
  return (
    <>
      <nav
        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a
            className="nav-item nav-link px-0 me-xl-4"
            href="javascript:void(0)"
          >
            <i className="bx bx-menu bx-sm"></i>
          </a>
        </div>

        <div
          className="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          <div className="navbar-nav align-items-center">
            <div className="nav-item d-flex align-items-center">
              <i className="bx bx-search fs-4 lh-0"></i>
              <input
                type="text"
                className="form-control border-0 shadow-none"
                placeholder="Search..."
                aria-label="Search..."
              />
            </div>
          </div>
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li>
              <div className="demo-inline-spacing">
                <div className="btn-group" id="dropdown-icon-demo">
                  <button
                    onClick={NotiList}
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bx bx-bell">
                      {count > 0 && <span>{count}</span>}
                    </i>
                  </button>
                  <ul className="dropdown-menu">
                    {data.map((e, index) => (
                      <li key={index}>
                        <a className="dropdown-item d-flex align-items-center">
                          <i className=" scaleX-n1-rtl"></i> {e.contenu}{" "}
                          {e.elimination.matiere.nom}
                        </a>
                      </li>
                    ))}

                    <li>
                      <a
                        href="/AllNotif"
                        class="dropdown-item d-flex align-items-center"
                      >
                        <i class="bx bx-chevron-right scaleX-n1-rtl"></i>Lister
                        les Notifications
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a
                className="nav-link dropdown-toggle hide-arrow"
                href="javascript:void(0);"
                data-bs-toggle="dropdown"
              >
                <div className="avatar avatar-online">
                  <img
                    src="../assets/img/avatars/1.png"
                    alt
                    className="w-px-40 h-auto rounded-circle"
                  />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <img
                            src="../assets/img/avatars/1.png"
                            alt
                            className="w-px-40 h-auto rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-semibold d-block">
                          {nom} {prenom}
                        </span>
                        <small className="text-muted">Etudiant</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                </li>
                <li>
                  <a className="dropdown-item" href="">
                    <i className="bx bx-user me-2"></i>
                    <span className="align-middle">Profil</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="">
                    <i className="bx bx-cog me-2"></i>
                    <span className="align-middle">Paramètres</span>
                  </a>
                </li>

                <li>
                  <div className="dropdown-divider"></div>
                </li>
                <li>
                  <a className="dropdown-item" href="">
                    <i className="bx bx-power-off me-2"></i>
                    <span onClick={logout} className="align-middle">
                      Se déconnecter
                    </span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default TopBarEtud;
