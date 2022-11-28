import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import Example from "../components/Example"
import { Grid } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
/** 
  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    {Array.from(Array(6)).map((_, index) => (
      <Grid item xs={2} sm={4} md={4} key={index}>
        <Item>xs=2</Item>
      </Grid>
    ))}
  </Grid>
*/

function ProtectedPage() {
  const [res, setRes] = useState("");
  const api = useAxios();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([])
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
    console.log(data)
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
    );
  }
  
}

export default ProtectedPage;
