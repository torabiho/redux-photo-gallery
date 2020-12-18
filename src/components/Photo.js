import React, { useState } from "react";
import { Checkmark } from "./Checkmark";
import { SharedIcon } from "./SharedIcon";
import { PENDING_APPROVAL } from "../constants/actions";
import "./Photo.scss";

const selectedImgStyle = {
  transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};

const SelectedImage = ({
  photo,
  onClick,
  selectionMode
}) => {
  const [isHovered, setIsHovered] = useState(false);
  //calculate x,y scale
  const sx = (100 - (30 / photo.width) * 100) / 100;
  const sy = (100 - (30 / photo.height) * 100) / 100;
  selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;

  const imageStyle = photo.selected ? { ...selectedImgStyle } : {};
  const imageOpacity = photo.website === PENDING_APPROVAL ? 0.3 : 1;

  return (
    <div
      style={{ height: photo.height, width: photo.width }}
      className={`image__container ${photo.selected ? "selected" : ""}`}
      onMouseEnter={() => setIsHovered(!photo.selected)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {selectionMode &&  !photo.selected && !isHovered? 
        <div className="selection-placeholder"/> : 
        <Checkmark selected={photo.selected} hovered={isHovered}/>
      }
      <SharedIcon sharingStatus={photo.website}/>
      <img
        alt={photo.title}
        className="image"
        style={{...imageStyle, opacity: imageOpacity}}
        {...photo}
        onClick={onClick}
      />
    </div>
  );
};

export default SelectedImage;
