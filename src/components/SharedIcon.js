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
      <svg class="loader__icon"viewBox="25 25 50 50" >
        <circle class="loader__path" cx="50" cy="50" r="20" stroke-width="2" />
      </svg>
    </div>
    }
    </>
)};