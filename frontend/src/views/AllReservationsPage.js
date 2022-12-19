import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import PagedTable from "../components/PagedTable";
import { PencilSquare, PersonFill, PersonPlusFill, Plus, PlusCircleFill, XCircleFill } from "react-bootstrap-icons";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { InfoSquareFill } from "react-bootstrap-icons";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import { PersonFillGear } from "react-bootstrap-icons";
import Form from 'react-bootstrap/Form';
import CustomCard from "../components/CustomCard";
import Example from "../components/Example"
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function AllReservationsPage(){
    const api = useAxios();
    const [loaded, setLoaded] = useState(false)
    const [allData,setAllData]= useState([])
    const [tableData,setTableData] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)}
    const [reservation, setReservation] = useState({});
    const [parkingSpots, setParkingSpots] = useState([]);
    const [itemId, setitemId] = useState("1")
    const [start_date, set_start_date] = useState(new Date());
    const [end_date, set_end_date] = useState(new Date());
    const [buttonDisabled, setButtonDisabled] = useState(true);
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
    const handleSelect=(e)=>{
        setitemId( e)
    }
    const handleModify = () => {
        console.log(reservation)
        console.log("PARKING SPOT " + String(itemId));
        const sendData = async () => {
            var obj = {
              reservationId: reservation.id,
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
              const response = await api.patch("/admin/reservations/modify",obj);
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
    useEffect( () => {

        const fetchReservations = async () => {
            const response = await api.get("/allreservations");
            const data = response.data.response.map(
                o => {return {id:o.id,
                    startDate:o.reservationDate,
                    endDate:o.endDate,
                    parkingitemId:o.parkingSpot.id,
                    parkingSpotType:o.parkingSpot.parkingSpotType,
                    username:o.user.username,
                    action:
                    <div>
                        <OverlayTrigger
                        key={String(o.id)+"-Modify"}
                        placement="top"
                        overlay={
                        <Tooltip id={`tooltip-`+String(o.id)+"-Modify"}>
                        Modify
                        </Tooltip>
                            }>
                            <a className="link-success" style={{cursor:"pointer"}} onClick={()=>{setReservation(o);handleShow()}}><PencilSquare size={20} color="green"/> </a>
                        </OverlayTrigger>
                        
                        </div>
                }}
            )
            setTableData(data)
            setAllData(response.data.response)
        };

        const fetchParkingSpots = async () => {
            const res2 = await api.get("/spots");
            setParkingSpots(res2.data.response);
        }
        
        fetchParkingSpots();
        fetchReservations();
        setLoaded(true)

    },[])
    if(loaded === false){
        return false
    }
    else{
        console.log(allData)
        //console.log(tableData)
        //console.log(parkingSpots)
        return(
            <section>
                All Reservations
                {tableData.length > 0 && <PagedTable data={tableData} sliceSize={15} columns={["Reservation ID","Start Date","End Date","Parking Spot ID",'Parking Spot Type',"Username","Action"]}></PagedTable>}
            
            
            
        <Modal show={show} size="lg" onHide={handleClose} animation={false} >
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
            <Col><Button variant="danger" onClick={handleDelete} lg="2">
            Delete
            </Button>
            </Col>
                <Col  md="auto">
          <Button style={{marginLeft:10}} disabled={buttonDisabled}  onClick={handleModify} variant="primary" >
            Modify
          </Button>
          </Col>
          

            </Row>
           </Container>
          
        </Modal.Footer>
      </Modal>
            
            
            
            
            </section>
        )
        
    }
   
}