import React from "react";
import "./Home.css";
import Navbar from "./Navbar";
import Footers from "./Footer";
import { Card, Space } from "antd";

const Home = () => {
  return (
    <div className="cover">
      <Navbar />
      <div>
        <Card style={{ marginTop: "100px", marginLeft: "220px", width:"max-content", marginBottom:"-100px"}}>
          <strong>
            Click on account details to login your wallet then click Categories to select a product category to explore
          </strong>
        </Card>
        <Card className="card" title="About DeBay">
          DEBAY store is an online store which takes advantage of blockchain
          technology, hence goods are paid for in crypto and each user who
          purchases an item gets a non-transferable Nft. A Different Nft is
          issued depending on the total cost of what the user purchased the
          higher the cost the higher the value of the Nft is and the higher the
          value of the Nft the faster will be able to unlock more features of
          the store.
          <br />
          Note: One Nft is issued per day
          <hr></hr>
          <strong>Some of the features include</strong>
          <p>level #1 - Welcome to Debay Store</p>
          <p>level #2 - Zero shipping fees on all items bought</p>
          <p>level #3 - Users Enjoy a 20% discount on all items bought</p>
          <p>
            level #4 - Users are given acess to some of our exclusive products{" "}
          </p>
          <p>
            level #5 - Paying in installements using superfluid is introduced
          </p>
        </Card>
        <Card
          style={{
            marginLeft: "15rem",
            marginBottom: "2rem",
            borderRadius: "10px",
            width: "45vw",
          }}
          title="Chains We Currently Support"
        >
          <div style={{ display: "flex" }}>
            <Space size={"middle"}>
              <div>
                <img
                  src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022"
                  alt="ethereum"
                  width="100px"
                />
                <p>Ethereum - Rinkeby Testnet</p>
              </div>
              <div>
                <img
                  src="https://cryptologos.cc/logos/polygon-matic-logo.png?v=022"
                  alt="ethereum"
                  width="100px"
                />
                <p>Polygon - Mumbai Testnet</p>
              </div>
              <div>
                <img
                  src="https://cryptologos.cc/logos/bnb-bnb-logo.png?v=022"
                  alt="ethereum"
                  width="100px"
                />
                <p>Bsc - Bsc Testnet</p>
              </div>
            </Space>
          </div>
        </Card>
      </div>

      <footer>
        <Footers />
      </footer>
    </div>
  );
};

export default Home;
