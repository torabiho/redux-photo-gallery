import React from "react";
import { Icon } from './Icon';
import "./Checkmark.scss";

export const Checkmark = ({ selected, hovered }) => {  
  return (
    <div className={selected || hovered ? "checkmark" : "hidden"}>
      <svg
        className={`checkmark__icon ${hovered && !selected ? "checkmark__icon--hover": ""}`}
        width="24px"
        height="24px"
      >
        <circle cx="12.5" cy="12.2" r="8.292" />
      </svg>
      <Icon name="check" viewBox="0 0 24 24" className={`checkmark__circle ${hovered && !selected ? "checkmark__circle--hover": ""}`} />
    </div>
)};