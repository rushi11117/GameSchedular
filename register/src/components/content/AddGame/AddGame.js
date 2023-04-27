import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';

export default function AddGame() {
    const history = useHistory();
    const [from, setFrom] = useState(new Date());
    const [till, setTill] = useState(new Date());
    const [venue, setVenue] = useState("");

    // function appedVal(event) {
    //     const date = new Date(event.target.value);
    //     setFrom(date.toLocaleString());
    //     console.log(from)
    // }

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedData = { from, till, venue};

        fetch('http://localhost:9002/addfreetime', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
            
        })
        .then(res => {
            console.log(res.body);
        })
            // .then((response) => response.json())
            // .then((data) => {
            //     console.log('Data updated successfully:', data);
            //     history.push("/")
            // });
            // // console.log(updatedData)
    };


    return (
        <div className="login">
            <h1>Add Free Time Sloat</h1>
            <DatePicker selected={from} timeInputLabel="Time:" name="from" id="from" className="form-control" onChange={date => setFrom(date|| "")} placeholderText="Free from" dateFormat="dd/MM/yyyy h:mm aa"  />
            <DatePicker selected={till} timeInputLabel="Time:" name="till" id="till" className="form-control" onChange={date => setTill(date|| "")} dateFormat="dd/MM/yyyy h:mm aa"  />
            {/* <input type="text" name="venue" id='venue' className='form-control' onChange={date => setVenue(venue)} placeholder="Venue"></input> */}
            <input type="text" name="venue" id='venue' className='form-control' onChange={(e) => {setVenue(e.target.value)}} placeholder="Venue"></input>
            {/* <input type="datetime-local" value={from.toLocaleString()} onChange={appedVal} ></input>
            <input type="datetime-local"  value={till} onChange={(event) => setTill(event.target.value)} ></input> */}
            <div className="button" onClick={handleSubmit} >Submit</div>
        </div>
    )
}
// onChange={date => setFromDtttm(date || "")}
