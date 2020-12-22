import * as actionTypes from '../constants/actions';
import { loadingStates } from "../constants/states";

const initialState = {
  items: [],
  loadingStatus: loadingStates.LOADING,
  error: null
};

export const areAllPhotosSelected = items => {
  return items.every(item => item.selected);
}

export const getSelectedPhotos = items => {
  return items.filter(item => item.selected);
}

export const getSelectedUnsharedPhotos = items => {
  return items.filter(item => item.selected && item.website === null);
}

export const getPhotosMetaData = items => {
  return items.map((u) => {
    const { url, ...others } = u;
    return {
      src: url,
      height: +u.url.split('&h=')[1].split('&')[0],
      width: +u.url.split('&w=')[1].split('&')[0],
      ...others
    };
  })
} 

export default function photos(state = initialState, action) {
  switch(action.type) {
    case actionTypes.FETCH_PHOTOS_BEGIN:
      return {
        ...state,
        loadingStatus: loadingStates.LOADING
      };

    case actionTypes.FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        loadingStatus: loadingStates.LOADED,
        items: action.payload.photos
      };

    case actionTypes.FETCH_PHOTOS_FAILURE:
      return {
        ...state,
        loadingStatus: loadingStates.ERROR,
        error: action.payload.error,
        items: []
      };

    case actionTypes.TOGGLE_SELECTION:
      return {
        ...state,
        items: state.items.map(item =>
        (item.id === action.id)
          ? {...item, selected: !item.selected}
          : item
      )};

    case actionTypes.TOGGLE_SELECT_ALL:
      return {
        ...state,
        items: state.items.map(item => ({...item,selected: action.isSelected}))
      }

    case actionTypes.SHARE_PHOTO_UPDATE:
      return {
        ...state,
        items: state.items.map(item =>
        (item.id === action.payload.id)
          ? {...item, website: action.payload.website}
          : item
      )};

    case actionTypes.SHARE_PHOTO_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        items: state.items.map(item =>
        (item.id === action.payload.id)
          ? {...item, website: action.payload.website}
          : item
      )};

    case actionTypes.WEBSOCKET_MESSAGE:
      const data = JSON.parse(action.payload.data);
      return {
        ...state,
        items: state.items.map(item =>
        (item.id === data.photo.id)
          ? {...item, website: data.event}
          : item
      )};

    default:
      return state;
  }
}
