import React, { createContext, useContext, useState, useEffect } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { ethers } from "ethers";
import { pAbi, EAbi, bAbi, DeAbi } from "./contracts";
import {
  BsccontractAddress,
  EthcontractAddress,
  PolcontractAddress,
  EthNftAddress,
  PolNftAdress,
  BscNftAddress,
} from "./contracts";
import { useApiContext } from "./ApiCode";
import { AlertError, AlertSucess } from "../components/Alert";

const IntegrationContext = createContext();

export const Integration = ({ children }) => {
  const [dataFeed, setdataFeed] = useState(0);
  const [Delivery, setDelivery] = useState("");
  const [id, setId] = useState(1);
  

  const [nftBalance, setNftbalance] = useState([]);
  const [Tokenbalance, setTokenBalance] = useState(0);
  const [Account, setAccount] = useState("");

  const [Nftcontract, setNftContract] = useState("");
  const [total, setTotal] = useState(0);
  const [bar, setBar] = useState(0);

  const { isAuthenticated, chainId, Moralis, account } = useMoralis();
  const { cartPage, setCartPage } = useApiContext();

  const Web3Api = useMoralisWeb3Api();

  let balanceOfNft = [];
  let progressBar = [];
  let amountNft = [];

  const ChainPrice = async (contractAddr, Abi) => {
    const options = {
      contractAddress: contractAddr,
      functionName: "getLatestPrice",
      abi: Abi,
    };
    const data = await Moralis.executeFunction(options);
    const dataFe = (data / 10 ** 8).toFixed(2);
    setdataFeed(dataFe);
  };
  const getNft = async (conAddress) => {
    await Moralis.start({
      serverUrl: process.env.REACT_APP_MORALIS_SERVER,
      appId: process.env.REACT_APP_MORALIS_APPID,
    });
    const options = {
      chain: chainId,
      format: "decimal",
      address: account,
      token_address: conAddress,
    };

    const nftData = await Web3Api.Web3API.account.getNFTsForContract(options);
    const result = nftData.result;

    if (result.length > 0) {
      result.forEach((element) => {
        balanceOfNft.push(
          element.token_uri.replace("https://ipfs.moralis.io:2053/", "")
        );
        const number = element.token_id * 30 * element.amount;
        amountNft.push(element.amount);
        
        progressBar.push(number);
      });
      balanceOfNft.forEach(async (element) => {
        const response = await fetch(element);
        const data = await response.json();

        setNftbalance(data);
      });
      const reducer = (accumulator, curr) => accumulator + curr;
      const value = progressBar.reduce(reducer);
      setBar(value);
    }
  };

  const getBalance = async (account) => {
    await Moralis.start({
      serverUrl: process.env.REACT_APP_MORALIS_SERVER,
      appId: process.env.REACT_APP_MORALIS_APPID,
    });
    const bOptions = {
      chain: chainId,
      address: account,
    };
    const get = await Web3Api.Web3API.account.getNativeBalance(bOptions);
    const result = get.balance;
    const convert = Moralis.Units.FromWei(result);

    setTokenBalance(convert);
  };
  const totalPrice = (price, delivery) => {
    const sum = price + delivery;
    setTotal(sum);
  };

  const handleOk = async (product) => {
    const reciever = "0x9353CdB9598937A9a9DD1D792A4D822EE8415E8D";
    try {
      await Moralis.start({
        serverUrl: process.env.REACT_APP_MORALIS_SERVER,
        appId: process.env.REACT_APP_MORALIS_APPID,
      });

      if (cartPage.length > 0) {
        const price = (total / dataFeed).toString();
        if (total <= 500) {
          setId(1);
        } else if (total > 500 && total <= 1000) {
          setId(2);
        } else if (total > 1000 && total <= 1500) {
          setId(3);
        } else if (total > 1500 && total <= 2200) {
          setId(4);
        } else if (total > 2200) {
          setId(5);
        }

        const senOptions = {
          contractAddress: Nftcontract,
          functionName: "transferNmint",
          abi: DeAbi,
          params: {
            to: reciever,
            id: id,
            nftamount: 1,
            data: [],
            msgValue: Moralis.Units.ETH(price.toString()),
          },
        };
        const transfer = await Moralis.executeFunction(senOptions);
        const receipt = await transfer.wait();
        console.log(receipt);
        let productTilteArray = [];
        let productImageArray = [];
        productTilteArray.push(product?.title);
        productImageArray.push(product?.image);

        //Save Transaction Details to DB
        const Transaction = Moralis.Object.extend("History");
        const transaction = new Transaction();

        transaction.set("Customer", account);
        transaction.set("Delivery", Delivery);
        transaction.set("Product", productTilteArray);
        transaction.set("ProductImage", productImageArray);
        transaction.set("txhash", receipt.transactionHash);
        transaction.set("Totalprice", price);

        transaction.save();
        setCartPage([]);
        <AlertSucess/>
      }
    } catch (error) {
      console.log(error);
      <AlertError error={error}/>
    }
    // Send eth to book store owenr address
  };

  const burn = async (id) => {
    try {
      const options = {
        contractAddress: Nftcontract,
        functionName: "burn",
        abi: DeAbi,
        params: {
          account: account,
          id: id,
          value: 1,
        },
      };
      const burnNft = await Moralis.executeFunction(options);
      const receipt = await burnNft.wait();
      console.log(receipt);
    } catch (error) {
      console.log(error);
    }
  };

  const unsupported = () => {
    return <AlertError error={"Unsupported Chain"}/>
  };
  useEffect(() => {
    if (account !== null) {
      console.log(chainId);
      if (chainId === "0x4") {
        ChainPrice(EthcontractAddress, EAbi);
        getNft(EthNftAddress);
        setNftContract(EthNftAddress);
      } else if (chainId === "0x13881") {
        ChainPrice(PolcontractAddress, pAbi);
        getNft(PolNftAdress);
        setNftContract(PolNftAdress);
      } else if (chainId === "0x61") {
        ChainPrice(BsccontractAddress, bAbi);
        getNft(BscNftAddress);
        setNftContract(BscNftAddress);
      } else {
        setdataFeed(1);
        console.log("Chain unsupported");
        unsupported();
      }
    }
  }, [chainId, isAuthenticated, ChainPrice]);

  const DisplayByChain = (price, name) => {
    switch (chainId) {
      case "0x4":
        return (
          <p>
            {name}: {price} Eth
          </p>
        );
      case "0x13881":
        return (
          <p>
            {name}: {price} MATIC
          </p>
        );
      case "0x61":
        return (
          <p>
            {name}: {price} BNB
          </p>
        );

      default:
        break;
    }
  };

  return (
    <IntegrationContext.Provider
      value={{
        dataFeed,
        Account,
        chainId,
        isAuthenticated,
        handleOk,
        setDelivery,
        totalPrice,
        total,
        account,
        nftBalance,
        Price: DisplayByChain,
        bar,
        getBalance,
        Tokenbalance,
        burn,
        amountNft,
        setTotal
      }}
    >
      {children}
    </IntegrationContext.Provider>
  );
};

export const useIntegraContext = () => useContext(IntegrationContext);
