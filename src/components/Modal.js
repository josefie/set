import React, {Component} from 'react';

import '../styles/components/Modal.css';

class Modal extends Component {
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
    let body = document.querySelector('body');

    body.addEventListener('click', (event) => {
      if (event.target.id !== this.props.id && !event.target.closest('#' + this.props.id)) {
        this.closeModal();
      }
    });

    body.addEventListener('keyup', (event) => {
      let keyCode = event.keyCode || event.which;

      if (keyCode === 27) {
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

    // this.button.focus();
    
    this.setState({
      isOpen: false
    });
  }

  openModal() {

    // this.modal.focus();

    this.setState({
      isOpen: true
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
        <div className="modal__mask"></div>
      </div>
    );
  }
}

export default Modal;