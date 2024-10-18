import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faEdit,
  faPlus,
  faShop,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ClasseList = () => {
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
      const response = await axios.get("http://localhost:5000/classe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.classes);
      setTotalMatieres(response.data.classes.length); // Mettre à jour le nombre total de matières

      console.log(response.data.classes);
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
        `http://localhost:5000/classe/${id}`,
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
      // Si l'utilisateur confirme la suppression
      if (result.isConfirmed) {
        // Appeler la fonction handleDelete
        handleDelete(id);
      }
    });
  };
  //************* */
  const fetchEtudiants = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/user/etudiantsList",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.model;
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

  const fetchMatieres = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/matiere", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("matieres", response.data.model);
      return response.data.model;
    } catch (error) {
      console.error("Error fetching subjects:", error);
      return [];
    }
  };

  // //*********** */
  // const handleEditWithSwal = async (classeId) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(
  //       `http://localhost:5000/classe/${classeId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(response.data.model);

  //     const classeData = response.data.model;
  //     console.log(classeData.etudiants);
  //     console.log(classeData);

  //     const { nom, niveau, etudiants, enseignants, matieres } = classeData;

  //     const fetchedEtudiants = await fetchEtudiants();
  //     const fetchedEnseignants = await fetchEnseignants();
  //     const fetchedMatieres = await fetchMatieres();

  //     const selectedEtudiants = etudiants.map((etudiant) => etudiant._id);
  //     const selectedEnseignants = enseignants.map(
  //       (enseignant) => enseignant._id
  //     );
  //     const selectedMatieres = matieres.map((matiere) => {
  //       return {
  //         _id: matiere.nomMatiere._id,
  //         nom: matiere.nomMatiere.nom,
  //         dateDebut: new Date(matiere.dateDebut).toISOString().substring(0, 10), // Date de début formatée
  //         dateFin: new Date(matiere.dateFin).toISOString().substring(0, 10), // Date de fin formatée
  //       };
  //     });

  //     // Créer le formulaire dans le Swal
  //     const { value: formValues } = await Swal.fire({
  //       title: "Modifier la classe",
  //       html:
  //         `<label for="nomClasse">Nom de la classe:</label>` +
  //         `<input type="text" id="nomClasse" class="form-control" value="${nom}" required/>` +
  //         `<label for="niveau">Niveau de la classe:</label>` +
  //         `<input type="text" id="niveau" class="form-control" value="${niveau}" required/>` +
  //         `<label for="etudiants">Étudiants:</label>` +
  //         `<ul class="list-group" style="max-height: 200px; overflow-y: scroll;">` +
  //         `${fetchedEtudiants
  //           .map(
  //             (etudiant) =>
  //               `<li class="list-group-item d-flex justify-content-between align-items-center">
  //             ${etudiant.nom} ${etudiant.prenom}
  //             <input type="checkbox" id="etudiant-${etudiant._id}" ${
  //                 selectedEtudiants.includes(etudiant._id) ? "checked" : ""
  //               } />
  //           </li>`
  //           )
  //           .join("")}` +
  //         `</ul>` +
  //         `<label for="enseignants">Enseignants:</label>` +
  //         `<ul class="list-group" style="max-height: 200px; overflow-y: scroll;">` +
  //         `${fetchedEnseignants
  //           .map(
  //             (enseignant) =>
  //               `<li class="list-group-item d-flex justify-content-between align-items-center">
  //             ${enseignant.nom} ${enseignant.prenom}
  //             <input type="checkbox" id="enseignant-${enseignant._id}" ${
  //                 selectedEnseignants.includes(enseignant._id) ? "checked" : ""
  //               } />
  //           </li>`
  //           )
  //           .join("")}` +
  //         `</ul>` +
  //         `<label for="matieres">Matieres:</label>` +
  //         `<ul class="list-group" style="max-height: 200px; overflow-y: scroll;">` +
  //         `${fetchedMatieres
  //           .map(
  //             (matiere) =>
  //               `<li class="list-group-item d-flex justify-content-between align-items-center">
  //             <div>
  //               <span>${matiere.nom}</span>
  //               <input type="checkbox" id="matiere-${matiere._id}" ${
  //                 selectedMatieres.some(
  //                   (selectedMatiere) => selectedMatiere._id === matiere._id
  //                 )
  //                   ? "checked"
  //                   : ""
  //               } />
  //             </div>
  //             <div>
  //               <label for="dateDebut-${matiere._id}">Date début:</label>
  //               <input
  //                 type="date"
  //                 id="dateDebut-${matiere._id}"
  //                 class="form-control"
  //                 value="${
  //                   selectedMatieres.find(
  //                     (selectedMatiere) => selectedMatiere._id === matiere._id
  //                   )?.dateDebut || ""
  //                 }"
  //               />
  //               <label for="dateFin-${matiere._id}">Date fin:</label>
  //               <input
  //                 type="date"
  //                 id="dateFin-${matiere._id}"
  //                 class="form-control"
  //                 value="${
  //                   selectedMatieres.find(
  //                     (selectedMatiere) => selectedMatiere._id === matiere._id
  //                   )?.dateFin || ""
  //                 }"
  //               />
  //             </div>
  //           </li>`
  //           )
  //           .join("")}` +
  //         `</ul>`,
  //       focusConfirm: false,
  //       preConfirm: () => {
  //         const selectedEtudiants = fetchedEtudiants
  //           .filter(
  //             (etudiant) =>
  //               document.getElementById(`etudiant-${etudiant._id}`).checked
  //           )
  //           .map((etudiant) => etudiant._id);
  //         const selectedEnseignants = fetchedEnseignants
  //           .filter(
  //             (enseignant) =>
  //               document.getElementById(`enseignant-${enseignant._id}`).checked
  //           )
  //           .map((enseignant) => enseignant._id);
  //         const selectedMatieres = fetchedMatieres
  //           .filter(
  //             (matiere) =>
  //               document.getElementById(`matiere-${matiere._id}`).checked
  //           )
  //           .map((matiere) => {
  //             return {
  //               nomMatiere: matiere._id,
  //               dateDebut: document.getElementById(`dateDebut-${matiere._id}`)
  //                 .value,
  //               dateFin: document.getElementById(`dateFin-${matiere._id}`)
  //                 .value,
  //             };
  //           });
  //         return { selectedEtudiants, selectedEnseignants, selectedMatieres };
  //       },
  //     });

  //     if (formValues) {
  //       try {
  //         const token = localStorage.getItem("token");

  //         const response = await axios.patch(
  //           `http://localhost:5000/classe/${classeId}`,
  //           {
  //             nom: document.getElementById("nomClasse").value,
  //             niveau: document.getElementById("niveau").value,
  //             etudiants: formValues.selectedEtudiants,
  //             enseignants: formValues.selectedEnseignants,
  //             matieres: formValues.selectedMatieres,
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );

  //         // Vérifier si la mise à jour a réussi
  //         if (response.status === 200) {
  //           Swal.fire(
  //             "Succès",
  //             "La classe a été mise à jour avec succès",
  //             "success"
  //           );
  //           fetchData();
  //         } else {
  //           Swal.fire(
  //             "Erreur",
  //             "La mise à jour de la classe a échoué",
  //             "error"
  //           );
  //         }
  //       } catch (error) {
  //         console.error("Erreur lors de la mise à jour de la classe :", error);
  //         Swal.fire(
  //           "Erreur",
  //           "Une erreur est survenue lors de la mise à jour de la classe",
  //           "error"
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching class data:", error);
  //   }
  // };

  const handleEditWithSwal = async (classeId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/classe/${classeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const classeData = response.data.model;

      const { nom, niveau, etudiants, matieres } = classeData;

      const fetchedEtudiants = await fetchEtudiants();
      const fetchedEnseignants = await fetchEnseignants();
      const fetchedMatieres = await fetchMatieres();

      const selectedEtudiants = etudiants.map((etudiant) => etudiant._id);

      const swalContent = document.createElement("div");

      const nomClasseInput = document.createElement("input");
      nomClasseInput.setAttribute("type", "text");
      nomClasseInput.setAttribute("id", "nomClasse");
      nomClasseInput.setAttribute("class", "form-control");
      nomClasseInput.setAttribute("value", nom);
      nomClasseInput.setAttribute("required", true);
      swalContent.appendChild(nomClasseInput);

      const niveauInput = document.createElement("input");
      niveauInput.setAttribute("type", "text");
      niveauInput.setAttribute("id", "niveau");
      niveauInput.setAttribute("class", "form-control");
      niveauInput.setAttribute("value", niveau);
      niveauInput.setAttribute("required", true);
      swalContent.appendChild(niveauInput);

      const etudiantsList = document.createElement("ul");
      etudiantsList.setAttribute("class", "list-group");
      etudiantsList.setAttribute(
        "style",
        "max-height: 200px; overflow-y: scroll;"
      );
      fetchedEtudiants.forEach((etudiant) => {
        const listItem = document.createElement("li");
        listItem.setAttribute(
          "class",
          "list-group-item d-flex justify-content-between align-items-center"
        );
        listItem.innerHTML = `${etudiant.nom} ${etudiant.prenom}`;
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", `etudiant-${etudiant._id}`);
        if (selectedEtudiants.includes(etudiant._id)) {
          checkbox.setAttribute("checked", true);
        }
        listItem.appendChild(checkbox);
        etudiantsList.appendChild(listItem);
      });
      swalContent.appendChild(etudiantsList);

      const matieresList = document.createElement("ul");
      matieresList.setAttribute("class", "list-group");
      matieresList.setAttribute(
        "style",
        "max-height: 200px; overflow-y: scroll;"
      );
      fetchedMatieres.forEach((matiere) => {
        const listItem = document.createElement("li");
        listItem.setAttribute(
          "class",
          "list-group-item d-flex justify-content-between align-items-center"
        );
        const matiereLabel = document.createElement("span");
        matiereLabel.innerText = matiere.nom;
        listItem.appendChild(matiereLabel);
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", `matiere-${matiere._id}`);
        if (
          matieres.find(
            (selectedMatiere) => selectedMatiere.nomMatiere._id === matiere._id
          )
        ) {
          checkbox.setAttribute("checked", true);
        }
        listItem.appendChild(checkbox);

        // Création d'une div pour regrouper les champs dateDebut, dateFin et enseignant
        const rightDiv = document.createElement("div");
        rightDiv.setAttribute("class", "d-flex flex-column");

        // Champ pour la date de début
        const dateDebutInput = document.createElement("input");
        dateDebutInput.setAttribute("type", "date");
        dateDebutInput.setAttribute("id", `dateDebut-${matiere._id}`);
        dateDebutInput.setAttribute("class", "form-control");
        const matiereData = matieres.find(
          (selectedMatiere) => selectedMatiere.nomMatiere._id === matiere._id
        );
        dateDebutInput.setAttribute(
          "value",
          matiereData ? matiereData.dateDebut.substring(0, 10) : ""
        );
        rightDiv.appendChild(dateDebutInput);

        // Champ pour la date de fin
        const dateFinInput = document.createElement("input");
        dateFinInput.setAttribute("type", "date");
        dateFinInput.setAttribute("id", `dateFin-${matiere._id}`);
        dateFinInput.setAttribute("class", "form-control");
        dateFinInput.setAttribute(
          "value",
          matiereData ? matiereData.dateFin.substring(0, 10) : ""
        );
        rightDiv.appendChild(dateFinInput);

        // Liste déroulante pour choisir l'enseignant
        const enseignantSelect = document.createElement("select");
        enseignantSelect.setAttribute("id", `enseignant-${matiere._id}`);
        enseignantSelect.setAttribute("class", "form-control");
        fetchedEnseignants.forEach((enseignant) => {
          const option = document.createElement("option");
          option.setAttribute("value", enseignant._id);
          option.innerText = `${enseignant.nom} ${enseignant.prenom}`;
          if (
            matiereData &&
            matiereData.enseignant &&
            enseignant._id === matiereData.enseignant._id
          ) {
            option.setAttribute("selected", true);
          }
          enseignantSelect.appendChild(option);
        });
        rightDiv.appendChild(enseignantSelect);

        // Ajout de la div des champs à droite dans le listItem
        listItem.appendChild(rightDiv);

        matieresList.appendChild(listItem);
      });
      swalContent.appendChild(matieresList);

      const { value: formValues } = await Swal.fire({
        title: "Modifier la classe",
        html: swalContent,
        focusConfirm: false,
        preConfirm: () => {
          const selectedEtudiants = fetchedEtudiants
            .filter(
              (etudiant) =>
                document.getElementById(`etudiant-${etudiant._id}`).checked
            )
            .map((etudiant) => etudiant._id);

          return { selectedEtudiants };
        },
      });

      if (formValues) {
        try {
          const token = localStorage.getItem("token");

          const selectedMatieres = fetchedMatieres
            .filter(
              (matiere) =>
                document.getElementById(`matiere-${matiere._id}`).checked
            )
            .map((matiere) => {
              return {
                nomMatiere: matiere._id,
                dateDebut: document.getElementById(`dateDebut-${matiere._id}`)
                  .value,
                dateFin: document.getElementById(`dateFin-${matiere._id}`)
                  .value,
                enseignant: document.getElementById(`enseignant-${matiere._id}`)
                  .value,
              };
            });

          const response = await axios.patch(
            `http://localhost:5000/classe/${classeId}`,
            {
              nom: nomClasseInput.value,
              niveau: niveauInput.value,
              etudiants: formValues.selectedEtudiants,
              matieres: selectedMatieres,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            Swal.fire(
              "Succès",
              "La classe a été mise à jour avec succès",
              "success"
            );
            fetchData();
          } else {
            Swal.fire(
              "Erreur",
              "La mise à jour de la classe a échoué",
              "error"
            );
          }
        } catch (error) {
          console.error("Erreur lors de la mise à jour de la classe :", error);
          Swal.fire(
            "Erreur",
            "Une erreur est survenue lors de la mise à jour de la classe",
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  const handleAddNewClasse = () => {
    navigate(`/dashAdmin/ClasseAjout`);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3
          className="demo menu-text fw-bolder ms-2"
          style={{ textAlign: "center" }}
        >
          Liste Des Classes
        </h3>

        <button className="btn btn-primary" onClick={handleAddNewClasse}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Ajouter classe
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
      <br></br>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
          fontSize: "16px",
          color: "#333",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#000", color: "white" }}>
            <th
              style={{
                padding: "15px 20px",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Nom
            </th>
            <th
              style={{
                padding: "15px 20px",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Niveau
            </th>
            <th
              style={{
                padding: "15px 20px",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Étudiants
            </th>
            <th
              style={{
                padding: "15px 20px",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Enseignants
            </th>
            <th
              style={{
                padding: "15px 20px",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Matières
            </th>
            <th
              style={{
                padding: "15px 20px",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {(data.length > 0
            ? data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
            : []
          ).map((classe) => (
            <tr
              key={classe._id}
              style={{
                backgroundColor: "#fff",
                transition: "background-color 0.3s",
                borderBottom: "1px solid #ddd",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f7f7f7")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#fff")
              }
            >
              <td style={{ padding: "15px 20px" }}>{classe.nom}</td>
              <td style={{ padding: "15px 20px" }}>{classe.niveau}</td>
              <td style={{ padding: "15px 20px" }}>
                <select
                  style={{
                    padding: "10px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    outline: "none",
                    width: "100%",
                  }}
                >
                  {classe.etudiants &&
                    classe.etudiants.map((etudiant) => (
                      <option key={etudiant._id} value={etudiant._id}>
                        {etudiant.nom} {etudiant.prenom}
                      </option>
                    ))}
                </select>
              </td>
              <td style={{ padding: "15px 20px" }}>
                <select
                  style={{
                    padding: "10px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    outline: "none",
                    width: "100%",
                  }}
                >
                  {classe.matieres &&
                    classe.matieres.map((matiere) => (
                      <option
                        key={matiere.enseignant?._id}
                        value={matiere.enseignant?._id}
                      >
                        {"["}
                        {matiere.nomMatiere?.code}
                        {"]"} {matiere.enseignant?.nom}{" "}
                        {matiere.enseignant?.prenom}
                      </option>
                    ))}
                </select>
              </td>
              <td style={{ padding: "15px 20px" }}>
                <select
                  style={{
                    padding: "10px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    outline: "none",
                    width: "100%",
                  }}
                >
                  {classe.matieres &&
                    classe.matieres.map((matiere) => (
                      <option key={matiere._id} value={matiere._id}>
                        {"["}
                        {matiere.nomMatiere.code}
                        {"]"} {matiere.nomMatiere.nom} de{" "}
                        {new Date(matiere.dateDebut)
                          .toISOString()
                          .substring(0, 10)}{" "}
                        à{" "}
                        {new Date(matiere.dateFin)
                          .toISOString()
                          .substring(0, 10)}
                      </option>
                    ))}
                </select>
              </td>
              <td style={{ padding: "15px 20px", textAlign: "right" }}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    className="btn btn-sm"
                    style={{
                      marginRight: "10px",
                      padding: "10px 15px",
                      border: "1px solid red",
                      borderRadius: "6px",
                      backgroundColor: "white",
                      color: "red",
                      cursor: "pointer",
                      transition: "background-color 0.3s, color 0.3s",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => handleDeleteWithSwal(classe._id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "red";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "white";
                      e.currentTarget.style.color = "red";
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      style={{ marginRight: "5px" }}
                    />
                    Supprimer
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{
                      padding: "10px 15px",
                      border: "1px solid green",
                      borderRadius: "6px",
                      backgroundColor: "white",
                      color: "green",
                      cursor: "pointer",
                      transition: "background-color 0.3s, color 0.3s",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => handleEditWithSwal(classe._id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "green";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "white";
                      e.currentTarget.style.color = "green";
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{ marginRight: "5px" }}
                    />
                    Modifier
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

export default ClasseList;
