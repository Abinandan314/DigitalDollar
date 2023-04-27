import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Table } from 'react-bootstrap';
const API_URL = "http://localhost:8080/transactions/";
function Transaction() {
  const tokenItem = sessionStorage.getItem("token");
  var token;
  if(tokenItem != null){
     token = tokenItem.substring(1,tokenItem.length-1);
  }
  const [transactions, setTransactions] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const username = currentUser.username;
  useEffect(() => {
    axios.get(API_URL + `${username}`,{
      headers:{
        "Authorization" : `Bearer ${token}`
    }
    })
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
      });
  }, [username,token]);

  
const getSenderName = (transaction) => {
    if (transaction.senderUsername === username) {
      return 'You'; // use 'You' for transactions sent by Abinandan
    } else {
      return transaction.senderUsername; // use sender's username for other transactions
    }
  };
  const getReceiverName = (transaction) => {
    if (transaction.receiverUsername === username) {
      return 'You'; // use 'You' for transactions sent by Abinandan
    } else {
      return transaction.receiverUsername; // use sender's username for other transactions
    }
  };

  return (
    <div>
      <h2 className="text-center my-5">Transaction History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Transfer Amount</th>
            <th>Transaction Date and Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id} style={{backgroundColor:transaction.senderUsername === username ? '#FADBD8' : '#D5F5E3'}}>
              <td>{getSenderName(transaction)}</td>
              <td>{getReceiverName(transaction)}</td>
              <td style={{ color: transaction.senderUsername === username ? 'red' : 'black' }}>
                $ {transaction.transferAmount}
                </td>
              <td>{new Date(transaction.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Transaction;
