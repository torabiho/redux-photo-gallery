import React from "react";
import SelectedPhotos from "../containers/SelectedPhotos";
import PhotosList from "./PhotosList";
import "./App.scss";

const App = () => (
  <div className="main-wrapper">
    <PhotosList />
    <SelectedPhotos />
  </div>
)

export default App