import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MatiereEnseignant = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 5; // Nombre d'éléments par page

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchTerm, data]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/matiere/listMatByEnseige",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("hedhi response", response);
      setData(response.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const filterData = () => {
    if (Array.isArray(data)) {
      const filtered = data.filter((item) =>
        item.matiere.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
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

  const handleDetailsClick = (matiereId, classes) => {
    if (classes.length === 1) {
      const classeId = classes[0].classeId;
      navigate(
        `/dashEnseignant/etudiant?matiereId=${matiereId}&classeId=${classeId}`
      );
    } else {
      const options = classes.map(
        (classe) => `${classe.nomClasse} - ${classe.niveau}`
      );

      Swal.fire({
        title: "Sélectionnez une classe",
        input: "select",
        inputOptions: options,
        showCancelButton: true,
        cancelButtonText: "Annuler",
        confirmButtonText: "Confirmer",
      }).then((result) => {
        if (result.isConfirmed) {
          const selectedOption = options[result.value];
          const selectedClass = classes.find(
            (classe) =>
              `${classe.nomClasse} - ${classe.niveau}` === selectedOption
          );
          const classeId = selectedClass.classeId;
          navigate(
            `/dashEnseignant/etudiant?matiereId=${matiereId}&classeId=${classeId}`
          );
        }
      });
    }
  };

  let uniqueClasses = new Set();

  // Parcours de toutes les matières pour obtenir les noms de classe uniques
  Object.values(data).forEach((matiere) => {
    matiere.classes.forEach((classe) => {
      uniqueClasses.add(classe.nomClasse);
    });
  });

  // Calcul du nombre total de classes uniques
  let totalUniqueClasses = uniqueClasses.size;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "500px",
            alignItems: "center",
          }}
        >
          <label
            className="demo menu-text fw-bolder badge bg-label-success"
            style={{
              color: "#a9aab0",
              fontWeight: "bold",
              fontSize: "110%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <i className="bx bx-book" style={{ marginRight: "8px" }}></i>
            Nombre de matières : {Object.keys(data).length}
          </label>
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
            <i className="bx bx-bell" style={{ marginRight: "8px" }}></i>
            Nombre de classes : {totalUniqueClasses}
          </label>
        </div>
      </div>

      <br></br>

      <br></br>
      <table
        className="table table-hover table-striped table-bordered text-center mb-0"
        style={{
          width: "95%",
          margin: "0 auto",
          border: "1px solid #dee2e6",
          borderRadius: "5px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <thead style={{ backgroundColor: "#343a40", color: "white" }}>
          <tr>
            <th
              style={{ fontWeight: "bold", fontSize: "1.1em", color: "white" }}
            >
              Nom
            </th>
            <th
              style={{ fontWeight: "bold", fontSize: "1.1em", color: "white" }}
            >
              Heures
            </th>
            <th
              style={{ fontWeight: "bold", fontSize: "1.1em", color: "white" }}
            >
              Coefficient
            </th>
            <th
              style={{ fontWeight: "bold", fontSize: "1.1em", color: "white" }}
            >
              Classes
            </th>
            <th
              style={{ fontWeight: "bold", fontSize: "1.1em", color: "white" }}
            >
              Détails
            </th>
          </tr>
        </thead>
        <tbody style={{ color: "#343a40" }}>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td style={{ verticalAlign: "middle" }}>{value.matiere}</td>
              <td style={{ verticalAlign: "middle" }}>{value.nbHTotal}</td>
              <td style={{ verticalAlign: "middle" }}>{value.coeff}</td>
              <td style={{ verticalAlign: "middle" }}>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  {value.classes.map((classe, index) => (
                    <li key={`${key}-classe-${index}`}>
                      {classe.nomClasse} - {classe.niveau}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="text-right" style={{ verticalAlign: "middle" }}>
                <div className="table-action">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDetailsClick(key, value.classes)}
                  >
                    <i
                      className="bx bx-list-check"
                      style={{ fontSize: "1.5em" }}
                    ></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <div className="pagination" style={{ marginLeft: "5%", color: "black" }}>
        <button
          className="pagination-btn pagination-info badge bg-primary"
          onClick={handlePrevPage}
          disabled={pageNumber === 1}
        >
          Prev
        </button>
        <span className="pagination-info"> Page {pageNumber}</span>
        <button
          className="pagination-btn pagination-info badge bg-primary"
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

export default MatiereEnseignant;
