import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {



    const privateKey = evt.target.value;
    const publicKey = secp.getPublicKey(privateKey);
    const addressNotHex = keccak256(publicKey.slice(1)).slice(-20);
    const address = "0x" + toHex(addressNotHex);
    setPrivateKey(privateKey);


    setAddress(address);
    if (address) {
      const {
        data: { balance, privateKey },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
      setPrivateKey(privateKey);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type your address" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;