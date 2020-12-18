import { connect } from 'react-redux';
import Footer from '../components/Footer';
import { shareSelectedPhotos, toggleSelectAll } from "../actions/photos";
import { getSelectedPhotos, getSelectedUnsharedPhotos } from "../reducers/photos";


const mapStateToProps = state => ({
  selectedPhotos: getSelectedPhotos(state.photos.items),
  selectedUnsharedPhotos: getSelectedUnsharedPhotos(state.photos.items)
})

const mapDispatchToProps = dispatch => ({
  shareSelectedPhotos: photos => dispatch(shareSelectedPhotos(photos)),
  switchSelectAll: isSelected => dispatch(toggleSelectAll(isSelected))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)