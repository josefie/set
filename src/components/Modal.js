import React, {Component} from 'react';

import '../styles/components/Modal.css';

const ELEMENTS_FOCUSABLE = [
  'a[href]:not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  'input:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])'
];

const KEYCODE = {
  ESC: 27,
  TAB: 9
};

class Modal extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.previouslyFocusedElement = null;
  }

  componentDidMount() {
    let body = document.querySelector('body');

    document.querySelector('#modal-mask').addEventListener('click', (event) => {
      this.closeModal();
    });

    body.addEventListener('keyup', (event) => {
      let keyCode = event.keyCode || event.which;

      if (keyCode === KEYCODE.ESC) {
        this.closeModal();
      }
    });
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

    this.previouslyFocusedElement.focus();
  }

  openModal() {
    this.previouslyFocusedElement = document.activeElement;
    this.modal.focus();
    this.trapFocus();

    this.setState({
      isOpen: true
    });
  }

  trapFocus() {
    const focusableElementsInModal = this.modal.querySelectorAll(ELEMENTS_FOCUSABLE);
    const lastElement = focusableElementsInModal[focusableElementsInModal.length - 1];
    const firstElement = focusableElementsInModal[0];

    document.addEventListener('keypress', function(event) {
      let keyCode = event.keyCode || event.which;
      let tabForwards = keyCode === KEYCODE.TAB && !event.shiftKey;
      let tabBackwards = keyCode === KEYCODE.TAB && event.shiftKey;
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
      <div>
        <button className="button" aria-expanded={this.state.isOpen} onClick={this.openModal} ref={(button) => { this.button = button; }}>View instructions</button>
        <div id={this.props.id} role="dialog" className="modal" aria-labelledby={this.props.id + '-title'} aria-describedby={this.props.id + '-content'} tabIndex="-1" ref={(modal) => { this.modal = modal; }}>
          <div className="modal__body">
            <h2 id={this.props.id + '-title'}>{this.props.title}</h2>
            <div id={this.props.id + '-content'}>
              {this.props.children}
            </div>
          </div>
          <div className="modal__footer">
            <button onClick={this.closeModal} className="button modal__close-button">Close</button>
          </div>
        </div>
        <div id="modal-mask" className="modal-mask"></div>
      </div>
    );
  }
}

export default Modal;