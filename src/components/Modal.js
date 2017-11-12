import React from 'react';
import PropTypes from 'prop-types';

import KEYCODES from '../helper/KeyCodes.js';
import ELEMENTS_FOCUSABLE from '../helper/ElementsFocusable.js';

import '../styles/components/Modal.css';

class Modal extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  componentDidMount() {
    this.previouslyFocusedElement = document.activeElement;
    this.addCloseEvents();
  }

  toggleModal() {
    if (this.state.isOpen) {
      this.closeModal();
    } else {
      this.openModal();
    }
  }

  closeModal() {
    this.setState({
      isOpen: false
    });

    this.props.buttonRef.setAttribute('aria-expanded', 'false');
    this.previouslyFocusedElement.focus();
  }

  openModal() {
    this.previouslyFocusedElement = document.activeElement;
    this.modal.focus();

    this.trapFocus();

    this.setState({
      isOpen: true
    });

    this.props.buttonRef.setAttribute('aria-expanded', 'true');
  }

  addCloseEvents() {
    this.mask.addEventListener('click', (event) => {
      this.closeModal();
    });

    document.addEventListener('keyup', (event) => {
      let keyCode = event.keyCode || event.which;

      if (keyCode === KEYCODES.ESC) {
        this.closeModal();
      }
    });
  }

  trapFocus() {
    const focusableElementsInModal = this.modal.querySelectorAll(ELEMENTS_FOCUSABLE);
    const lastElement = focusableElementsInModal[focusableElementsInModal.length - 1];
    const firstElement = focusableElementsInModal[0];

    document.addEventListener('keypress', function(event) {
      let keyCode = event.keyCode || event.which;
      let tabForwards = keyCode === KEYCODES.TAB && !event.shiftKey;
      let tabBackwards = keyCode === KEYCODES.TAB && event.shiftKey;
      let activeElement = document.activeElement;

      if (tabForwards && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      } else if (tabBackwards && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    });
  }

  render() {
    return (
      <div className="modal" aria-hidden={!this.state.isOpen}>
        <div id={this.props.id} role="dialog" className="modal__body" aria-labelledby={this.props.id + '-title'} aria-describedby={this.props.id + '-content'} tabIndex="-1" ref={(modal) => { this.modal = modal; }}>
          <div className="modal__content">
            <h2 id={this.props.id + '-title'}>{this.props.title}</h2>
            <div id={this.props.id + '-content'}>
              {this.props.children}
            </div>
          </div>
          <div className="modal__footer">
            <button onClick={this.closeModal} className="button modal__close-button">Close</button>
          </div>
        </div>
        <div className="modal__mask" ref={(mask) => { this.mask = mask; }}></div>
      </div>
    );
  }
}

Modal.propTypes = {
  id: PropTypes.string,
  buttonRef: PropTypes.object
};

export default Modal;