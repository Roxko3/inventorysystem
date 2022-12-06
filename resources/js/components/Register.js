import { Button, Col, Form, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Register(){
    return(
        <Row className="justify-content-center">
                <Col md={5} sm={5} xs={8}>
                <h1>Regisztráció</h1>
                <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Név</Form.Label>
                    <Form.Control type="text" placeholder="Név" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email cím</Form.Label>
                    <Form.Control type="email" placeholder="Email cím" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmailAgain">
                    <Form.Label>Email cím újra</Form.Label>
                    <Form.Control type="email" placeholder="Email cím újra" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Jelszó</Form.Label>
                    <Form.Control type="password" placeholder="Jelszó" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPasswordAgain">
                    <Form.Label>Jelszó újra</Form.Label>
                    <Form.Control type="password" placeholder="Jelszó újra" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupCheck">             
                <Form.Check label="Nem vagyok npc"/>
                </Form.Group>
                </Form>
                <Button variant="primary">Regisztráció</Button>
                <Link to="/login"><Button variant="link">Belépés</Button></Link>
                </Col>
            </Row>
    )
}

export default Register;