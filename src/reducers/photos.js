import * as actionTypes from '../constants/actions';
import { loadingStates } from "../constants/states";

const initialState = {
  items: [],
  loadingStatus: loadingStates.LOADING,
  error: null
};

const setLoadingState = (state, action) => {
  return {
        ...state,
        loadingStatus: loadingStates.LOADING
      }
}

const loadPhotos = (state, action) => {
  return {
        ...state,
        loadingStatus: loadingStates.LOADED,
        items: action.payload.photos
      }
}

const setErrorState = (state, action) => {
  return {
        ...state,
        loadingStatus: loadingStates.ERROR,
        error: action.payload.error,
        items: []
      }
}

const toggleSelection = (state, action) => {
  return {
        ...state,
        items: state.items.map(item =>
        (item.id === action.id)
          ? {...item, selected: !item.selected}
          : item
      )}
}

const toggleSelectionAll = (state, action) => {
  return {
        ...state,
        items: state.items.map(item => ({...item,selected: action.isSelected}))
      }
}

const setSharePhotoPending = (state, action) => {
  return {
        ...state,
        items: state.items.map(item =>
        (item.id === action.payload.id)
          ? {...item, website: action.payload.website}
          : item
      )}
}

const setSharePhotoError = (state, action) => {
  return {
        ...state,
        error: action.payload.error,
        items: state.items.map(item =>
        (item.id === action.payload.id)
          ? {...item, website: action.payload.website}
          : item
      )}
}

const setSharePhotoDone = (state, action) => {
  const data = JSON.parse(action.payload.data);
  return {
    ...state,
    items: state.items.map(item =>
    (item.id === data.photo.id)
      ? {...item, website: data.event}
      : item
  )};
}

export default function photos(state = initialState, action) {
  switch(action.type) {
    case actionTypes.FETCH_PHOTOS_BEGIN:
      return setLoadingState(state, action)

    case actionTypes.FETCH_PHOTOS_SUCCESS:
      return loadPhotos(state, action);

    case actionTypes.FETCH_PHOTOS_FAILURE:
      return setErrorState(state, action);

    case actionTypes.TOGGLE_SELECTION:
      return toggleSelection(state, action);

    case actionTypes.TOGGLE_SELECT_ALL:
      return toggleSelectionAll(state, action);

    case actionTypes.SHARE_PHOTO_UPDATE:
      return setSharePhotoPending(state, action);

    case actionTypes.SHARE_PHOTO_FAILURE:
      return setSharePhotoError(state, action);

    case actionTypes.WEBSOCKET_MESSAGE:
      return setSharePhotoDone(state, action);

    default:
      return state;
  }
}
