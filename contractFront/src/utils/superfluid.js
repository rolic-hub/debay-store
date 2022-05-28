import React, { useState, useEffect } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import { Button, Form, FormGroup, FormControl, Spinner } from "react-bootstrap";
import "./createFlow.css";
import { ethers } from "ethers";
import Navbar from "../components/Navbar";
import { useIntegraContext } from "./integration";
import { useMoralis } from "react-moralis";
import { AlertError } from "../components/Alert";

export const CreateFlow = () => {
  const { isAuthenticated, web3, chainId, account } = useMoralis();

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [flowRate, setFlowRate] = useState("");
 
  const [flowRateDisplay, setFlowRateDisplay] = useState("");
  const {total, dataFeed, bar} = useIntegraContext();

  const recipient = "0x9353CdB9598937A9a9DD1D792A4D822EE8415E8D";


  async function createNewFlow( flowRate) {
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: web3,
    });
    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;

    try {
      if (isAuthenticated) {
        const createFlowOperation = sf.cfaV1.createFlow({
          receiver: recipient,
          flowRate: flowRate,
          superToken: DAIx,
          // userData?: string
        });

        console.log("Creating your stream...");

        const result = await createFlowOperation.exec(web3.getSigner());

        console.log(result);

        console.log(
          `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
    Super Token: DAIx
    Receiver: ${recipient},
    FlowRate: ${flowRate}
    `
        );
      }
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }
  async function deleteFlow(){
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: web3,
    });

      const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;
try {
  
   const deleteFlowOperation = sf.cfaV1.deleteFlow({
  sender: account,
  receiver: recipient,
  superToken: DAIx,
  //userData?: string

});

 const result = await deleteFlowOperation.exec(web3.getSigner());

 console.log(result);
} catch (error) {
  <AlertError error={error}/>
}
  } 

  function calculateFlowRate(amount) {
    if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
      alert("You can only calculate a flowRate based on a number");
    } else if (typeof Number(amount) === "number") {
      if (Number(amount) === 0) {
        return 0;
      }
      const amountInWei = ethers.BigNumber.from(amount);
      const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
      const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
      return calculatedFlowRate;
    }
  }

  function CreateButton({ isLoading, children, ...props }) {
    return (
      <Button variant="success" className="button" {...props}>
        {isButtonLoading ? <Spinner animation="border" /> : children}
      </Button>
    );
  }
   function DeleteButton({ isLoading, children, ...props }) {
     return (
       <Button variant="success" className="button" {...props}>
         {isButtonLoading ? <Spinner animation="border" /> : children}
       </Button>
     );
   }

 

  const handleFlowRateChange = (e) => {
    setFlowRate(() => ([e.target.name] = e.target.value));
    let newFlowRateDisplay = calculateFlowRate(e.target.value);
    setFlowRateDisplay(newFlowRateDisplay.toString());
  };


  return (
    <div>
      <Navbar />
      <div
        style={{
          justifyContent: "center",
          margin: "30px",
          alignItems: "center",
        }}
      >
        <h2>Create a Flow</h2>

        <Form>
          <FormGroup className="mb-3">
            <FormControl
              name="flowRate"
              value={flowRate}
              onChange={handleFlowRateChange}
              placeholder="Enter a flowRate in wei/second"
            ></FormControl>
          </FormGroup>
          <p>reciepient: {recipient}</p>
          <br />
          <p>Amount to Pay: {total / dataFeed}</p>
          <br />
          {bar >= 500 ?  <CreateButton
            onClick={() => {
              setIsButtonLoading(true);
              createNewFlow(flowRate);
              setTimeout(() => {
                setIsButtonLoading(false);
              }, 1000);
            }}
          >
            Click to Create Your Stream
          </CreateButton> 
          : <p>
            You are not eligible to use this feature
          </p>
          }
        
        </Form>

        <div className="description">
          <p>Using superfluid you can pay for goods over a period of time.</p>
          <br/>
          <p>To use this feature input a flowrate calcualted in wei/sec that is the amount of 
            wei that will be sent per sec and check what you will have sent in a month, hence using that to calculate your flowrate </p>
            <br/>
            <p>Please Note: As of now we have no way of stopping your flow when you have
               totally paid so you will have to click the deleteFlow button below to do that</p>
               <br/>

          <p>
            PS: Your goods will not be delivered until you have paid for at
            least 70% of the goods{" "}
          </p>
          <br/>
          <div className="calculation">
            <p>Your flow will be equal to:</p>
            <p>
              <b>${flowRateDisplay !== " " ? flowRateDisplay : 0}</b> DAIx/month
            </p>
          </div>
          <DeleteButton
            onClick={() => {
              setIsButtonLoading(true);
              deleteFlow();
              setTimeout(() => {
                setIsButtonLoading(false);
              }, 1000);
            }}
          ></DeleteButton>
        </div>
      </div>
    </div>
  );
};
