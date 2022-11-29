import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { subDays, addDays } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import useAxios from "../utils/useAxios";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Example = ({props, datesChangeFunction}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [data, setData] = React.useState([])
  const api = useAxios()
  const [dateRanges,setDateRanges] = useState([])
  const [loaded, setLoaded] = useState(false);
  let krathseis = []

  var disabledDateRanges = [];


  

  const onChange = (dates) => {
    const [start, end] = dates;
    console.log(dates)
    setStartDate(start);
    setEndDate(end);
    datesChangeFunction(start,end);
  };
  useEffect(() => {
    console.log(props.parkingSpot.itemId);
    const fetchData = async () => {
      try {
        
        const response = await api.get("/reservations/"+props.parkingSpot.itemId);
        console.log(response.data.response)
        for(var krathsh in response.data.response){
          if(krathsh in krathseis)
            continue
          
          let krathshObj = {
            start: response.data.response[krathsh].reservationDate,
            end: response.data.response[krathsh].endDate,
            id: response.data.response[krathsh].id
          }
          krathseis.push(krathshObj)
        }
        //console.log("SINOLIKES KRATHSEIS")
        //console.log(krathseis)
        
        disabledDateRanges = krathseis.map(range => ({
          start: new Date(range.start).setHours(0,0,0,0),
          end: new Date(range.end).setHours(0,0,0,0)
        }));
        //console.log("TEST")
        
        setLoaded(true);
        setDateRanges(disabledDateRanges)
      } catch (error) {
        console.log(error)
        //setRes("Something went wrong");
      }
      
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (loaded === false) {
    return loaded;
  } else {
    console.log(dateRanges)
    return (
      <DatePicker
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      excludeDateIntervals={dateRanges}
      selectsRange
      selectsDisabledDaysInRange
      inline 
      withPortal
      minDate={new Date()}
        />
    );
    
      
  }
};

export default Example;