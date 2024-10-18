import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Profil = () => {
  const [userData, setUserData] = useState({
    adresse: "",
    cin: "",
    datenaiss: "",
    email: "",
    nom: "",
    numero: "",
    prenom: "",
    sexe: "",
    telephone: "",
    role: "",
    universite: "",
  });
  const [editable, setEditable] = useState(false); // État pour gérer l'édition

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/user/profil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data.profil);
      console.log(response.data.profil);
    } catch (err) {
      console.log(err.response);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setEditable(true); // Activer l'édition
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        "http://localhost:5000/user/modif",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle success
      console.log("Data saved successfully!");
      Swal.fire("Success", "profil updated successfully!", "success");
      fetchData();
      setEditable(false); // Désactiver l'édition après avoir enregistré
    } catch (error) {
      // Handle error
      console.error("Error saving data:", error);
      Swal.fire("Error", "Failed to save data", "error");
    }
  };

  return (
    <div>
      <label className="app-brand-text demo menu-text fw-bolder ms-2">
        PROFIL ENSEIGNANT{" "}
      </label>
      <form>
        {editable ? (
          <button
            type="button"
            onClick={handleSubmit}
            className="btn badge bg-label-success"
            style={{
              marginLeft: "80%",
              marginBottom: "3%",
              marginTop: "2%",
              fontSize: "100%",
            }}
          >
            <i className="bx bx-check" style={{ fontSize: "190%" }}></i>{" "}
            Enregistrer
          </button>
        ) : (
          <button
            type="button"
            onClick={handleEdit}
            className="btn badge bg-label-primary"
            style={{
              marginLeft: "80%",
              marginBottom: "3%",
              marginTop: "2%",
              fontSize: "100%",
            }}
          >
            <i className="bx bx-edit" style={{ fontSize: "160%" }}></i> Modifier
          </button>
        )}
        <br />
        <div className="row" style={{ marginLeft: "5%" }}>
          <div className="col-md-5">
            <label htmlFor="numero" className="demo menu-text fw-bolder ms-2">
              Numero
            </label>
            <input
              type="text"
              id="numero"
              name="numero"
              value={userData.numero}
              onChange={handleChange}
              className="form-control"
              disabled={!editable}
            />
          </div>
          <div className="col-md-5">
            <label htmlFor="nom" className="demo menu-text fw-bolder ms-2">
              Nom
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={userData.nom}
              onChange={handleChange}
              className="form-control"
              disabled={!editable}
            />
          </div>
        </div>
        <div className="row" style={{ marginLeft: "5%" }}>
          <div className="col-md-5">
            <label htmlFor="prenom" className="demo menu-text fw-bolder ms-2">
              Prénom
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={userData.prenom}
              onChange={handleChange}
              className="form-control"
              disabled={!editable}
            />
          </div>
          <div className="col-md-5">
            <label htmlFor="cin" className="demo menu-text fw-bolder ms-2">
              CIN
            </label>
            <input
              type="text"
              id="cin"
              name="cin"
              value={userData.cin}
              onChange={handleChange}
              className="form-control"
              disabled={!editable}
            />
          </div>
        </div>
        <div className="row" style={{ marginLeft: "5%" }}>
          <div className="col-md-5">
            <label
              htmlFor="datenaiss"
              className="demo menu-text fw-bolder ms-2"
            >
              Date de naissance
            </label>
            <input
              type="date"
              id="datenaiss"
              name="datenaiss"
              value={userData.datenaiss}
              onChange={handleChange}
              className="form-control"
              disabled={!editable}
            />
          </div>
          <div className="col-md-5">
            <label htmlFor="sexe" className="demo menu-text fw-bolder ms-2">
              Sexe
            </label>
            <input
              type="text"
              id="sexe"
              name="sexe"
              value={userData.sexe}
              onChange={handleChange}
              className="form-control"
              disabled={!editable}
            />
          </div>
        </div>
        <div className="row" style={{ marginLeft: "5%" }}>
          <div className="col-md-5">
            <label
              htmlFor="telephone"
              className="demo menu-text fw-bolder ms-2"
            >
              Téléphone
            </label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              value={userData.telephone}
              onChange={handleChange}
              className="form-control"
              disabled={!editable}
            />
          </div>
          <div className="col-md-5">
            <label htmlFor="email" className="demo menu-text fw-bolder ms-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="form-control"
              disabled={!editable}
            />
          </div>
        </div>
        <div className="row" style={{ marginLeft: "5%" }}>
          <div className="col-md-5">
            <label
              htmlFor="universite"
              className="demo menu-text fw-bolder ms-2"
            >
              Université
            </label>
            <input
              type="text"
              id="universite"
              name="universite"
              value={userData.universite}
              onChange={handleChange}
              className="form-control"
              disabled={!editable}
            />
          </div>
          <div className="col-md-5">
            <label htmlFor="adresse" className="demo menu-text fw-bolder ms-2">
              Adresse
            </label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              value={userData.adresse}
              onChange={handleChange}
              className="form-control"
              disabled={!editable}
            />
          </div>
        </div>
      </form>
      <br />
    </div>
  );
};

export default Profil;
