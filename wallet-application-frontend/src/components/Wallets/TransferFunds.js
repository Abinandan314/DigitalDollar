import React, { useState ,useEffect} from 'react';
import './TransferFunds.css';
import { transfer } from '../../slices/walletslice';
import { useDispatch,useSelector} from "react-redux";
import {  useSnackbar } from 'notistack';
import { clearMessage } from "../../slices/message";

function TransferFunds(props) {
  const tokenItem = sessionStorage.getItem("token");
  var token;
  if(tokenItem != null){
     token = tokenItem.substring(1,tokenItem.length-1);
  }
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState(0);
  const { user: currentUser } = useSelector((state) => state.auth);
  const senderUsername = currentUser.username;
  const { message } = useSelector((state) => state.message); 
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const handleSubmit = (e) => {
    

    e.preventDefault();
    dispatch(transfer({ senderUsername, username, transferAmount:amount ,token}))
      .unwrap()
      .then(() => {
        enqueueSnackbar('Funds Transfer completed successfully', { variant: 'success' });
        props.stat();
      })
      .catch((e) => {
        enqueueSnackbar('Funds Transfer Not completed',{variant:'error'});
      });
};

  return (
    <div className="overlay">
      <div className="form-container">
        <h2>Transfer Funds!</h2>
        <form className="add-funds-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <div className="button-container">
            <button className="add-button" type="submit">
              Transfer Funds
            </button>
            <button className="back-button" onClick={props.onClose}>
              Back
            </button>
          </div>
        </form>
        {message && (
        <div className="form-group">
          <p>
            {message}
            </p>
        </div>
      )}
      </div>
      
    </div>
  );
}

export default TransferFunds;
