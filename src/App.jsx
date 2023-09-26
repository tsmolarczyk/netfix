import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import {
  Actors,
  MovieInformation,
  Movies,
  NavBar,
  Profile
} from "./components/index";

function App() {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <NavBar />
      <main style={{ flexGrow: "1", padding: "2em" }}>
        <div style={{ height: "70px" }} />
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
