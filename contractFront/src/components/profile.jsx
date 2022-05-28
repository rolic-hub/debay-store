import React, { useState, useEffect } from "react";

import { useMoralis } from "react-moralis";

import { useIntegraContext } from "../utils/integration";
import { Card, Steps, Button } from "antd";

const Profile = () => {
  const { account } = useMoralis();
  const { nftBalance, bar, burn, amountNft } = useIntegraContext();
  const { Step } = Steps;
  const [current, setCurrent] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (bar <= 100) {
      setCurrent(0);
      setPercent(bar);
    } else if (bar > 100) {
      const dowm = Math.floor(bar / 100);
      const remainder = bar % 100;
      setCurrent(dowm);
      setPercent(remainder);
    }
  }, [bar]);
  return (
    <div>
      {nftBalance.length === 0 ? (
        <div>
          {account}
          <p>No Nfts Found</p>
        </div>
      ) : (
        <div>
          {nftBalance.length > 1 && amountNft.lenght > 1 ? (
            nftBalance.map((item) => (
              <div>
                <Card>
                  <img src={item.image} alt={item.name} />
                  <hr></hr>
                  <div style={{ display: "flex", margin: "10px" }}>
                    <strong style={{ marginRight: "3px" }}> {item.name}</strong>
                    {amountNft.map((number, i) => (
                      <p style={{ marginRight: "3px" }} key={i}>
                        {number}
                      </p>
                    ))}
                    <Button onClick={burn(item.id)}>burn</Button>
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <div>
              <Card>
                <img src={nftBalance.image} alt={nftBalance.name} />
                <hr></hr>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "7px",
                  }}
                >
                  <strong style={{ marginRight: "3px" }}>
                    {nftBalance.name}
                  </strong>
                  <p style={{ marginRight: "3px" }}>{amountNft}</p>
                  <Button>burn</Button>
                </div>
              </Card>
            </div>
          )}
          <Steps
            style={{ marginTop: "30px", marginLeft: "20px" }}
            direction="vertical"
            current={current}
            percent={percent}
          >
            <Step
              title="Debay level #1"
              description="Welcome to DeBay"
              subTitle="Your trusted decommerce store, checkout the homepage for more info"
            />
            <Step
              title="Debay level #2"
              description="Enjoy zero shipping fees on all our products"
            />
            <Step
              title="Debay level #3"
              description="This level features a 20% discount on item purchased"
            />
            <Step
              title="Debay level #4"
              description="Our customers this level makes visible some of our exclusive products"
            />
            <Step
              title="Debay level #5"
              description="This level introduces superfluid as a method of payment installements, checkout the homepage for more details"
            />
            <Step title="Coming Soon" description="This is a description." />
          </Steps>
        </div>
      )}
    </div>
  );
};

export default Profile;
