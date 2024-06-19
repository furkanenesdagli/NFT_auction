import {useEffect, useState} from 'react'
import {ethers} from "ethers"
import {Button, Card, Col, Form, Row} from 'react-bootstrap'
import axios from "axios";
import {useNavigate} from "react-router";

import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";

const Home = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
    const [offeredPrice, setOfferedPrice] = useState()
    const navigate = useNavigate()
    const [startAuction, setStartAuction] = useState(false)
    const [arr, setArr] = useState([])

    const buyItem = () => {
      console.log("selam")
        console.log(arr)
        arr.forEach(async x => {
            console.log(x)
            await (await marketplace.purchaseItem(x.id, { value: x.totalPrice })).wait()
            debugger
            await axios({
                method: "post",
                url: 'http://localhost:8080/v1/products/buy/' + x.id,
            }).then(x => {
                navigate('/satin-aldiklarim')
                console.log("İşlem başarılı!");

            }).catch(x => {
                console.log(x.response.data.error);
            });
        })
    }
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        if (!startAuction) {
            return;
        }

        if (timeLeft <= 0) {
            buyItem()
            return
        }
        const timerId = setInterval(() => {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft, startAuction]);

  const loadMarketplaceItems = async () => {
    const itemCount = await marketplace.itemCount()
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold) {
        const uri = await nft.tokenURI(item.tokenId)
        const response = await fetch(uri)
        const metadata = await response.json()
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
          let lastBid = totalPrice
          await axios({
              method: "get",
              url: 'http://localhost:8080/v1/products/lastBid/' + item.itemId._hex,
          }).then(res => lastBid = res.data)
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
            image: metadata.image,
            lastBid: lastBid
        })
      }
    }
    setLoading(false)
    setItems(items)
  }

    const sendOffer = async (item) => {

        await axios({
            method: "post",
            url: 'http://localhost:8080/v1/products/bid',
            data: {
                "id": item.itemId._hex,
                "offeredPrice": offeredPrice
            }
        }).then(x => {
            loadMarketplaceItems()
            toast.success("Last Bid: "+offeredPrice)
            if (!startAuction) {
                setStartAuction(true)
                setTimeLeft(30)
            }
            setArr(prevArr => {
                    if (!prevArr.some(item => item.id === item.itemId._hex)) {
                    return [...prevArr, {
                       id: item.itemId._hex,
                        totalPrice: item.totalPrice
                    }];
                }
                return prevArr;
            });
        }).catch(x => {
            toast.error(x.response.data.error)
        });
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Yukleniyor...</h2>
    </main>
  )
  return (
    <div className="flex justify-center">
      {items.length > 0 ?
        <div className="px-5 container">
            <Row xs={1} md={2} lg={3} className="g-4 py-5">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                    <Card.Img style={{width: '300px', height: '300px', margin: 'auto', paddingTop: '10px'}}
                              variant="top" src={item.image}/>
                  <Card.Body color="secondary">
                      <Card.Text>
                          {arr.some(x => x.id === item.itemId._hex)? "Auction Start Last "+ timeLeft +" second!": "Auction not start. Send offer to start"}
                      </Card.Text>
                    <Card.Text>Name: {item.name}</Card.Text>
                    <Card.Text>
                      Description: {item.description}
                    </Card.Text>
                      <Card.Text>
                       Seller:  {item.seller}
                      </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                        <Card.Text>
                            Starting Price: {ethers.utils.formatEther(item.totalPrice)} ETH
                        </Card.Text>
                        <Card.Text>
                            Last Bid: {item.lastBid} ETH
                        </Card.Text>
                        <Form.Control style={{marginBottom: '10px'}} onChange={(e) => setOfferedPrice(e.target.value)}
                                      size="lg" required type="number" placeholder="Offered Price: "/>
                        <Button onClick={() => sendOffer(item)} variant="primary" size="lg">
                            Send Offer
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>Listelenmiş Ürün Şuanlık Bulunamadı :/ ..</h2>
          </main>
        )}
    </div>
  );
}
export default Home