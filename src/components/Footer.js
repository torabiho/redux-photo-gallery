import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from './Icon';
import "./Footer.scss";

const Footer = ({ selectedPhotos, shareSelectedPhotos, selectedUnsharedPhotos, switchSelectAll }) => {
  const [popupVisibility, toggleVisibility] = useState(false);

  useEffect(() => {
    if(selectedUnsharedPhotos.length === 0 && popupVisibility){
      toggleVisibility(false)
    }
  }, [selectedUnsharedPhotos, popupVisibility]);


  const areUnsharedAndSelectedEqual = selectedUnsharedPhotos.length === selectedPhotos.length;
  return <div className="footer">
      <div className="footer__right">
        {selectedUnsharedPhotos.length > 0 && <div onClick={() => toggleVisibility(!popupVisibility)}>
            <Icon name="share" className="footer__share-icon" />
        </div>}

        {popupVisibility &&
          <div className="popup">
              {!areUnsharedAndSelectedEqual && <p>{selectedUnsharedPhotos.length} of {selectedPhotos.length} selected photos are not shared.</p>}
              <p>Share {selectedUnsharedPhotos.length} photos?</p>
              <div className="popup__action-buttons">
                  <div className="popup__action--close" onClick={() =>{ toggleVisibility(false)}}>Cancel</div>
                  <div className="popup__action--send" onClick={() => {shareSelectedPhotos(selectedUnsharedPhotos); toggleVisibility(false)}}>
                  Share
                  </div>
              </div>
          </div>
        }
        <div>
          <Icon name="user" className="footer__share-icon" />
        </div>
      </div>
      {selectedPhotos.length > 0 && <div className="footer__left">
        <Icon name="cancel" className="cancel-icon" width="20px" height="20px" onClick={() => {toggleVisibility(false); switchSelectAll(false)}}/>
        {`${selectedPhotos.length} Selected`}
        </div>}
    </div>
}


Footer.propTypes = {
  selectedPhotos: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  switchSelectAll: PropTypes.func.isRequired
}

export default Footer