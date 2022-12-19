import { useContext,useEffect, useState  } from "react";

import useAxios from "../utils/useAxios";
import Container from 'react-bootstrap/Container';

import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import Table from 'react-bootstrap/Table';
import { PencilSquare } from "react-bootstrap-icons";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { XCircleFill } from "react-bootstrap-icons";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CheckCircleFill } from "react-bootstrap-icons";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Example from "../components/Example"
import { useNavigate } from "react-router-dom";

import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

const MyReservations = () => {
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const [data, setData] = useState([]);
  const [expiredData, setExpiredData] = useState([])
  const [loaded, setLoaded] = useState(false);

  let navigate = useNavigate();
  const [reservation, setReservation] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [start_date, set_start_date] = useState(new Date());
  const [end_date, set_end_date] = useState(new Date());
  const [parkingSpots, setParkingSpots] = useState([]);


  const [pageIndex, setpageIndex] = useState(0)
  const [allPages, setallPages] = useState(1)

  const [itemId, setitemId] = useState("1")
  
  const sliceArray = (inputArray,perChunk) =>{
    return inputArray.reduce((resultArray, item, index) => { 
      const chunkIndex = Math.floor(index/perChunk)
    
      if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }
    
      resultArray[chunkIndex].push(item)
    
      return resultArray
    }, [])
  }

  const changeDates = (start,end) =>{
    set_start_date(start);
    set_end_date(end);
    if(start != null && end != null){
      setButtonDisabled(false)
    }
  }

  const handleDelete= () =>{
    //reservations/delete/<id>
    console.log(reservation)
    const sendData = async () => {
        try{
            let str = "/reservations/delete/"+String(reservation.id);
          const response = await api.delete(str);
          if(response.status === 200 ){
            window.location.reload();
          }
        }
        catch(err){
          console.log(err)
        }
        
      }
      sendData();
  }
  const handlePageIncrease = () =>{
    if(pageIndex === allPages -1){
      return;
    }
    
    setpageIndex(pageIndex + 1)
  }
  const handlePageDecrease = () =>{
    if(pageIndex == 0)
      return
    setpageIndex(pageIndex - 1)
  }
  const handleSelect=(e)=>{

    
    setitemId( e)

  }
  const handleModify = () => {
    console.log(reservation)
    console.log("PARKING SPOT " + String(itemId));
    const sendData = async () => {
        var obj = {
          id: reservation.id,
          parkingSpot:itemId,
          startDate: start_date.toLocaleDateString("en-GB", { // you can use undefined as first argument
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          endDate: end_date.toLocaleDateString("en-GB", { // you can use undefined as first argument
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        }
        try{
          const response = await api.patch("/reservations/modify",obj);
          if(response.status === 200 ){
            window.location.reload();
          }
        }
        catch(err){
          console.log(err)
        }
        
      }
      sendData();
  }
    
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await api.get("/reservations/");
        
        var date = new Date();

        var dat = response.data.response.map((item)=>{
          var date2 = new Date(item.endDate);
          
          var temp = Object.assign({}, item);
          if( date2 < date){
            temp.expired = true;
          }
          else{
            temp.expired = false;
          }
          return temp;
        });
        
        dat.sort(function(x,y){
          return x.expired - y.expired
        })
        
        /*
        var expired = response.data.response.filter((item)=>{
            var date2 = new Date(item.endDate);
            item.expired = true;
            return date2 < date
        });
        var nonExpired = response.data.response.filter((item)=>{
            var date2 = new Date(item.endDate);
            item.expired = false;
            return date2 > date
        })*/

        const res2 = await api.get("/spots");
        setParkingSpots(res2.data.response);
        
        setData(sliceArray(dat,3))
        setLoaded(true)
        setallPages(sliceArray(dat,3).length)
        //setslicedNonExpired()
      } catch(error){
        console.log(error)
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if(loaded === false){
    return loaded;
  }else{
    //console.log(parkingSpots)
    //console.log(data)
    //console.log(sliceArray(data,2))
    //console.log(pageIndex)
    //console.log(slicedNonExpired)
    //console.log("EXPIRED")
    //console.log(expiredData)
    
    return (
        
        <section>
        {user && <UserInfo user={user} /> }
        
        <h1>You are on home page!</h1>
        {data.length > 0 ? (<>
        
          <Button style={{borderRadius: "0px", background:"white",borderColor:"black", marginRight:"5px"}} onClick={handlePageIncrease} className=" float-sm-end "><ArrowRight color="black"></ArrowRight></Button>
        <Button style={{borderRadius: "0px", background:"white",borderColor:"black", marginRight:"5px"}} onClick={handlePageDecrease} className=" float-sm-end "><ArrowLeft color="black"></ArrowLeft></Button>
        
        <div style={{marginRight:"5px"}}className="float-sm-end ">
        <p>Showing page {pageIndex + 1} out of {allPages}</p>
        </div>
        <Table bordered >
        <thead>
          <tr align="center">
            <th >Reservation ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Parking Spot</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {Array.from(data[pageIndex]).map((itm, index) => (
          <tr key={index}>
            {itm.expired ? (<>
              <td align="center" className="text-secondary">Reservation {itm.id}</td>
              <td align="center" className="text-secondary">{itm.reservationDate}</td>
              <td align="center" className="text-secondary"> {itm.endDate}</td>
              <td align="center" className="text-secondary">Parking Spot {itm.parkingSpot.id}</td>
              <td align="center" className="text-secondary">
                <OverlayTrigger
                    key="top3"
                    placement="top"
                    overlay={
                    <Tooltip id={`tooltip-top3`}>
                    Fulfilled
                    </Tooltip>
                    }>
                <CheckCircleFill size={20} color="green"/>
                </OverlayTrigger>
            </td>
            
            </>):
            
            <>
            <td align="center">Reservation {itm.id}</td>
            <td align="center">{itm.reservationDate}</td>
            <td align="center"> {itm.endDate}</td>
            <td align="center">Parking Spot {itm.parkingSpot.id}</td>
            <td align="center">
                    <OverlayTrigger
                        key="top1"
                        placement="top"
                        overlay={
                        <Tooltip id={`tooltip-top1`}>
                        Modify
                        </Tooltip>
                        }>
                        <a className="link-success" onClick={() =>{ setReservation(itm);handleShow()}}><PencilSquare size={20}/> </a>
                    </OverlayTrigger>

            </td>
            
            </>}
            
          </tr>
          ))}
        
        </tbody>
      </Table>

        </>) : (<>
        No reservations present!
        </>)}
        


      <Modal show={show} onHide={handleClose} animation={false} >
        <Modal.Header>Modify Reservation {reservation.id}</Modal.Header>
        <Modal.Body>
        <Container>
            <Row>
                <Col sm={4}>Parking Spot</Col>
                <Col  sm={8}>
                    <DropdownButton id="dropdown-basic-button" title={"Parking Spot " + String(itemId)} onSelect={handleSelect}>
                    {
                        parkingSpots.map( (parkingSpot ) => (
                            
                            <Dropdown.Item eventKey={parkingSpot.id} key={parkingSpot.id}>Parking Spot {parkingSpot.id} ({parkingSpot.parkingSpotType})</Dropdown.Item>
                        ) )
                    }
                    </DropdownButton></Col>
            </Row>
            <Row className=" justify-content-center">
           
            <Col className="d-flex">Select Date</Col>
          
            </Row>
            <Row >
                <Col sm={8}>
                <Example key={itemId} props={{ 
            parkingSpot: {itemId}
            }} datesChangeFunction={changeDates}></Example></Col>
            </Row>
        </Container>
           
        </Modal.Body>
        <Modal.Footer>
            
           <Container>
            <Row>
            <Col><Button variant="danger" lg="2" onClick={handleDelete}>
            Delete
            </Button>
            </Col>
                <Col  md="auto"><Button variant="secondary"  onClick={handleClose}>
            Cancel
          </Button>
          <Button style={{marginLeft:10}} disabled={buttonDisabled}  variant="primary" onClick={handleModify}>
            Modify
          </Button>
          </Col>
          

            </Row>
           </Container>
          
        </Modal.Footer>
      </Modal>
      </section>
        
      );
  }
 
};

export default MyReservations;