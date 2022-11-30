import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "../styles/pricing.css"
import eco from "../images/eco.svg"
import bus from "../images/bus.svg"
import prem from "../images/prem.svg"

export default function Pricing() {
    return (
        <div className="pricing-content">
            <Card style={{ width: '18rem', alignItems: 'center', display: 'inline-block', marginLeft: '10px', marginRight: '10px' }}>
                <Card.Img variant="top" src={eco}/>
                <Card.Body>
                    <Card.Title style={{ textAlign: 'center' }}>Economy Spot</Card.Title>
                    <Card.Text style={{ textAlign: 'justify' }}>
                        <ListGroup>
                            <ListGroup.Item variant="success">
                                Affordable
                            </ListGroup.Item>
                            <ListGroup.Item variant="success">
                                Spacious
                            </ListGroup.Item>
                            <ListGroup.Item variant="success">
                                Elevator Access
                            </ListGroup.Item>
                            <ListGroup.Item variant="warning">
                                Option for Carwash
                            </ListGroup.Item>
                            <ListGroup.Item variant="danger">
                                Usually at Lower Levels
                            </ListGroup.Item>
                            <ListGroup.Item variant="danger">
                                Extra Cost for Carwash
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem', alignItems: 'center', display: 'inline-block', marginLeft: '10px', marginRight: '10px' }}>
                <Card.Img variant="top" src={bus}/>
                <Card.Body>
                    <Card.Title style={{ textAlign: 'center' }}>Business Spot</Card.Title>
                    <Card.Text style={{ textAlign: 'justify' }}>
                        <ListGroup>
                            <ListGroup.Item variant="success">
                                Priority Access
                            </ListGroup.Item>
                            <ListGroup.Item variant="success">
                                Free Carwash
                            </ListGroup.Item>
                            <ListGroup.Item variant="success">
                                More Spacious
                            </ListGroup.Item>
                            <ListGroup.Item variant="warning">
                                Option for Delivery
                            </ListGroup.Item>
                            <ListGroup.Item variant="warning">
                                Option for BatterySaver<sup>TM</sup>
                            </ListGroup.Item>
                            <ListGroup.Item variant="danger">
                                Extra Cost for Services
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem', alignItems: 'center', display: 'inline-block', marginLeft: '10px', marginRight: '10px' }}>
                <Card.Img variant="top" src={prem}/>
                <Card.Body>
                    <Card.Title style={{ textAlign: 'center' }}>Premium Spot</Card.Title>
                    <Card.Text style={{ textAlign: 'justify' }}>
                        <ListGroup>
                            <ListGroup.Item variant="success">
                                Personal Garage
                            </ListGroup.Item>
                            <ListGroup.Item variant="success">
                                Personal Valet
                            </ListGroup.Item>
                            <ListGroup.Item variant="success">
                                Carwash and Detailing
                            </ListGroup.Item>
                            <ListGroup.Item variant="success">
                                BatterySaver<sup>TM</sup>
                            </ListGroup.Item>
                            <ListGroup.Item variant="success">
                                CarServ<sup>TM</sup>
                            </ListGroup.Item>
                            <ListGroup.Item variant="danger">
                                Not Really Affordable
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
};