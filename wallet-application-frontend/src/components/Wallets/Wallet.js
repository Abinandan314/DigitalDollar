import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import "./wallet.css";
import AddFunds from "./AddFunds";
import TransferFunds from "./TransferFunds";
const API_URL = "http://localhost:8080/wallets/";

const Wallet = () => {
    const [wallet,setWallet] = useState(null);
    const [addFunds,setAddFunds] = useState(false);
    const [transferFunds,setTransferFunds] = useState(false);
    const [balanceUpdateStat,setBalanceUpdateStat] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    
    const tokenItem = sessionStorage.getItem("token");
    var token;
    if(tokenItem != null){
        token = tokenItem.substring(1,tokenItem.length-1);
    }
    console.log(token);
    useEffect(()=>{
        axios.get(API_URL + `${currentUser.username}`,{
            headers:{
                "Authorization" : `Bearer ${token}`
            },
            // withCredentials:true
        }).then(
            (response) => {setWallet(response.data);console.log(response.data); 
            
            }
        );
    },[currentUser.username,balanceUpdateStat,token]);
    const onAddFundsSubmit = ()=>{
        setBalanceUpdateStat(!balanceUpdateStat)
    }
    const onAddFundsHandler = () => {
        setAddFunds(true);
    }
    const onCloseHandler = () => {
        setAddFunds(false);
    }
    const onTransferHandler = ()=>{
        setTransferFunds(true);
    }
    const onTransferCloseHandler = () => {
        setTransferFunds(false);
    }
    return(
        <div className="wallet-container">
      <h1>{`${wallet && wallet.username}'s Wallet`}</h1>
      <div className="balance-container">
        <h2>Total Balance:</h2>
        <p className="balance">${wallet && wallet.totalBalance}</p>
      </div>
      <button className="add-funds-btn" onClick={onAddFundsHandler}>
        Add Funds
      </button>
      <button className="add-funds-btn" onClick={onTransferHandler}>
        Transfer Funds
      </button>
      {addFunds && <AddFunds onClose={onCloseHandler} wallet = {wallet} stat = {onAddFundsSubmit}/>}
      {transferFunds && <TransferFunds wallet={wallet} onClose={onTransferCloseHandler} stat={onAddFundsSubmit}></TransferFunds>}
    </div>

    );
}

export default Wallet;