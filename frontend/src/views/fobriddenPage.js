import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForbiddenPage() {
    const [counter, setCounter] = useState(5);
    let navigate = useNavigate();

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        if(counter===0){
            navigate("/");
        }
      }, [counter]);

    return(
        <div>
            <h1>Access denied</h1>
            <h2>Redirecting in {counter}..</h2>
        </div>
        
    )

}