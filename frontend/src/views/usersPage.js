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
import { CheckSquare, XSquare } from "react-bootstrap-icons";
export default function UsersPage(){
    const api = useAxios();
    const [loaded, setLoaded] = useState(false)
    const [usersArray, setusersArray] = useState([])
    let { user } = useContext(AuthContext);

    const [selectedUser, setselectedUser] = useState({})
    //console.log(user)
    const [show, setShow] = useState(false);
    const [addGroupShow, setaddGroupShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleGroupClose = () => setaddGroupShow(false);
    const handleGroupShow = () => setaddGroupShow(true);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    

    const handleUserSuspend = ()=>{
      var obj = {
        userId : selectedUser.id
      }
      //console.log(selectedUser)
      const suspendUser = async () =>{
        try{
            const response = await api.patch("admin/user/suspend",obj);
            if(response.status === 200 ){
              window.location.reload();
            }
        }catch(error){
          console.log(error)
        }
      }
      suspendUser();
    }


    const handleGroupRemoval = (gid)=>
    {
      //console.log("REMOVING GROUP " + String(gid) + " FROM USER "+ selectedUser.username)
      var obj = {
        userId: selectedUser.id,
        groupId: gid
      }

      const removeRequest = async () =>{
        try{
            const response = await api.patch("/groups/remove",obj);
            if(response.status === 200 ){
              window.location.reload();
            }
        }catch(error){
          console.log(error)
        }
      }
      removeRequest()
    }
    Array.prototype.diff = function(a) {
      return this.filter(object1 => {return !a.some(object2 => {return object1.id === object2.id})});
    };

    const [selectedGroups, setSelectedGroups] = useState([])
    const [allGroups, setAllGroups] = useState([])
    
    const appendToArray = (element) => {
      if(!selectedGroups.includes(element))
        setSelectedGroups(current => [...current,element]);
      else{
        if(element.checked === false){
          setSelectedGroups(current => current.filter(option=>{
            return option.id !== element.id
          }))
        }        
        
      }
    }
    
    const handleGroupModify = () => {
      //console.log(selectedGroups)
      let obj = {
        userId:String(selectedUser.id),
        groupIds:[]
      };
      for(let i in selectedGroups){
        var item = selectedGroups[i]; 
        var itemId = String(item['id'])
        if(itemId.includes("switch")){
          var itemValue = String(item['value'])
          obj.groupIds.push({"id":itemValue})
        }
      }
      const changeGroup = async () =>{
        try{
          //console.log(JSON.stringify(obj))
          const response = await api.patch("/groups/add",JSON.stringify(obj));
          if(response.status === 200 ){
            window.location.reload();
          }
        }
        catch(err){
          console.log(err)
        }
      }

      changeGroup();
      //console.log(obj)
    }

    useEffect(()=>{


        const fetchUsers = async () => {
            try {
              const response = await api.get("/users");
              //console.log(response.data.response)
              const result = response.data.response.map( o => { return { id:o.id,username: o.username, first_name: o.first_name, last_name:o.last_name, 
              
                isActive:
                  <div>
                    {o.is_active ? <>
                      <Form.Check 
                      disabled
                      defaultChecked={true}
                      type={"checkbox"}
                      id={`default-"checkbox"`}
                      style={{color:"blue"}}
                      />
                  
                    </>: <>
                    <Form.Check 
                      disabled
                      type={"checkbox"}
                      id={`default-"checkbox"`}
                      />
                    </>}
                  </div>,
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
                    <a className="link-success" style={{cursor:"pointer"}} onClick={()=>{setselectedUser(o);handleShow()}}><PencilSquare size={20} color="black"/> </a>
                </OverlayTrigger>
                
                </div>
                
            } });
              setusersArray(result)
            } catch(error){
              console.log(error)
            }
          };
          fetchUsers();

        const fetchGroups = async () => {
            try{
              const response = await api.get("/groups");
              setAllGroups(response.data.response);
            }
            catch(error){
              console.log(error)
            }
        }
        fetchGroups();
        setLoaded(true)
    },[])

    if(loaded===false){
        return false;
    }
    else{
        return (
          <section style={{height:"100vh"}}>

        {usersArray.length > 0 && <PagedTable data={usersArray} sliceSize={15} columns={["ID","Username","First Name","Last Name","Is Active",'Action']}></PagedTable>}
        
        
        
        <Modal show={show} onHide={handleClose} animation={true}   size="lg">
        <Modal.Header>Modifying User {selectedUser.username} (UserID :  {selectedUser.id} )</Modal.Header>
        <Modal.Body>
          {selectedUser ? (<>
            <Container>
              <Row>
                <Col>
                  <b className="mr-5">User Information</b>
                </Col>
                <Col>
                {selectedUser.is_superuser ? (<>
              <OverlayTrigger
             
                key={String(selectedUser.id)+"-staff_status"}
                placement="top"
                overlay={
                <Tooltip id={`tooltip-`+String(selectedUser.id)+"-staff_status"}>
                Superuser
                </Tooltip>
                    }>
                    <a  ><PersonFillGear size={20} color="black"/> </a>
                </OverlayTrigger>
            </>):
            (<>
                <OverlayTrigger
                key={String(selectedUser.id)+"-staff_status"}
                placement="top"
                overlay={
                <Tooltip id={`tooltip-`+String(selectedUser.id)+"-staff_status"}>
                Member
                </Tooltip>
                    }>
                    <a  ><PersonFill size={20} color="black" /> </a>
                </OverlayTrigger>
             
            </>)}
                </Col>
                <Col>
                </Col>
                <Col>
                </Col>
              </Row>
              <hr></hr>
              <Row>
              <Col>
                <b>User ID</b>
                </Col>
                <Col>
                {selectedUser.id}
                </Col>
                
                <Col>
                <b>Username</b>
                </Col>
                <Col>{selectedUser.username}
                </Col>
                
              </Row>

              <Row className="mt-2">
                <Col>
              <b>First Name</b>
                </Col>
                <Col>
                {selectedUser.first_name}
                </Col>
              
                <Col>
                <b>Last Name</b>
                </Col>
                <Col> {selectedUser.last_name}
                </Col>

              </Row>
              <Row className="mt-2">
                <Col>
                <b>Email</b>
                </Col>
                <Col>
                {selectedUser.email}
                </Col>
                <Col >
                <b>Is Active</b>
                </Col>
                <Col>
                {selectedUser.is_active ? <><CheckSquare color="green" size={20}/></> : <><XSquare color="red" size={20}/></>}
                </Col>
              </Row>
              <hr/>
              <b>User Groups 

                {selectedUser.is_superuser ? <>
                
                  <a > <PlusCircleFill size={20} color="gray"></PlusCircleFill> </a>
                
                </> : 
              
                <><a style={{cursor:"pointer"}} onClick={handleGroupShow}> <PlusCircleFill size={20} color="green"></PlusCircleFill> </a></>}

              </b>
              <Row className="mt-2">
              {selectedUser.groups ?(<>
                {selectedUser.groups.length > 0 ? (<>
                <Col>
                  <ListGroup key="usergroups">
                {//let result = objArray.map(a => a.foo);
                  Array.from(selectedUser.groups).map((group,index)=>{
                    return <ListGroup.Item  key={index}> <Row> <Col><b>{group.name}</b> </Col> <Col><Dropdown>
                    <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                      <b>Group Permissions</b>
                    </Dropdown.Toggle>
              
                    <Dropdown.Menu>
                      {Array.from(group.permissions).map((permission,index)=>{
                        return <Dropdown.Item style={{ pointerEvents: 'none' }} key={String(group)+""+index}><b>{permission.content_type.app_label} </b>| {permission.content_type.name}  | {permission.name}</Dropdown.Item>
                      })}
                    </Dropdown.Menu>
                  </Dropdown></Col><Col className="col-1"> 
                  {selectedUser.is_superuser ? <>
                    <a disabled><XCircleFill size={20} color="gray" md="auto"></XCircleFill></a>
                  </>:<>
                  <a style={{cursor:"pointer"}}  onClick={() => {handleGroupRemoval(group.id)}}><XCircleFill size={20} color="red" md="auto"></XCircleFill></a>
                  </>}
                  
                  </Col></Row></ListGroup.Item>
                  })
                  
                }
                </ListGroup>

                </Col>
                
                </>):

                (<>
                  <Col>No User Groups</Col>
                </>)}

                
                
              </>)
              :(<>
                
              </>)}
              </Row>

              <hr/>
              <Row className="mt-2">
                {selectedUser.user_permissions ? (<>
                  {selectedUser.user_permissions.length > 0 ? (<>
                   <Col>

                   <Dropdown>
                    <Dropdown.Toggle style={{backgroundColor:"white", color:"black",borderColor:"white",fontWeight: 'bold'}}variant="secondary" id="dropdown-basic">
                      User Permissions
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {Array.from(selectedUser.user_permissions).map((permission,index)=>{
                        return <Dropdown.Item style={{ pointerEvents: 'none' }} key={String(index)}><b>{permission.content_type.app_label} </b>| {permission.content_type.name}  | {permission.name}</Dropdown.Item>
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                  
                  
                
             
                </Col>
                </>):

                (<>
                  <b>User Permissions</b>
                  <Col className="mt-2">No User Permissions</Col>
                </>)}
                
                </>):

                (<>
                

                </>)}
              </Row>
          </Container>
          
          </>):(<></>)}
           
        </Modal.Body>
        <Modal.Footer>
            
           <Container>
            <Row>
            <Col>
            
            <Button variant="danger" disabled={selectedUser.is_superuser | !selectedUser.is_active} lg="2" onClick={handleUserSuspend} >
            Suspend
            </Button>
            
            </Col>
                <Col  md="auto"><Button variant="secondary"  onClick={handleClose}>
            Cancel
          </Button>
          
          </Col>
          

            </Row>
           </Container>
          
        </Modal.Footer>
        </Modal>

        
        
        
        {
        // MODAL BELOW IS USED TO ADD GROUPS TO A SPECIFIED USER, CAN ONLY BE TRIGGERED BY PRESSING THE "+" ICON ON THE ABOVE MODAL
        }
        <Modal show={addGroupShow} onHide={handleGroupClose} animation={true} size="lg">
              <Modal.Header>Adding Group to {selectedUser.username}</Modal.Header>
              <Modal.Body>
                  {selectedUser.groups ? (<>
                  <Container>
                    <Row>
                      <Col>
                        <ListGroup>
                          {allGroups.diff(selectedUser.groups).map((x,index)=>{
                            return <ListGroup.Item key={index}>

                              <Container>
                                <Row>
                                  <Col>{x.name} </Col>
                                  <Col>
                                  <Form>
                                  <Form.Group controlId="username" className="mb-3" > 
                                  <Form.Check 
                                      value={x.id}
                                      type="switch"
                                      id={"switch"+String(index)}
                                      label="Check"
                                      onChange= {(e) => {appendToArray(e.target)}}
                                    />
                                  </Form.Group>
                                  </Form>
                                  </Col>
                                </Row>
                              </Container>
                            </ListGroup.Item>
                          })}
                        </ListGroup>
                      </Col>
                    </Row>
                  </Container>
                  
                  
                  </>
                  
                  ):(<></>)}



              </Modal.Body>
              <Modal.Footer>
              <Container>
            <Row>
            <Col>
            
            <Button variant="secondary"  onClick={handleGroupClose}>
            Cancel
          </Button>
            
            </Col>
                <Col  md="auto">
          <Button style={{marginLeft:10}} disabled={selectedUser.is_superuser}  onClick={handleGroupModify} variant="primary" >
            Submit
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