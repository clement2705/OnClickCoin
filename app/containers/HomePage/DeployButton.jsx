import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import deployContract from '../../../server/api/deployContract';
import getPermission from '../../../server/api/getPermission';

/*
This class creates the DeployButton Component
*/

class DeployButton extends Component {
  async handleClick() {
    /*
    fetch constructor information from the contract form
    contract form is defined in server/api/ContractForm
    */
    const symbol = document.getElementById('symbol').value;
    const name = document.getElementById('name').value;
    const decimals = document.getElementById('decimals').value;
    const supply = document.getElementById('supply').value;

    // gets permission from metamask to access accounts and other info
    await getPermission();
    console.log('name is in DeployButton', name);
    console.log('supply is in DeployButton', supply);

    deployContract(symbol, name, decimals, supply);
  }

  render() {
    return (
      <>
        <Button
          variant="dark"
          className="ContractButton"
          onClick={this.handleClick}
        >
          Click here to create your coin
        </Button>
      </>
    );
  }
}

export default DeployButton;
