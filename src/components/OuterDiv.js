import React from "react";
import "./OuterDiv.css";
import Storage_1 from "./../artifacts/contracts/Storage.sol/Storage.json";

const { web3 } = require("./../utils/web3API");

const myContract = new web3.eth.Contract(Storage_1.abi);

function OuterDiv() {
  const [recipientAddress, setRecipientAddress] = React.useState("");
  const [retrieveValue, setRetrieveValue] = React.useState("");

  async function contractDeployment() {
    const accounts = await web3.eth.getAccounts();
    try {
      const hello = await myContract
        .deploy({ data: Storage_1.bytecode })
        .send({ from: accounts[0] });
      myContract.options.address = hello._address;
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    contractDeployment();
  }, []);

  async function store() {
    const accounts = await web3.eth.getAccounts();
    let res = await myContract.methods
      .store(recipientAddress)
      .send({ from: accounts[0] });
    console.log(res);
  }

  async function retrieve() {
    const accounts = await web3.eth.getAccounts();
    let res = await myContract.methods.retrieve().call({ from: accounts[0] });
    setRetrieveValue(res);
    console.log(res);
  }
  function change1(event) {
    setRecipientAddress(event.target.value);
  }

  function change2(event) {
    setRetrieveValue(event.target.value);
  }

  return (
    <div>
      <div className="outer-div">
        <div className="inner-div">
          <h2>Store Value</h2>
          <form>
            <input
              className="input-1"
              value={recipientAddress}
              onChange={change1}
              placeholder="recipient address"
            ></input>
            <button className="button-1" type="button" onClick={store}>
              Store
            </button>
          </form>
        </div>

        <div className="inner-div">
          <h2>Retrieve Value</h2>
          <form>
            <input
              className="input-1"
              value={retrieveValue}
              onChange={change2}
              style={{
                backgroundColor: "rgba(131, 131, 131, 0.336)",
                fontWeight: "600",
              }}
              readonly
            ></input>
            <button className="button-1" type="button" onClick={retrieve}>
              Retrieve
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OuterDiv;
