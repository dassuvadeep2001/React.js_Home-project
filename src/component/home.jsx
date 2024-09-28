import React, { useEffect, useState } from 'react'
import { base_url_fake, end_points } from '../api_url/api';
import axios from 'axios';
import { Table, Modal, Button } from 'react-bootstrap';
import "./home.css"
import { Link } from 'react-router-dom';

function Home() {
    let api=base_url_fake + end_points.category;
    console.log(api);
    let [state, setState] = useState([]);
    const [searchCoin, setSearchCoin] = useState("");
    const [showModal, setShowModal] = useState(false); // Manage modal visibility
  const [selectedCoin, setSelectedCoin] = useState(null); // Store selected coin details

    const getProduct = () => {
        axios.get(api)
           .then((res) => {
            console.log(res.data.data);
            setState(res.data.data);
          })
          .catch((err) => {
            console.log("Axios Err", err);
          });
        }
        useEffect(()=>{
            getProduct();
        },[setState, api])

const handleSearchChange = (e) => {
 setSearchCoin(e.target.value); 
};
const filteredCoin = state.filter((itm) => {
    if (searchCoin === "") {
      return itm; 
    } else if (itm.name.toLowerCase().includes(searchCoin.toLowerCase())) {
      return itm; 
    }
    return null;
  });
  const refresh=()=>{
    window.location.reload();
  }
  const handleShowDetails = (coin) => {
    setSelectedCoin(coin); // Set the clicked coin details
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };       
  return (
    <div className='section'>

        <div className="search-input-wrapper">
        <input
          type="text"
          id="search"
          placeholder="Search Coins"
          value={searchCoin}
          onChange={handleSearchChange}
        />
        <button className='refreshbtn' onClick={refresh}>Refresh</button>
        </div>
        <Table striped bordered hover className='table'>
      <thead>
        <tr> 
          <th className='bg-dark-subtle'>Rank</th>
          <th className='bg-dark-subtle'>Name</th>
          <th className='bg-dark-subtle'>Symbol</th>
          <th className='bg-dark-subtle'>See Details</th>
        </tr>
      </thead>
      {
        filteredCoin.map((coin)=>(
            <tbody>
        <tr>
          <td>{coin.rank}</td>
          <td>{coin.name}</td>
          <td>{coin.symbol}</td>
          <td> <button 
                  className='details mx-auto d-flex justify-content-center' 
                  onClick={() => handleShowDetails(coin)} // Show modal on click
                  >
                  See Details
                </button></td>
        </tr>
      </tbody>
        ))
      }
    </Table>
    {selectedCoin && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCoin.name} Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Rank:</strong> {selectedCoin.rank}</p>
            <p><strong>Symbol:</strong> {selectedCoin.symbol}</p>
            <p>Some extra details about {selectedCoin.name}...</p>
            <p><strong>Supply:</strong> {selectedCoin.supply}</p>
            <p><strong>Max-Supply:</strong> {selectedCoin.maxSupply}</p>
            <p><strong>Market-Cap-USD:</strong> {selectedCoin.marketCapUsd}</p>
            <p><strong>Volume-USD-24Hr:</strong> {selectedCoin.volumeUsd24Hr}</p>
            <p><strong>Price-USD:</strong> {selectedCoin.priceUsd}</p>
            <p><strong>Change-Percent-24Hr:</strong> {selectedCoin.changePercent24Hr}</p>
            <p><strong>Vwap-24Hr:</strong> {selectedCoin.vwap24Hr}</p>
            <p><strong>Explorer:</strong> {selectedCoin.explorer}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  )
}

export default Home