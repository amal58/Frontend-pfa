import React, { useState } from "react";
import axios from "axios";
import SideBar from "../../../components/sideBar";
import TopBar from "../../../components/topBar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const MySwal = withReactContent(Swal);

function UploadPageAdmin() {
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const UploadFile = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", file);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/user",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        MySwal.fire({
          icon: "success",
          title: "Succès!",
          text: "Le fichier a été envoyé avec succès.",
        });
      } else {
        alert("Problème lors de l'envoi du fichier");
      }
    } catch (err) {
      console.log(err);
      alert("Une erreur s'est produite lors de l'envoi du fichier");
    }
  };

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SideBar />
          <div className="layout-page">
            <TopBar />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-1 mb-2" style={{ marginLeft: "1%" }}>
                  <span className="text-muted">List/</span>
                  Enseignants & Étudiants
                </h4>
                <hr className="my-2" />

                <br></br>
                <br></br>
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <br></br>
                      <h3
                        className="demo menu-text fw-bolder ms-2"
                        style={{ textAlign: "center", color: "#007bff" }}
                      >
                        <FontAwesomeIcon icon={faUpload} className="me-2" />
                        Importer le fichier des enseignants et des étudiants
                      </h3>

                      <div className="card-body demo-vertical-spacing demo-only-element">
                        <div className="input-group">
                          <input
                            type="file"
                            className="form-control"
                            id="inputGroupFile04"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                            onChange={handleChange}
                          />
                          <button
                            className="btn btn-primary"
                            type="button"
                            id="inputGroupFileAddon04"
                            onClick={UploadFile}
                          >
                            <FontAwesomeIcon icon={faUpload} className="me-2" />
                            Télécharger le fichier
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadPageAdmin;
