import React, { useState, useEffect, useRef } from "react";

import { ethers } from "ethers";
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { useIntegraContext } from "../utils/integration";
import metamask from "../assets/metamask.png";

import wallet from "../assets/wallet.png";

const ConnectWallet = ({ connect, setConnect }) => {
  const [chain, setchain] = useState("");
  const [chainName, setChainName] = useState("");

  const { getBalance, Tokenbalance, account } = useIntegraContext();

  const { authenticate, isAuthenticated, chainId, isWeb3Enabled, Moralis } =
    useMoralis();
  useEffect(() => {
    if (isAuthenticated) {
      if (chainId === "0x4") {
        setchain("ETH");
        setChainName("Rinkeby Testnet");
      } else if (chainId === "0x13881") {
        setchain("MATIC");
        setChainName("Polygon Mumbai Testnet");
      } else if (chainId === "0x61") {
        setchain("BNB");
        setChainName("Bsc Testnet");
      } else {
      }
    }
  }, [chainId, isAuthenticated]);

  const login = async () => {
    try {
      if (!isAuthenticated || !isWeb3Enabled) {
        await authenticate({ signingMessage: "Welcome to DeBay" });
        getBalance(account);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const walletlogin = async () => {
    try {
      
      await authenticate({
        provider: "walletConnect",
        signingMessage: "Welcome to DeBay",
      });
      getBalance(account);
    } catch (error) {}
  };

  const logout = async () => {
    try {
      await Moralis.User.logOut();
   
      setConnect(false);
    } catch (error) {}
  };

  return (
    <div style={{ marginTop: "-500px" }}>
      <Modal
        bgColor="white"
        onClose={() => setConnect(false)}
        isOpen={connect}
        isCentered
        size="xs"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>LOGIN</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            style={{
              margin: "5px",
              marginTop: "-10px",
            }}
          >
            {account === null || !isAuthenticated ? (
              <>
                <strong style={{ marginTop: "-50px" }}>This project is only configured for the Rinkeby Testnet, Polygon Mumbai Testnet and the Bsc Testnet</strong>
                <br />
                <div>
                  <Button onClick={login} style={{ margin: "5px" }}>
                    <img
                      style={{ marginRight: "10px" }}
                      height="20px"
                      width="20px"
                      src={metamask}
                      alt="metamask"
                    />{" "}
                    Login with Metamask
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => walletlogin()}
                    style={{ margin: "5px" }}
                  >
                    <img
                      style={{ marginRight: "10px" }}
                      height="40px"
                      width="20px"
                      src={wallet}
                      alt="wallet-connect"
                    />{" "}
                    Login with WalletConnect
                  </Button>
                </div>
              </>
            ) : (
              <div>
                <strong>Address: {account}</strong> <br />
                <strong>
                  Balance: {Tokenbalance} {chain}
                </strong>
                <br />
                <strong>Network: {chainName}</strong>
                <br />
                <Button
                  style={{ marginLeft: "200px" }}
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ConnectWallet;
