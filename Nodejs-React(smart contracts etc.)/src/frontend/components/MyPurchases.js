import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'
import axios from "axios";
import {toast} from "react-toastify";

export default function MyPurchases({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true)
  const [purchases, setPurchases] = useState([])
  const loadPurchasedItems = async () => {
    const filter =  marketplace.filters.Bought(null,null,null,null,null,account)
    const results = await marketplace.queryFilter(filter)
    const purchases = await Promise.all(results.map(async i => {
      i = i.args
      // debugger
      const uri = await nft.tokenURI(i.tokenId)

      // use uri to fetch the nft metadata stored on ipfs 
      const response = await fetch(uri)
      const metadata = await response.json()
      // get total price of item (item price + fee)
      const totalPrice = await marketplace.getTotalPrice(i.itemId)
let sellPrice = totalPrice;
      await axios({
        method: "get",
        url: 'http://localhost:8080/v1/products/' + i.itemId._hex,
      }).then(x => {
        sellPrice  = x.sellPrice
      }).catch(x => {
          toast.error(x.response.data.error)
        console.log(x.response.data.error);
      });
      // define listed item object
      let purchasedItem = {
        totalPrice,
        price: i.price,
        itemId: i.itemId,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        buyer: i.buyer,
        seller: i.seller,
          sellPrice: sellPrice
      }
      return purchasedItem
    }))
    setLoading(false)
    setPurchases(purchases)
  }
  useEffect(() => {
    loadPurchasedItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Yükleniyor...</h2>
    </main>
  )
  return (
    <div className="flex justify-center">
      {purchases.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {purchases.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Footer>Starging Price : {ethers.utils.formatEther(item.totalPrice)} ETH</Card.Footer>
                    <Card.Footer>Sell Price : {item.sellPrice} ETH</Card.Footer>
                    <Card.Footer>Name : {item.name}</Card.Footer>
                  <Card.Footer>Description : {item.description}</Card.Footer>
                  <Card.Footer>Buyer Account : {item.buyer}</Card.Footer>
                  <Card.Footer>Seller Account :{item.seller}</Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>Satın alınma yapılmadı</h2>
          </main>
        )}
    </div>
  );
}