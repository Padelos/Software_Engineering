import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import Example from "../components/Example"
import { Grid } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';



function ProtectedPage() {
  const [res, setRes] = useState("");
  const api = useAxios();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([])


  const [itemId, setItemId] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [start_date, set_start_date] = useState(new Date());
  const [end_date, set_end_date] = useState(new Date());
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const changeDates = (start,end) =>{
    set_start_date(start);
    set_end_date(end);

    console.log("DATES ARE");
    console.log(start);
    console.log(end);
    if(start != null && end != null){
      setButtonDisabled(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/test/");
        setRes(response.data.response);
        const res2 = await api.get("/spots/")
        
        setLoaded(true)
        setData(res2.data.response)
      } catch {
        setRes("Something went wrong");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if(loaded === false){
    return loaded;
  }
  else{
    //console.log(data)
    return (
      <div>
        <h1>Projected Page</h1>
        <p>{res}</p>
        <p>Example calendar for parking spot 1</p>
        
      

        Available Parking Spots<br></br>
        <Table striped borderless hover >
        <thead>
          <tr className="align-me">
            <th>Parking Spot</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {Array.from(data).map((itm, index) => (
          <tr key={index}>
            <td>ParkingSpot {itm.id}</td>
            <td>{itm.parkingSpotType}</td>
             <td><Button variant="secondary" className="mr-2" onClick={() =>{ setItemId(itm.id);handleShow()}}> Check Availability </Button></td>
          </tr>
          ))}
        </tbody>
      </Table>
         <Modal show={show} onHide={handleClose} animation={false} >
        <Modal.Header>Booking for Parking Spot {itemId}</Modal.Header>
        <Modal.Body style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Example  props={{ 
          parkingSpot: {itemId}
        }} datesChangeFunction={changeDates}></Example>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={buttonDisabled}  variant="primary" onClick={handleClose}>
            Book
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
  
}
//Mporoume na ta valoume se modal

/**
return (
      <div>
        <h1>Projected Page</h1>
        <p>{res}</p>
        <p>Example calendar for parking spot 1</p>
        <Example></Example>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(data).map((itm, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item> Parking Spot {itm.id} </Item>
          </Grid>
        ))}
      </Grid>
      </div>
      <ButtonGroup aria-label="Basic example">
        {Array.from(data).map((itm, index) => (
          
            <Button key={index}  variant="secondary" className="mr-2"> Parking Spot {itm.id} </Button>
          
        ))}
      </ButtonGroup>
    );
 */
export default ProtectedPage;
