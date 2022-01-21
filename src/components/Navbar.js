import React from "react";
import "./Navbar.css";
import Value from "./Value";
const { web3 } = require("./../utils/web3API");

function Navbar() {
  const [address, setAddress] = React.useState("");

  async function accountAddress() {
    let accounts = await web3.eth.getAccounts();
    setAddress(accounts[0]);
  }

  Value.spanValue = accountAddress();

  return (
    <div>
      <header className="navbar">
        Storage SC
        <span className="spanStyle" id="current_address">
          Active :{address}
        </span>
      </header>
    </div>
  );
}

export default Navbar;
