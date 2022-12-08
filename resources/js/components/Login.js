import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import React from "react";
import { Link } from "react-router-dom";

function Login(){
    return( 
            /*<Row className="justify-content-center">
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
            </Row>*/

            <Grid2 container spacing={2} direction="column" alignItems="center" justifyContent="center">
            <Paper>
                <Grid2> 
                <Typography variant="h4">
                    Bejelentkezés
                </Typography>                                
                </Grid2>
                <Grid2>
                    <TextField required label="Email cím" variant="outlined" />      
                </Grid2>
                <Grid2>
                    <TextField required label="Jelszó" type="password" variant="outlined" />
                </Grid2>
                <Grid2>
                    <Button variant="contained">Bejelentkezés</Button>
                </Grid2>
            </Paper>
            </Grid2>
    )
}

export default Login;