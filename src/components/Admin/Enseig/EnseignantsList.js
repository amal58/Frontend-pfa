import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const EnseignantsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalMatieres, setTotalMatieres] = useState(0); // State pour le nombre total de matières

  const pageSize = 5;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/user/enseignantsList",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      await axios.delete(`http://localhost:5000/user/${id}`, {
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
      title: "Voulez-vous supprimer cet enseignant?",
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

  const styles = {
    table: {
      width: "100%",
      borderCollapse: "collapse",
      margin: "20px 0",
      fontSize: "1em",
      fontFamily: "'Arial', sans-serif",
      backgroundColor: "#f2f2f2",
    },
    thead: {
      backgroundColor: "black",
      color: "white",
    },
    th: {
      padding: "12px 15px",
      textAlign: "left",
      border: "1px solid #ddd",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    },
    td: {
      padding: "12px 15px",
      textAlign: "left",
      border: "1px solid #ddd",
    },
    tbodyTrEven: {
      backgroundColor: "#f9f9f9",
    },
    tbodyTrHover: {
      backgroundColor: "#f1f1f1",
    },
    button: {
      padding: "8px 12px",
      margin: "5px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonDanger: {
      backgroundColor: "#d9534f",
      color: "white",
    },
    buttonDangerHover: {
      backgroundColor: "#c9302c",
    },
    buttonPrimary: {
      backgroundColor: "#0275d8",
      color: "white",
    },
    buttonPrimaryHover: {
      backgroundColor: "#025aa5",
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "20px 0",
    },
    paginationBtn: {
      padding: "10px 20px",
      margin: "0 5px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      backgroundColor: "#0275d8",
      color: "white",
    },
    paginationBtnDisabled: {
      backgroundColor: "#ddd",
      cursor: "not-allowed",
    },
    paginationInfo: {
      margin: "0 10px",
      fontWeight: "bold",
    },
    spinner: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
    },
    spinnerBorder: {
      marginRight: "10px",
    },
  };

  return (
    <>
      {loading && (
        <div style={styles.spinner}>
          <div
            className="spinner-border text-primary"
            style={styles.spinnerBorder}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <div
            className="spinner-border text-secondary"
            style={styles.spinnerBorder}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
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

          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Nom</th>
                <th style={styles.th}>Prénom</th>
                <th style={styles.th}>Adresse Email</th>
                <th style={styles.th}>Téléphone</th>
                <th style={styles.th}>Titre</th>
                <th style={styles.th}>Université</th>
                <th style={styles.th} className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data
                  .slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
                  .map((enseignant) => (
                    <tr
                      key={enseignant._id}
                      style={
                        enseignant.index % 2 === 0 ? styles.tbodyTrEven : {}
                      }
                    >
                      <td style={styles.td}>{enseignant.nom}</td>
                      <td style={styles.td}>{enseignant.prenom}</td>
                      <td style={styles.td}>{enseignant.email}</td>
                      <td style={styles.td}>{enseignant.telephone}</td>
                      <td style={styles.td}>{enseignant.titre}</td>
                      <td style={styles.td}>{enseignant.universite}</td>
                      <td style={styles.td} className="text-center">
                        <button
                          style={{ ...styles.button, ...styles.buttonDanger }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              styles.buttonDangerHover.backgroundColor)
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              styles.buttonDanger.backgroundColor)
                          }
                          onClick={() => handleDeleteWithSwal(enseignant._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} /> Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="7" style={styles.td}>
                    Aucune donnée disponible
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={styles.pagination}>
            <button
              style={
                pageNumber === 1
                  ? { ...styles.paginationBtn, ...styles.paginationBtnDisabled }
                  : styles.paginationBtn
              }
              onClick={handlePrevPage}
              disabled={pageNumber === 1}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <span style={styles.paginationInfo}>Page {pageNumber}</span>
            <button
              style={
                data.length <= pageSize * pageNumber
                  ? { ...styles.paginationBtn, ...styles.paginationBtnDisabled }
                  : styles.paginationBtn
              }
              onClick={handleNextPage}
              disabled={data.length <= pageSize * pageNumber}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default EnseignantsList;
