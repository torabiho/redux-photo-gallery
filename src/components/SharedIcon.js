import React from "react";
import { Icon } from './Icon';
import "./SharedIcon.scss";
import { PENDING_APPROVAL, WEBSITE_APPROVED } from "../constants/actions";

export const SharedIcon = ({ sharingStatus }) => {  
  return (
  <>
    {sharingStatus === WEBSITE_APPROVED && 
      <Icon name="share" className="share-icon" />
    }
    {sharingStatus === PENDING_APPROVAL &&
    <div className="pending-icon">
      <svg className="loader__icon"viewBox="25 25 50 50" >
        <circle className="loader__path" cx="50" cy="50" r="20" strokeWidth="2" />
      </svg>
    </div>
    }
    </>
)};