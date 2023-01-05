import { useContext,useEffect, useState  } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const PagedTable = (props) =>{

    const [pageIndex, setpageIndex] = useState(0)
    const [allPages, setallPages] = useState(1)
    const [mounted, setMounted ] = useState(false)
    const [tableData, settableData] = useState([])
    const [displayedData,setDisplayedData] = useState([])
    const [sliced, setSliced] = useState([])
    const handlePageIncrease = () =>{
        if(pageIndex === allPages -1){
          return;
        }
        const index = pageIndex + 1
        setDisplayedData(sliced[index])
        setpageIndex(pageIndex + 1)
      }
      const handlePageDecrease = () =>{
        if(pageIndex == 0)
          return
        const index = pageIndex - 1
       setDisplayedData(sliced[index])
        setpageIndex(pageIndex - 1)
    }

    const  sliceArray =  (inputArray,perChunk) =>{
        return inputArray.reduce((resultArray, item, index) => { 
          const chunkIndex = Math.floor(index/perChunk)
        
          if(!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
          }
        
          resultArray[chunkIndex].push(item)
        
          return resultArray
        }, [])
    }

    

    const handleTextChange = (e) =>{
        if (e.target.value === ""){
            let index = 0;
            setDisplayedData(sliced[index])
            setpageIndex(index)
        }
        else{
            
            const dat = tableData.filter((item)=>{
                return item.username.includes(e.target.value)
            })
            console.log(dat)
            setDisplayedData(dat)
            setpageIndex(0)
        }
    }
    useEffect( ()=>{
        //We want to keep all data and sliced data
        const slicedData = sliceArray(props.data, props.sliceSize)
        settableData(props.data)
        setDisplayedData(slicedData[pageIndex])
        setallPages(slicedData.length)
        setSliced(slicedData);
        setMounted(true)
    },[])
    if(mounted === false){
        return false;
    }
    else{
        
        return (
            <div className="mt-2">
                <Container>
                    <Row>
                        <Col>
                        <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                                <Form.Control
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={handleTextChange}
                                />
                            </InputGroup>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                        <Col className="md-auto">
                            <Button style={{borderRadius: "0px", background:"white",borderColor:"black", marginRight:"5px"}} onClick={handlePageIncrease} className=" float-sm-end "><ArrowRight color="black"></ArrowRight></Button>
                            <Button style={{borderRadius: "0px", background:"white",borderColor:"black", marginRight:"5px"}} onClick={handlePageDecrease} className=" float-sm-end "><ArrowLeft color="black"></ArrowLeft></Button>
                            <div style={{marginRight:"5px"}}className="float-sm-end text-center">
                                <p>Showing page {pageIndex + 1} out of {allPages}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                
                
                <Table bordered >
                <thead>
                    <tr align="center" key="cols">
                    {Array.from(props.columns).map((itm,index)=>(
                        <th key={index}>{itm}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                {Array.from(displayedData).map((item, idx) => (
                    <tr key={idx} id={item.id}>
                       {Object.keys(item).map(function(key,index){
                            return <td align="center" key={String(item.id)+String(index)}>{item[key]}</td>
                       })}
                    </tr>
                ))}
                </tbody>
                </Table>
            </div>
        )
    }

}

export default PagedTable;