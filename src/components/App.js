import React from "react";
import SelectedPhotos from "../containers/SelectedPhotos";
import PhotosList from "./PhotosList";
import { Header } from "./Header";
import "./App.scss";

const App = () => (
  <div className="main-wrapper">
    <Header />
    <PhotosList />
    <SelectedPhotos />
  </div>
)

export default App