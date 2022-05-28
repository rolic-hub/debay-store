import React, { useState, useEffect } from "react";
import { Layout, Card, Rate, Radio, Space, Button} from "antd";

import { Link } from "react-router-dom";
import "./Layout.css";
import { useMoralis } from "react-moralis";
import { useIntegraContext } from "../utils/integration";
import { useApiContext } from "../utils/ApiCode";

const Body = ({ Products }) => {
  const { isAuthenticated } = useMoralis();
  const { Price, dataFeed } = useIntegraContext();
  const { Sider, Content } = Layout;
  const [rating, setRating] = useState(1);
  
  const [productFilter, setProductFilter] = useState([]);
  const {Category} = useApiContext();

  

  useEffect(() => {
    if (isAuthenticated) {
      setProductFilter(
        Products?.filter((x) => x.rating.rate >= rating)
      );
    } else {
      setProductFilter(
        Products?.filter((x) => x.rating.rate >= rating)
      );
    }
  }, [dataFeed, productFilter, isAuthenticated]);

  return (
    <div>
      <Layout>
        <Sider width="340px" theme="light" style={{ padding: "25px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2 style={{marginTop:"30px"}}>Customer Reviews</h2>
            <Radio.Group
              value={rating}
              onChange={(value) => setRating(value.target.value)}
            >
              <Space direction="vertical">
                <Radio value={5}>
                  <Rate defaultValue={5} disabled={true}></Rate>
                </Radio>
                <Radio value={4}>
                  <Rate defaultValue={4} disabled={true}></Rate>
                </Radio>
                <Radio value={3}>
                  <Rate defaultValue={3} disabled={true}></Rate>
                </Radio>
                <Radio value={2}>
                  <Rate defaultValue={2} disabled={true}></Rate>
                </Radio>
                <Radio value={1}>
                  <Rate defaultValue={1} disabled={true}></Rate>
                </Radio>
              </Space>
            </Radio.Group>
            <br />
            <br />
            <strong>Categories</strong>
           {Category.map((product, i) => (
             <Button style={{width:"max-content", padding:"10px"}}>
             <Link to={`/category/${product}`}>
             {product}
             </Link>
             </Button>
           ))}
            <br />
            <br />
          </div>
        </Sider>
        <Content>
          {productFilter.length === 0 ? (
            <p style={{ justifyContent: "center", height: "300px" }}>
              No item fit your description
            </p>
          ) : (
            productFilter.map((info) => (
              <Link to={`/category/product/${info.id}`}>
                <Card>
                  <div className="product-info" style={{ display: "flex" }}>
                    <img width="300px" src={info.image} alt={info.title} />

                    <div style={{ marginLeft: "20px", marginTop: "50px" }}>
                      <strong>Name - {info.title}</strong>
                      <br />
                      <Rate
                        disabled
                        defaultValue={Math.round(info.rating.rate)}
                      />
                      {!isAuthenticated ? (
                        <p style={{ marginTop: "15px" }}>
                          {" "}
                          Price:
                          <span style={{ color: "green" }}>${info.price}</span>
                        </p>
                      ) : (
                        Price((info.price / dataFeed).toFixed(3), "Price")
                      )}
                      <p>Description - {info.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </Content>
      </Layout>
    </div>
  );
};

export default Body;
