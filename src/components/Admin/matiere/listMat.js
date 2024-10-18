import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faEdit,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const MatieresList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedMatiere, setSelectedMatiere] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [totalMatieres, setTotalMatieres] = useState(0); // State pour le nombre total de matières

  const pageSize = 5;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/matiere/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.model);
      setTotalMatieres(response.data.model.length); // Mettre à jour le nombre total de matières

      setLoading(false);
    } catch (err) {
      console.log(err.response);
      setLoading(false);
    }
  }

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (data.length > pageSize * pageNumber) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/matiere/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleDeleteWithSwal = (id) => {
    Swal.fire({
      title: "Voulez-vous supprimer cette matière?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer!",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleEdit = (matiere) => {
    setSelectedMatiere(matiere);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Your update logic here
  };

  const handleEditWithSwal = async (matiereId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/matiere/${matiereId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const matiereData = response.data.model;

      const { nom, code, coeff, nbHTotal, NbrHElim } = matiereData;

      const { value: formValues } = await Swal.fire({
        title: "Modifier la matière",
        html:
          `<label for="nom" class="form-label">Nom:</label>` +
          `<input type="text" id="nom" class="form-control" value="${nom}" required/>` +
          `<label for="code" class="form-label">Code:</label>` +
          `<input type="text" id="code" class="form-control" value="${code}" required/>` +
          `<label for="coeff" class="form-label">Coefficient:</label>` +
          `<input type="number" id="coeff" class="form-control" value="${coeff}" required/>` +
          `<label for="nbHTotal" class="form-label">NbH Total:</label>` +
          `<input type="number" id="nbHTotal" class="form-control" value="${nbHTotal}" required/>` +
          `<label for="NbrHElim" class="form-label">NBH Elim:</label>` +
          `<input type="number" id="NbrHElim" class="form-control" value="${NbrHElim}" required/>`,
        focusConfirm: false,
        preConfirm: () => {
          return {
            nom: document.getElementById("nom").value,
            code: document.getElementById("code").value,
            coeff: parseFloat(document.getElementById("coeff").value),
            nbHTotal: parseFloat(document.getElementById("nbHTotal").value),
            NbrHElim: parseFloat(document.getElementById("NbrHElim").value),
          };
        },
      });

      if (formValues) {
        try {
          await axios.patch(
            `http://localhost:5000/matiere/${matiereId}`,
            {
              nom: formValues.nom,
              code: formValues.code,
              coeff: formValues.coeff,
              nbHTotal: formValues.nbHTotal,
              NbrHElim: formValues.NbrHElim,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          Swal.fire(
            "Succès",
            "La matière a été mise à jour avec succès",
            "success"
          );

          fetchData();
        } catch (error) {
          console.error("Erreur lors de la mise à jour de la matière :", error);
          Swal.fire(
            "Erreur",
            "Une erreur est survenue lors de la mise à jour de la matière",
            "error"
          );
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de la matière :",
        error
      );
      Swal.fire(
        "Erreur",
        "Une erreur est survenue lors de la récupération des données de la matière",
        "error"
      );
    }
  };

  //************* */
  const tableHeaderStyle = {
    backgroundColor: "black",
    color: "white",
  };

  // Style pour les cellules de la table
  const tableCellStyle = {
    textAlign: "center",
    verticalAlign: "middle",
  };

  // Style pour les boutons "Supprimer" et "Modifier"
  const deleteButtonStyle = {
    backgroundColor: "white",
    color: "red",
    border: "1px solid red",
    marginRight: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    transition: "opacity 0.3s",
  };

  const editButtonStyle = {
    backgroundColor: "white",
    color: "#3498db",
    border: "1px solid #3498db",
    padding: "5px 10px",
    cursor: "pointer",
    transition: "opacity 0.3s",
  };

  // Style pour les boutons de pagination
  const paginationButtonStyle = {
    margin: "0 5px",
    padding: "5px 10px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };

  // Style pour le texte de pagination
  const paginationInfoStyle = {
    margin: "0 10px",
    fontWeight: "bold",
  };

  // Style pour le formulaire d'édition
  const editFormStyle = {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  };

  return (
    <>
      {loading && (
        <div className="col-md">
          <div className="text-light small fw-semibold">Loading</div>
          <div className="demo-inline-spacing">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <>
          <label
            className="fw-bolder badge bg-label-success"
            style={{
              color: "#a9aab0",
              fontWeight: "bold",
              fontSize: "110%",
              display: "flex",
              alignItems: "center",
              marginLeft: "2%",
              width: "32%",
            }}
          >
            Nombre total de matières : {totalMatieres}
          </label>
          <br></br>
          <table className="table table-bordered">
            <thead style={tableHeaderStyle}>
              <tr>
                <th style={{ tableCellStyle, color: "white" }}>Nom</th>
                <th style={{ tableCellStyle, color: "white" }}>Code</th>
                <th style={{ tableCellStyle, color: "white" }}>Coefficient</th>
                <th style={{ tableCellStyle, color: "white" }}>NbH tOT</th>
                <th style={{ tableCellStyle, color: "white" }}>NBH Elim</th>
                <th
                  className="text-center"
                  style={{ tableCellStyle, color: "white" }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data
                  .slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
                  .map((matiere, index) => (
                    <tr key={matiere._id}>
                      <td style={tableCellStyle}>{matiere.nom}</td>
                      <td style={tableCellStyle}>{matiere.code}</td>
                      <td style={tableCellStyle}>{matiere.coeff}</td>
                      <td style={tableCellStyle}>{matiere.nbHTotal}</td>
                      <td style={tableCellStyle}>{matiere.NbrHElim}</td>
                      <td className="text-center">
                        <button
                          style={deleteButtonStyle}
                          onClick={() => handleDeleteWithSwal(matiere._id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} /> Supprimer
                        </button>
                        <button
                          style={editButtonStyle}
                          onClick={() => handleEditWithSwal(matiere._id)}
                        >
                          <FontAwesomeIcon icon={faEdit} /> Modifier
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="6">Aucune donnée</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination d-flex justify-content-center align-items-center mt-3">
            <button
              style={paginationButtonStyle}
              onClick={handlePrevPage}
              disabled={pageNumber === 1}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span style={paginationInfoStyle}>Page {pageNumber}</span>
            <button
              style={paginationButtonStyle}
              onClick={handleNextPage}
              disabled={data.length <= pageSize * pageNumber}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          {isEditing && selectedMatiere && (
            <div style={editFormStyle}>
              <h2>Modifier Matière</h2>
              <form onSubmit={handleUpdate}>
                {/* Vos inputs de formulaire ici */}
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MatieresList;
