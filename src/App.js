import { useState, useEffect } from "react";
import Web3 from 'web3';
import { useSnackbar } from 'react-simple-snackbar'
import { InfinitySpin } from  'react-loader-spinner'
const web3 = new Web3(Web3.givenProvider);
const Address = "0xf78b41EDc367c2e3E09C7aa51fA952cbd23592b2";
const Abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "amt",
        "type": "int256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "amt",
        "type": "int256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getBalance",
    "outputs": [
      {
        "name": "",
        "type": "int256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
const contract = new web3.eth.Contract(Abi,Address);
// window.ethereum.enable();
function App() {
  const [Loader,setLoader] = useState(false)
  const [openSnackbar] = useSnackbar({
    position: 'top-center',
    style: {
    },
    closeStyle: {
      color: 'lightcoral',
      fontSize: '16px',
    },
  })
  const [Amount,setAmount] = useState('')
  const [Balance,setBalance] = useState(0)


  const deposit = async() => {
    if(!Amount){
      openSnackbar('Please enter amount to deposit.')
      return
    }
    setLoader(true)
    try {
      // let accounts = await web3.eth.getAccounts()
      let accounts = await window.ethereum.send('eth_requestAccounts');
      accounts = accounts?.result
      console.log({accounts});
      let account = accounts[0];
      await contract.methods.deposit(Amount).send({from: account});
      getBalance()
      openSnackbar('Successfully deposited.')
    } catch (error) {
      openSnackbar('Something went wrong.')
      console.log({error},'deposit');      
    } finally {
      setLoader(false)
    }
  }
  const withdraw = async() => {
    if(!Amount){
      openSnackbar('Please enter amount to withdraw.')
      return
    }
    setLoader(true)
    try {
      // let accounts = await web3.eth.getAccounts()
      let accounts = await window.ethereum.send('eth_requestAccounts');
      accounts = accounts?.result
      console.log({accounts});
      let account = accounts[0];
      await contract.methods.withdraw(Amount).send({from: account});
      getBalance()
      openSnackbar('Successfully withdrawn.')
    } catch (error) {
      openSnackbar('Something went wrong.')
      console.log({error},'withdraw');      
    } finally {
      setLoader(false)
    }
  }
  const getBalance = async() => {
    try {
      let balance = await contract.methods.getBalance().call()
      setBalance(balance);
      setAmount('')
    } catch (error) {
      console.log({error},'getBalance');      
    }
  }
  useEffect(() => {
    getBalance()
    // eslint-disable-next-line
  },[])
  return (
    <div>
      {
        Loader &&
        <div className="spinContainer">
          <InfinitySpin 
            width='200'
            height='200'
            color="#4fa94d"
          />
        </div>
      }
      <div className="mt-5 title">
        Bank Web3
      </div>
      <div className="mt-5 title">
        Balance : {Balance}
      </div>
      <div className="d-flex jc ac mt-5">
        <input type="text" className="input" placeholder="Enter amount in Rs"
          value={Amount} onChange={(e)=>{setAmount(e.target.value)}} />
      </div>
      <div className="d-flex jc ac mt-5">
        <div>
          <button onClick={deposit}>Deposit</button>
          <button className="ml-5" onClick={withdraw}>Withdraw</button>
          <button className="ml-5" onClick={getBalance}>Get Balance</button>
        </div>
      </div>
    </div>
  );
}

export default App;
