import axios from 'axios';
import {  useSnackbar } from 'notistack';
import classes from './CashbackItem.css';
const API_URL = "http://localhost:8080/cashbacks/";

function CashbackItem(props){
    const cashback = props.cashback;
    const { enqueueSnackbar } = useSnackbar();
    const claimOnClickHandler = ()=>{
        axios.post(API_URL + `${cashback.id}`).then(
            (response) => {enqueueSnackbar('Cashback Claimed', { variant: 'success' });
        }
        );
        props.refreshClick();
    }
    return(
         (<div className='dummy'>
        <td style={classes.td}>{cashback.cashbackAmount}</td>
        <td style={classes.td}><button onClick={claimOnClickHandler}>Claim</button></td>
    </div>)
    )
}
export default CashbackItem;