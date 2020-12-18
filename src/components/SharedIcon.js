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
      <Icon name="pending" className="pending-icon" width="120px" height="120px"/>
    }
    </>
)};