import axios from 'axios';
import {useState} from 'react'
import {ethers} from "ethers"
import {Button, Form, Row, Spinner} from 'react-bootstrap'
import {useNavigate} from "react-router";
import {toast} from "react-toastify";

const Create = ({ marketplace, nft }) => {
  const [fileImg, setFile] = useState(null);
  const [name, setName] = useState("")
  const [desc, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [urlList, setUrlList] = useState(JSON.parse(localStorage.getItem("urlList")) || []);
  const navigate = useNavigate()

  const [loading,setLoading] = useState(false)

  const sendJSONtoIPFS = async (ImgHash) => {
    try {
      const resJSON = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
        data: {
          "name": name,
          "description": desc,
          "image": ImgHash
        },
        headers: {
          'pinata_api_key': '228b62e45e4ea28d2ab1',
          'pinata_secret_api_key': '4aa2e322c7071b391cb28dffe648bcd15e28849605680077f6c6a4a654100d9f',
        },
      });
      const tokenURI = `https://gateway.pinata.cloud/ipfs/${resJSON.data.IpfsHash}`;
      if (urlList.includes(resJSON.data.IpfsHash.image)) {
        console.log("this was used once again")
        toast.error("this was used once again")
        return;
      }
      setUrlList([...urlList, resJSON.data.IpfsHash.image])
      localStorage.setItem("urlList", JSON.stringify(urlList))
      console.log(urlList)
      console.log("Token URI", tokenURI);
      mintThenList(tokenURI, ImgHash)
    } catch (error) {
      console.log("JSON to IPFS: ")
     toast.error("error JSON to IPFS ")
    }
  }
  const sendFileToIPFS = async (e) => {
    setLoading(true)
    e.preventDefault();

    if (fileImg) {
      try {
        const formData = new FormData();
        formData.append("file", fileImg);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            'pinata_api_key': '228b62e45e4ea28d2ab1',
            'pinata_secret_api_key': '4aa2e322c7071b391cb28dffe648bcd15e28849605680077f6c6a4a654100d9f',
            "Content-Type": "multipart/form-data"
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

        console.log(ImgHash)
        sendJSONtoIPFS(ImgHash)
      } catch (error) {
        console.log("File to IPFS: ")
        toast.error("Error file to IPFS")
      }
    }
  }

  const mintThenList = async (uri, ImgHash) => {
    await (await nft.mint(uri)).wait()
    const id = await nft.tokenCount()
    await (await nft.setApprovalForAll(marketplace.address, true)).wait()
    const listingPrice = ethers.utils.parseEther(price.toString())
    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait()
    await axios({
      method: "post",
      url: "http://localhost:8080/v1/products",
      data: {
        "id": id._hex,
        "name": name,
        "description": desc,
        "price": price,
        "image": ImgHash,
        "nft": nft.address,
      }
    }).then(x => {
      navigate('/');
    });
    setLoading(false)
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control onChange={(e) => setFile(e.target.files[0])} size="lg" required type="file" name="dosya" />
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Adı" />
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Aciklama" />
              <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="ETH fiyatı" />
              <div className="d-grid px-0">
                <Button style={{marginBottom:'15px'}} onClick={sendFileToIPFS} variant="primary" size="lg">
                  NFT URET 
                </Button>
                {loading&&
                    <Spinner style={{margin:'auto'}} animation="border" />
                }
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Create