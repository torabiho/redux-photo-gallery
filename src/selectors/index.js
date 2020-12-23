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
