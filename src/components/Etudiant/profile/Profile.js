import React, { useState, useEffect } from "react";
import axios from "axios";

const Profil = () => {
  const [userData, setUserData] = useState({
    nom: "",
    cin: "",
    prenom: "",
    adresse: "",
    email: "",
    telephone: "",
  });
  const [editable, setEditable] = useState(false);
  const [toast, setToast] = useState(null);

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
    setEditable(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (Object.values(userData).some((value) => value === "")) {
        showToast("Veuillez remplir tous les champs", "error");
        return;
      }

      const response = await axios.patch(
        "http://localhost:5000/user/update",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Data saved successfully!");
      showToast("Data saved successfully!", "success");
      setEditable(false);
    } catch (error) {
      console.error("Error saving data:", error);
      showToast("Failed to save data", "error");
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <div className="card-body">
      {toast && (
        <div className={`bs-toast toast fade show ${toast.type === "success" ? "bg-info" : "bg-danger"}`} role="alert">
          <div className="toast-header">
            <i className="bx bx-bell me-2"></i>
            <div className="me-auto fw-semibold">{toast.type === "success" ? "Success" : "Error"}</div>
            <button type="button" className="btn-close" onClick={() => setToast(null)} aria-label="Close"></button>
          </div>
          <div className="toast-body">{toast.message}</div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label" htmlFor="name">Name</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
              <span className="input-group-text">
                <i className="bx bx-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="name"
                name="nom"
                placeholder="John Doe"
                aria-label="John Doe"
                value={userData.nom}
                onChange={handleChange}
                disabled={!editable}
              />
            </div>
          </div>
        </div>
       <div className="row mb-3">
          <label className="col-sm-2 col-form-label" htmlFor="cin">Cin</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
              <span className="input-group-text">
                <i className="bx bx-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="cin"
                name="cin"
                placeholder="CIN"
                aria-label="CIN"
                value={userData.cin}
                onChange={handleChange}
                disabled={!editable}
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label" htmlFor="prenom">Prenom</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
              <span className="input-group-text">
                <i className="bx bx-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="prenom"
                name="prenom"
                placeholder="Prenom"
                aria-label="Prenom"
                value={userData.prenom}
                onChange={handleChange}
                disabled={!editable}
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label" htmlFor="adresse">Adresse</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
              <span className="input-group-text">
                <i className="bx bx-buildings"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="adresse"
                name="adresse"
                placeholder="Adresse"
                aria-label="Adresse"
                value={userData.adresse}
                onChange={handleChange}
                disabled={!editable}
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label" htmlFor="email">Email</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
              <span className="input-group-text">
                <i className="bx bx-envelope"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="john.doe@example.com"
                aria-label="john.doe@example.com"
                value={userData.email}
                onChange={handleChange}
                disabled={!editable}
              />
            </div>
            <div className="form-text">You can use letters, numbers & periods</div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 form-label" htmlFor="telephone">Télephone</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
              <span className="input-group-text">
                <i className="bx bx-phone"></i>
              </span>
              <input
                type="text"
                className="form-control phone-mask"
                id="telephone"
                name="telephone"
                placeholder="Telephone"
                aria-label="Telephone"
                value={userData.telephone}
                onChange={handleChange}
                disabled={!editable}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-sm-10">
            {editable ? (
              <button type="submit" className="btn btn-primary">Save</button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={handleEdit}>Edit</button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profil;