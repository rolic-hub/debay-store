import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Container,
  Box,
} from "@chakra-ui/react";

import { useMoralis } from "react-moralis";

const History = ({ open, setOpen }) => {
   
  const { Moralis, account } = useMoralis();
  let data = [];

  const getComponents = async () => {
    await Moralis.start({
      serverUrl: process.env.REACT_APP_MORALIS_SERVER,
      appId: process.env.REACT_APP_MORALIS_APPID,
    });
    const query = new Moralis.Query("History");
    query.equalTo("Customer", account);

    const result = await query.find();
    result.forEach((item) => {
     
      data.push(item.attributes);
    });
  };
  useEffect(() => {
    getComponents();
  }, [account]);

  return (
    <div>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transactions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
   
      {data.length === 0 ?<p>No Transaction</p> : data.map((item, i) => {
     <Container key={i}>
    <div style={{ display: "flex" }}>
      {item.attributes.ProductImage.map((pimg, i) => (
        <Box key={i}>
          <img
            height="100px"
            width="100px"
            src={pimg}
            alt="product"
          />
        </Box>
      ))}
      {item.attributes.Product.map((title, i) => (
        <Box key={i}>
          <strong>{title}</strong>
        </Box>
      ))}
    </div>
    <div style={{ display: "flex" }}>
      <strong>User: {item.attributes.Customer}</strong>

      <strong>Delivery Address: {item.attributes.Delivery}</strong>
    </div>
    <div style={{ display: "flex" }}>
      <strong>txHash: {item.attributes.txhash}</strong>
      <strong>Total price: {item.attributes.Totalprice}</strong>
    </div>
  </Container>;
})}
   
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default History;
