import React, { useState } from 'react';
import "./AddFunds.css"
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import {  useSnackbar } from 'notistack';
const API_URL = "http://localhost:8080/wallets/";

function AddFunds(props) {
  const tokenItem = sessionStorage.getItem("token");
  var token;
  if(tokenItem != null){
     token = tokenItem.substring(1,tokenItem.length-1);
  }
  const { enqueueSnackbar } = useSnackbar();
  const [amount, setAmount] = useState(0);
  const wallet = props.wallet;

  /* istanbul ignore next */
  // let navigate = useNavigate();
  
  function handleSubmit(event) {
    event.preventDefault();
    axios.post(API_URL + `${wallet.username}/balance`
    ,{balance:amount}
    ,{
      headers:{
        "Authorization" : `Bearer ${token}`
    }
    }
    ).then(
        (response) => {enqueueSnackbar('Funds Addition completed successfully. Redeem Cashback', { variant: 'success' },
        
        );
        
        // navigate('/wallet');
        props.stat();
    }
    );
    
    setAmount(0);
  }
  const onAmountChangeHandler = (event)=>{
    setAmount(event.target.value);
  }
  const handleBackClick = (event)=>{
    event.preventDefault();
    setAmount(0)
    props.onClose();
  }
  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>Add Funds!</h2>
        <form className="add-funds-form" onSubmit={handleSubmit}>
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" name="amount" value={amount} onChange={onAmountChangeHandler}/>


          <button type="submit" className="add-funds-btn">
            Add Funds
          </button>
        </form>

        <button type="button" className="back-btn" onClick={handleBackClick}>Back</button>
       
      </div>
    </div>
  );

}

export default AddFunds;
