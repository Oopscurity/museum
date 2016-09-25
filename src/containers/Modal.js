import { connect } from 'react-redux';

import { createSelector } from '../selectors';
import { closeModal } from '../actions';
import Modal from '../components/Modal';

const inputSelector = createSelector(
  state => state.get('ui'),
  ui => ({ visible: ui.get('isModalVisible') })
);

const outputSelector = (dispatch) => ({
  onHide: () => dispatch(closeModal())
});

export default connect(inputSelector, outputSelector)(Modal);
