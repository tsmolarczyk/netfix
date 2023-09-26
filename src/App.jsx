import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import "./styles.css";
import {
  Actors,
  MovieInformation,
  Movies,
  NavBar,
  Profile
} from "./components/index";

function App() {
  return (
    <div className="root">
      <CssBaseline />
      <NavBar />
      <main className="content">
        <div className="toolbar" />
        <Routes>
          <Route path="/movie/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/" element={<Movies />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
