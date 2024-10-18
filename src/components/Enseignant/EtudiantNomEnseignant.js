import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CSVLink } from "react-csv";

const EtudiantNomEnseignant = (props) => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const pageSize = 5;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const matiereId = searchParams.get("matiereId");
  const classeId = searchParams.get("classeId");

  useEffect(() => {
    fetchData();
  }, [matiereId, classeId]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/elimine/etudiantsNomines/${classeId}/${matiereId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
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
    if (data?.etudiants.length > pageSize * pageNumber) {
      setPageNumber(pageNumber + 1);
    }
  };

  const filename = `${data?.classe}_${data?.matiere}_nomines.csv`;

  return (
    <div className="card">
      <div className="table-responsive text-nowrap">
        <CSVLink
          data={
            data?.etudiants.map((etudiant) => ({
              id: etudiant.id,
              nom: etudiant.nom,
              prenom: etudiant.prenom,
              matiere: data.matiere,
              classe: data.classe,
            })) || []
          }
          filename={filename}
          className="btn btn-primary"
          style={{ marginLeft: "83%", marginTop: "2%" }}
        >
          <i className="bx bx-download"></i> Exporter
        </CSVLink>
        <div style={{ margin: "20px auto", maxWidth: "500px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          ></div>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "20%" }}
        >
          <label
            className="demo menu-text fw-bolder"
            style={{ marginRight: "20px", color: "#4CAF50" }}
          >
            la classe est : {data?.classe}
          </label>
          <label
            className="demo menu-text fw-bolder"
            style={{ marginRight: "20px", color: "#4CAF50" }}
          >
            la matiere est : {data?.matiere}
          </label>
          <label
            className="demo menu-text fw-bolder"
            style={{ color: "#4CAF50" }}
          >
            Nombre de nominés : {data?.etudiants ? data.etudiants.length : 0}
          </label>
        </div>
        <br></br>
        <br></br>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Matière</th>
              <th>Classe</th>
              <th>État</th>
            </tr>
          </thead>
          <tbody>
            {data?.etudiants &&
              data.etudiants.map((etudiant) => (
                <tr key={etudiant.id}>
                  <td>{etudiant.nom}</td>
                  <td>{etudiant.prenom}</td>
                  <td>{data.matiere}</td>
                  <td>{data.classe}</td>
                  <td>
                    <span
                      className="badge bg-label-warning"
                      style={{ fontSize: "100%", marginLeft: "-15%" }}
                    >
                      Nominé
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <br></br>
        <div
          className="pagination"
          style={{ marginLeft: "5%", color: "black" }}
        >
          <button
            className="pagination-btn pagination-info badge bg-success"
            onClick={handlePrevPage}
            disabled={pageNumber === 1}
          >
            <i className="bx bx-chevrons-left"></i>
          </button>
          <span className="pagination-info"> Page {pageNumber}</span>
          <button
            className="pagination-btn pagination-info badge bg-success"
            onClick={handleNextPage}
            disabled={data?.etudiants.length <= pageSize * pageNumber}
          >
            <i className="bx bx-chevrons-right"></i>
          </button>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default EtudiantNomEnseignant;
