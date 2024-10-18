import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/Errorpage";
import LogPage from "./pages/logPage";
import Forgotpage from "./pages/ForgotPass";
import DashAdmin from "./pages/Dashboard/Admin/dashAdmin";
import UploadPageAdmin from "./pages/Dashboard/Admin/uploadPage";
import EnseignantsPageAdmin from "./pages/Dashboard/Admin/EnseignantsPageAdmin";
import EtudiantsPageAdmin from "./pages/Dashboard/Admin/EtudiantsPageAdmin";

import DashEtudiant from "./pages/Dashboard/Etudiant/dashEtudiant";
import NotifPage from "./pages/Dashboard/Etudiant/notifPage";
import ListMatEtud from "./pages/Dashboard/Etudiant/listMatEtud";
import ProfilEtudiant from "./pages/Dashboard/Etudiant/ProfilEtudiant";

import DashEnseignant from "./pages/Dashboard/Enseignant/DashEnseignant";
import ProfilEnseignant from "./pages/Dashboard/Enseignant/ProfilEnseignant";
import EtudiantLenseignant from "./pages/Dashboard/Enseignant/EtudiantLenseignant";
import EtudiantEnseignant from "./pages/Dashboard/Enseignant/EtudiantEnseignant";
import EtudiantNenseignant from "./pages/Dashboard/Enseignant/EtudiantNenseignant";
import DepartementPageAdmin from "./pages/Dashboard/Admin/DepartementPageAdmin";
import DepartementAjout from "./components/Admin/Departement/DepartementAjout";
import DepartAjoutAdmin from "./pages/Dashboard/Admin/DepartAjoutAdmin";
import ClasseListPageAdmin from "./pages/Dashboard/Admin/ClasseListPageAdmin";
import ClasseAjoutAdmin from "./pages/Dashboard/Admin/ClasseAjoutAdmin";
import MatiereListPage from "./pages/Dashboard/Admin/matiereList";
import AddMatPage from "./pages/Dashboard/Admin/AddMatPage";
import ListEnsg from "./pages/Dashboard/Etudiant/listEnsg";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/dashAdmin" element={<DashAdmin />} />
          <Route
            path="/dashAdmin/ListeEnseignants"
            element={<EnseignantsPageAdmin />}
          />
          <Route
            path="/dashAdmin/ListeEtudiants"
            element={<EtudiantsPageAdmin />}
          />
          <Route path="/Upload" element={<UploadPageAdmin />} />

          <Route path="/dashEtudiant" element={<DashEtudiant />} />
          <Route path="/AllNotif" element={<NotifPage />} />
          <Route path="/ListMat" element={<ListMatEtud />} />
          <Route path="/profil" element={<ProfilEtudiant />} />
          <Route path="/listEnsg" element={<ListEnsg />} />
          <Route path="/dashEnseignant" element={<DashEnseignant />} />

          <Route path="/dashEnseignant/profil" element={<ProfilEnseignant />} />
          <Route
            path="/dashEnseignant/etudiant"
            element={<EtudiantLenseignant />}
          />
          <Route
            path="/dashEnseignant/elimineList"
            element={<EtudiantEnseignant />}
          />

          <Route
            path="/dashEnseignant/nomineList"
            element={<EtudiantNenseignant />}
          />
          <Route path="/dashEnseignant/profil" element={<ProfilEnseignant />} />

          <Route path="/forgotPass" element={<Forgotpage />} />

          <Route path="/dashAdmin/Depart" element={<DepartementPageAdmin />} />
          <Route path="/dashAdmin/DepartAjout" element={<DepartAjoutAdmin />} />

          <Route
            path="/dashAdmin/ClasseList"
            element={<ClasseListPageAdmin />}
          />

          <Route path="/dashAdmin/ClasseAjout" element={<ClasseAjoutAdmin />} />
          <Route path="/Matiere" element={<MatiereListPage />} />
          <Route path="/AddMat" element={<AddMatPage />} />

          <Route path="/" element={<LogPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
