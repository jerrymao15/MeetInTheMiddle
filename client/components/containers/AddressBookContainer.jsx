import React, { Component } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import AddAddress from '../AddAddress.jsx';

class AddressBookContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false
    };
    this.handleAddAddress = this.handleAddAddress.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAddAddress = this.handleAddAddress.bind(this);
  }

  handleAddAddress(e) {
    this.setState({
      isShowingModal: true,
    })
  }

  handleCloseModal(e) {
    this.setState({
      isShowingModal: false,
    });
  }

  handleAddAddress(e) {
    console.log('handle add address');
    this.props.handleAddAddress(e);
    this.setState({
      isShowingModal: false,
    })
  }

  render() {
    return (
      <div>
        <div style={{display: 'inline-block'}}>
          <h4>Address Book</h4>
          <button onClick={this.handleAddAddress}>Add</button>
        </div>
        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleCloseModal}>
            <ModalDialog onClose={this.handleCloseModal}>
              <h1>Add New Address</h1>
              <AddAddress
                handleAddAddress={this.handleAddAddress}
                handleChangeAddName={this.props.handleChangeAddName}
                handleChangeAddStreet={this.props.handleChangeAddStreet}
                handleChangeAddCity={this.props.handleChangeAddCity}
                handleChangeAddState={this.props.handleChangeAddState} />
            </ModalDialog>
          </ModalContainer>
        }
      </div>
    );
  }
}
module.exports = AddressBookContainer;
