import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';

const CollectedSetsModal = function({isOpen, onClose, collectedSets}) {
  return (
    <Modal id="collected-sets" title="Collected Sets" isOpen={isOpen} onClose={onClose}>
      {collectedSets.map(function(set, key) {
        return (
          <ul className="flex-list" key={key}>
            {set.map(function(card, key) {
              return (
                <li key={key}>{card}</li>
              );
            })}
          </ul>
        );
      })}
    </Modal>
  );
}

CollectedSetsModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  collectedSets: PropTypes.array
}

export default CollectedSetsModal;