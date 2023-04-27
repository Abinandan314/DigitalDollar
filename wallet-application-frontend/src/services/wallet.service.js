import axios from "axios";
const API_URL = "http://localhost:8080/wallets/";

const transfer = (senderUsername,username,transferAmount,token)=>{
    return axios.post(API_URL + `${senderUsername}/transfer`,{
        username,
        transferAmount
    },{
        headers:{
          "Authorization" : `Bearer ${token}`
      }
      });
};

const WalletService = {
    transfer
}
export default WalletService;