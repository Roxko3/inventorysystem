import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login(){
    return( 
            <Row className="justify-content-center">
                <Col md={5} sm={5} xs={8}>
                <h1>Belépés</h1>
                <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email cím</Form.Label>
                    <Form.Control type="email" placeholder="Email cím" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Jelszó</Form.Label>
                    <Form.Control type="password" placeholder="Jelszó" />
                </Form.Group>
                </Form>
                <Button variant="primary">Belépés</Button>
                <Link to="/register"><Button variant="link">Regisztráció</Button></Link>
                <Link to="/forgotpass"><Button variant="link">Elfelejtett jelszó</Button></Link>
                </Col>
            </Row>
    )
}

export default Login;