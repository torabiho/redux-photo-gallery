import * as actionTypes from "../constants/actions";

export const fetchPhotosBegin = () => ({
	type: actionTypes.FETCH_PHOTOS_BEGIN,
});

export const fetchPhotosSuccess = (photos) => ({
	type: actionTypes.FETCH_PHOTOS_SUCCESS,
	payload: { photos },
});

export const fetchPhotosFailure = (error) => ({
	type: actionTypes.FETCH_PHOTOS_FAILURE,
	payload: { error },
});

export const sharePhotoUpdate = (id, website) => ({
	type: actionTypes.SHARE_PHOTO_UPDATE,
	payload: { id, website },
});

export const sharePhotoFailure = (id, error) => ({
	type: actionTypes.SHARE_PHOTO_FAILURE,
	payload: { id, website: null, error },
});

export const toggleSelection = (id) => ({
	type: actionTypes.TOGGLE_SELECTION,
	id,
});

export const toggleSelectAll = (isSelected) => ({
	type: actionTypes.TOGGLE_SELECT_ALL,
	isSelected,
});

export const connectWS = (url) => ({
	type: actionTypes.WEBSOCKET_CONNECT,
	payload: { url },
});

export function fetchPhotos() {
	return (dispatch) => {
		dispatch(fetchPhotosBegin());
		dispatch(connectWS(`${process.env.REACT_APP_WS_URL}/ws`));
		return fetch(`${process.env.REACT_APP_API_URL}/`)
			.then(handleErrors)
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				dispatch(fetchPhotosSuccess(json.photos));
				return json.photos;
			})
			.catch((error) => dispatch(fetchPhotosFailure(error)));
	};
}

function handleErrors(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

export function shareSelectedPhotos(selectedUnsharedPhotos) {
	return (dispatch) => {
		Promise.all(
			selectedUnsharedPhotos.map(async (photo) => {
				dispatch(
					sharePhotoUpdate(photo.id, actionTypes.PENDING_APPROVAL)
				);
				return fetch(
					`${process.env.REACT_APP_API_URL}/website/photos/${photo.id}`,
					{
						method: "POST",
					}
				)
					.then(handleErrors)
					.then((res) => {
						return res.json();
					})
					.then((json) => {
						dispatch(
							sharePhotoUpdate(photo.id, json.photo.website)
						);
						dispatch(toggleSelectAll(false));
						return json.photos;
					})
					.catch((error) => {
						dispatch(sharePhotoFailure(photo.id, error));
					});
			})
		)
			.then((data) => {
				console.log("end of promise all", data);
			})
			.catch((err) => {
				console.log("catch promise all", err);
			});
	};
}
