import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CashbackItem from './CashbackItem';
import classes from './Cashback.css'
const API_URL = "http://localhost:8080/cashbacks/";
function Cashback() {
  const [cashbacks, setCashbacks] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const username = currentUser.username;
  const refreshHandler = ()=>{
   }
  useEffect(() => {
    axios.get(API_URL + `${username}`)
      .then(response => {
        setCashbacks(response.data);
      })
      .catch(error => {
        
      });

  }, [username,refresh]);

  return (
    <Fragment>
     {(cashbacks.length === 0) ? <h2 className="text-center my-5">No cashbacks Found</h2>:(
        <div className='dummy'>
        <h2 className="text-center my-5">Unclaimed Cashbacks</h2>
        <table style={classes.table}>
          <thead style={classes.thead}>
            <tr style={classes.tr}>
              <th style={classes.th}>Cashback Amount</th>
              <th style={classes.th}>Action</th>
            </tr>
          </thead>
          <tbody style={classes.tbody}>
            {cashbacks.map(cashback => (
              <CashbackItem key={cashback.id} cashback={cashback} refreshClick = {refreshHandler}>
            </CashbackItem>
            ))}
          </tbody>
          </table>
      </div>
     )}
    
    </Fragment>
  );
}

export default Cashback;
