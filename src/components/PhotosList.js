import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import Gallery from "react-photo-gallery";
import { connectWS, fetchPhotos, toggleSelection, toggleSelectAll } from "../actions/photos";
import { areAllPhotosSelected, getPhotosMetaData, getSelectedPhotos } from "../selectors";
import { loadingStates } from "../constants/states";
import Photo from "./Photo";
import './App.scss';

const PhotosList = props => {
  const { connectToWS, loadingStatus, photos, getPhotos, togglePhotoSelection, switchSelectAll, allSelected, selectedPhotos } = props;
  const onInit = () => { 
//     connectToWS();
// 	  getPhotos();
  }
  const toggleSelectAllPhotos = () => {
    switchSelectAll(!allSelected);
  };

  useEffect(onInit, []);

  const imageRenderer = useCallback(
    ({ index, photo }) => (
      <Photo
        onClick={() => 
          togglePhotoSelection(photo.id)
        }
        key={photo.id}
        index={index}
        photo={photo}
        selectionMode={selectedPhotos.length > 0}
      />
    ),
    [togglePhotoSelection, selectedPhotos]
  );

  if (loadingStatus === loadingStates.LOADING) {
    return <div className="placeHolder"><h2>Loading...</h2></div>;
  } else if (loadingStatus === loadingStates.ERROR) {
    return <div className="placeHolder"><h2>Photos Cannot be loaded please try again later</h2></div>;
  }

  return (
    <>
      <div className="toggle-select" onClick={toggleSelectAllPhotos}>{allSelected ? "Deselect All" : "Select All"}</div>
      <Gallery photos={getPhotosMetaData(photos)} renderImage={imageRenderer} />
    </>
  );
}

const mapStateToProps = state => ({
  photos: state.photos.items,
  loadingStatus: state.photos.loadingStatus,
  error: state.photos.error,
  selectedPhotos: getSelectedPhotos(state.photos.items),
  allSelected: areAllPhotosSelected(state.photos.items)
});

const mapDispatchToProps = dispatch => ({
  getPhotos: () => dispatch(fetchPhotos()),
  connectToWS: url => dispatch(connectWS(url)),
  togglePhotoSelection: id => dispatch(toggleSelection(id)),
  switchSelectAll: isSelected => dispatch(toggleSelectAll(isSelected))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotosList);
