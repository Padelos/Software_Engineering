import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import "../styles/about.css"


export default function About() {
    return (
        <section>
            <div className="about-content">
                <Accordion defaultActiveKey="0" style={{ marginTop: '40px' }}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>What is ParkingApp</Accordion.Header>
                        <Accordion.Body style={{ marginBottom: '10px', textAlign: 'justify' }}>
                            ParkingApp is a revolutionary way of booking long term parking spots for your vehicle! All you have to do is create an account and
                            then you are ready to reserve any spot that is currently available, quick and easy. After the reservation, you may go to your parking 
                            spot within the next hour<sup>*</sup>.
                            <span className='note'>
                                <sup>*</sup>Please ensure that you have received a confirmation message before proceeding to the allocated parking spot.
                            </span>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Why Use ParkingApp</Accordion.Header>
                        <Accordion.Body style={{ marginBottom: '40px', textAlign: 'justify' }}>
                        ParkingApp provides a variety of different options to meet every constumer needs. We offer a variety of services including delivery,
                        carwash, priority access and premium positions, along with our signature services like BatterySaver<sup>TM</sup> and CarServ<sup>TM</sup>.
                        <span className='about-button'>
                            <Button href="/pricing" variant="dark">Learn More</Button>
                        </span>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>What About People with Disabilities</Accordion.Header>
                        <Accordion.Body style={{ textAlign: 'justify' }}>
                        ParkingApp provides special care and offers for People with Disabilities, like priority access and premium positions.
                        If you are a person with disabilities, please contact us with all the required documentation <a href='mailto:pwd@parkingapp.com'>here</a>.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>What is BatterySaver<sup>TM</sup></Accordion.Header>
                        <Accordion.Body style={{ marginBottom: '20px', textAlign: 'justify' }}>
                        Going on a very long trip? Afraid that your car battery will drain by the time you return? We got you covered<sup>*</sup>! Our on-site technitians will
                        make sure that your car battery will be fully charged and ready for departure by the time you return from your trip!
                        <span className='note'>
                                <sup>*</sup>Only available for business<sup>**</sup> spots or better.
                        </span>
                        <br />
                        <span className='note'>
                                <sup>**</sup>Extra cost applies for business spots.
                        </span>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>What is CarServ<sup>TM</sup></Accordion.Header>
                        <Accordion.Body style={{ textAlign: 'justify' }}>
                        Was your car making weird noises or had weird behaviour while you were coming to our parking? Don't worry, our certified technicians<sup>*</sup>
                        got you covered! They will check 35 different car parts and fluids (including engine oil, oil filter, break pads and disks etc.) to make sure your
                        car is as fresh as when you bought it! <b>This service is only available to your PREMIUM customers.</b>
                        <span className='note'>
                                <sup>*</sup>Note that this service does <b>NOT</b> replace a proper vehicle maintenance.
                        </span>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </section>
    )
};