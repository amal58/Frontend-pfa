import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faEdit,
  faPlus,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const DepartementList = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalMatieres, setTotalMatieres] = useState(0); // State pour le nombre total de matières

  const pageSize = 5; // Nombre d'éléments par page

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/depart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.model);
      setData(response.data.model);
      setTotalMatieres(response.data.model.length); // Mettre à jour le nombre total de matières
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
    if (data.length > pageSize * pageNumber) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/depart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      fetchData();
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleDeleteWithSwal = (id) => {
    // Ouvrir la boîte de dialogue Swal
    Swal.fire({
      title: "Voulez-vous supprimer cette classe?",
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

  //************* */

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/classe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("liste des classe:", response.data.classes);
      return response.data.classes;
    } catch (error) {
      console.error("Error fetching students:", error);
      return [];
    }
  };

  const fetchEnseignants = async () => {
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
      return response.data.model;
    } catch (error) {
      console.error("Error fetching teachers:", error);
      return [];
    }
  };
  //******* */
  const handleEditWithSwal = async (departId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/depart/${departId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const departData = response.data.model;

      console.log("objet est :", departData);

      const { nom, universite, classe, chef, enseignants } = departData;

      const fetchedClasses = await fetchClasses();
      const fetchedEnseignants = await fetchEnseignants();

      const selectedClasses = classe.map((classe) => classe._id);
      const selectedEnseignants = enseignants.map(
        (enseignant) => enseignant._id
      );

      // Créer le formulaire dans le Swal
      const { value: formValues } = await Swal.fire({
        title: "Modifier le département",
        html:
          `<label for="nom" class="form-label">Nom du département:</label>` +
          `<input type="text" id="nom" class="form-control" value="${nom}" required/>` +
          `<label for="universite" class="form-label">Université:</label>` +
          `<input type="text" id="universite" class="form-control" value="${universite}" required/>` +
          `<label for="classes" class="form-label">Classes:</label>` +
          `<ul class="list-group" style="max-height: 200px; overflow-y: scroll;">` +
          `${fetchedClasses
            .map(
              (classe) =>
                `<li class="list-group-item d-flex justify-content-between align-items-center">
                  ${classe.nom}
                  <input type="checkbox" id="classe-${classe._id}" ${
                  selectedClasses.includes(classe._id) ? "checked" : ""
                } class="form-check-input" />
                </li>`
            )
            .join("")}` +
          `</ul>` +
          `<label for="chef" class="form-label">Chef département:</label>` +
          `<input type="text" id="chef" class="form-control" value="${
            chef.nom
          } ${chef.prenom ? chef.prenom : ""}" required/>` +
          `<label for="enseignants" class="form-label">Enseignants:</label>` +
          `<ul class="list-group" style="max-height: 200px; overflow-y: scroll;">` +
          `${fetchedEnseignants
            .map(
              (enseignant) =>
                `<li class="list-group-item d-flex justify-content-between align-items-center">
                  ${enseignant.nom} ${enseignant.prenom}
                  <input type="checkbox" id="enseignant-${enseignant._id}" ${
                  selectedEnseignants.includes(enseignant._id) ? "checked" : ""
                } class="form-check-input" />
                </li>`
            )
            .join("")}` +
          `</ul>`,
        focusConfirm: false,
        preConfirm: () => {
          const selectedClasses = Array.from(
            document.querySelectorAll(".list-group-item input[type=checkbox]")
          )
            .filter((checkbox) => checkbox.id.startsWith("classe-"))
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.id.replace("classe-", ""));

          const selectedEnseignants = fetchedEnseignants
            .filter(
              (enseignant) =>
                document.getElementById(`enseignant-${enseignant._id}`).checked
            )
            .map((enseignant) => enseignant._id);
          return { selectedClasses, selectedEnseignants };
        },
      });

      if (formValues) {
        try {
          const token = localStorage.getItem("token");

          const response = await axios.patch(
            `http://localhost:5000/depart/${departId}`,
            {
              nom: document.getElementById("nom").value,
              universite: document.getElementById("universite").value,
              classe: formValues.selectedClasses,
              enseignants: formValues.selectedEnseignants,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Vérifier si la mise à jour a réussi
          if (response.status === 200) {
            Swal.fire(
              "Succès",
              "Le département a été mis à jour avec succès",
              "success"
            );
            // Rafraîchir la liste des départements après la mise à jour
            fetchData();
          } else {
            Swal.fire(
              "Erreur",
              "La mise à jour du département a échoué",
              "error"
            );
          }
        } catch (error) {
          console.error(
            "Erreur lors de la mise à jour du département :",
            error
          );
          Swal.fire(
            "Erreur",
            "Une erreur est survenue lors de la mise à jour du département",
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  const handleAddNewDepartement = () => {
    navigate(`/dashAdmin/DepartAjout`);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3
          className="demo menu-text fw-bolder ms-2"
          style={{ textAlign: "center" }}
        >
          Liste Des Départements
        </h3>

        <button className="btn btn-primary" onClick={handleAddNewDepartement}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Ajouter un
          département
        </button>
      </div>

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
      <table className="table table-hover mb-0">
        <thead style={{ backgroundColor: "#343a40", color: "#fff" }}>
          <tr>
            <th style={{ color: "white" }}>Nom</th>
            <th style={{ color: "white" }}>Université</th>
            <th style={{ color: "white" }}>Classe</th>
            <th style={{ color: "white" }}>Chef</th>
            <th style={{ color: "white" }}>Enseignant</th>
            <th style={{ color: "white" }}>Action</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "#f8f9fa", color: "#343a40" }}>
          {(data.length > 0
            ? data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
            : []
          ).map((depart) => (
            <tr key={depart._id} className="align-middle">
              <td>{depart.nom}</td>
              <td>{depart.universite}</td>
              <td>
                <select className="form-select">
                  {depart.classe &&
                    depart.classe.map((classe) => (
                      <option key={classe._id} value={classe._id}>
                        {classe.nom}
                      </option>
                    ))}
                </select>
              </td>
              <td>
                {depart.chef.nom} {depart.chef.prenom}
              </td>
              <td>
                <select className="form-select">
                  {depart.enseignants &&
                    depart.enseignants.map((enseignant) => (
                      <option key={enseignant._id} value={enseignant._id}>
                        {enseignant.nom} {enseignant.prenom}
                      </option>
                    ))}
                </select>
              </td>
              <td className="text-center">
                <div className="table-action">
                  <button
                    className="btn btn-outline-danger btn-sm ms-1"
                    onClick={() => handleDeleteWithSwal(depart._id)}
                    style={{ marginBottom: "2%" }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} /> Supprimer
                  </button>
                  <button
                    className="btn btn-outline-success btn-sm ms-1"
                    onClick={() => handleEditWithSwal(depart._id)}
                    style={{ width: "70%" }}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Modifier
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <button
          className="btn btn-outline-primary me-2"
          onClick={handlePrevPage}
          disabled={pageNumber === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>Page {pageNumber}</span>
        <button
          className="btn btn-outline-primary ms-2"
          onClick={handleNextPage}
          disabled={data.length <= pageSize * pageNumber}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </>
  );
};

export default DepartementList;
