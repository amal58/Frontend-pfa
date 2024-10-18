import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "boxicons/css/boxicons.min.css";

const EtudiantsListEnseig = (props) => {
  const navigate = useNavigate();

  const [data, setData] = useState(null); // Initialiser avec null plutôt que []
  const [pageNumber, setPageNumber] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const pageSize = 5; // Nombre d'éléments par page

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const matiereId = searchParams.get("matiereId");
  const classeId = searchParams.get("classeId");

  useEffect(() => {
    console.log("ID de matière:", matiereId);
    console.log("ID de classe:", classeId);
    fetchData();
  }, [matiereId, classeId]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/classe/classes/${classeId}/matieres/${matiereId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("yaa rabi", response.data);
      setData(response.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (filteredData.length > pageSize * pageNumber) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleAjoutClick = (matiereId, etudiantId) => {
    console.log("matiere", matiereId, "etudiant", etudiantId);
    Swal.fire({
      title: "Voulez-vous ajouter une absence pour cet étudiant ?",
      text: `${
        data.etudiants.find((etudiant) => etudiant._id === etudiantId).nom
      } ${
        data.etudiants.find((etudiant) => etudiant._id === etudiantId).prenom
      }`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Enregistrer",
    }).then((result) => {
      if (result.isConfirmed) {
        enregistrerAbsence(matiereId, etudiantId);
      }
    });
  };

  const enregistrerAbsence = async (matiereId, etudiantId) => {
    try {
      const token = localStorage.getItem("token");
      console.log("fonct 2 etud", etudiantId, "mat", matiereId);
      console.log(new Date());
      const response = await axios.post(
        `http://localhost:5000/absence`,
        {
          date: new Date().toISOString(),
          etudiant: etudiantId,
          matiere: matiereId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      Swal.fire({
        title: "Absence enregistrée avec succès!",
        icon: "success",
      });
      fetchData();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'absence :", error);
      Swal.fire({
        title: "Erreur",
        text: "Une erreur s'est produite lors de l'enregistrement de l'absence.",
        icon: "error",
      });
    }
  };

  const retourClick = () => {
    navigate("/dashEnseignant");
  };

  const elimineClick = () => {
    navigate(
      `/dashEnseignant/elimineList?matiereId=${matiereId}&classeId=${classeId}`
    );
  };

  const nomineClick = () => {
    navigate(
      `/dashEnseignant/nomineList?matiereId=${matiereId}&classeId=${classeId}`
    );
  };

  return (
    <div>
      <div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <button
            className="btn"
            onClick={() => retourClick()}
            style={{ marginRight: "60%" }}
          >
            <i
              className="bx bx-left-arrow-alt"
              style={{ fontSize: "200%", color: "black" }}
            ></i>
          </button>
          <button
            className="btn badge "
            onClick={() => nomineClick()}
            style={{
              backgroundColor: "white",
              marginRight: "1%",
              color: "black",
            }}
          >
            Etudiants nominés
          </button>
          <button
            className="btn badge"
            onClick={() => elimineClick()}
            style={{
              backgroundColor: "white",
              marginRight: "1%",
              color: "black",
            }}
          >
            Etudiants eliminés
          </button>
        </div>
        <br></br>
        <br></br>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: "20px", // Ajoute un espace entre les éléments
        }}
      >
        <div>
          <label
            className="demo menu-text fw-bolder badge bg-label-success"
            style={{
              color: "#a9aab0",
              fontWeight: "bold",
              fontSize: "110%",
              display: "flex",
              alignItems: "center",
              marginLeft: "2%",
            }}
          >
            <i className="bx bx-bell"></i>
            {data?.classe}
          </label>
        </div>
        <div>
          <label
            className="demo menu-text fw-bolder badge bg-label-success"
            style={{
              color: "#a9aab0",
              fontWeight: "bold",
              fontSize: "110%",
              display: "flex",
              alignItems: "center",
              marginLeft: "2%",
            }}
          >
            <i className="bx bx-user"></i>
            {"  "}Nombre d'étudiants :{" "}
            {data?.etudiants ? data.etudiants.length : 0}
          </label>
        </div>
      </div>
      <br></br>

      <br></br>
      <table
        className="table table-hover table-center mb-0"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th
              className="text-dark py-3"
              style={{ fontWeight: "bold", fontSize: "0.8rem" }}
            >
              Nom & Prénom
            </th>
            <th
              className="text-dark py-3"
              style={{ fontWeight: "bold", fontSize: "0.8rem" }}
            >
              Nombre d'absences
            </th>
            <th
              className="text-dark py-3"
              style={{ fontWeight: "bold", fontSize: "0.8rem" }}
            >
              État
            </th>
            <th
              className="text-center text-dark py-3"
              style={{ fontWeight: "bold", fontSize: "0.8rem" }}
            >
              Ajouter absence
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ color: "black" }}>
          {data?.etudiants &&
            data.etudiants.map((etudiant) => (
              <tr key={etudiant._id}>
                <td
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "10px 20px",
                  }}
                >{`${etudiant.nom} ${etudiant.prenom}`}</td>
                <td
                  style={{
                    borderBottom: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {etudiant.nbAbsences}
                </td>
                <td
                  style={{
                    borderBottom: "1px solid #ddd",
                    marginLeft: "50%",
                  }}
                >
                  {etudiant.etat || "----"}
                </td>
                <td
                  className="text-center"
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "10px 20px",
                  }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAjoutClick(matiereId, etudiant._id)}
                  >
                    <i
                      className="bx bx-plus"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br></br>
      <div className="pagination" style={{ marginLeft: "5%", color: "black" }}>
        <button
          className="pagination-btn pagination-info badge bg-success"
          onClick={handlePrevPage}
          disabled={pageNumber === 1}
        >
          Prev
        </button>
        <span className="pagination-info"> Page {pageNumber}</span>
        <button
          className="pagination-btn pagination-info badge bg-success"
          onClick={handleNextPage}
          disabled={filteredData.length <= pageSize * pageNumber}
        >
          Next
        </button>
      </div>
      <br />
    </div>
  );
};

export default EtudiantsListEnseig;
