import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

class Bootstrap extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col className="bg1">1 of 2</Col>
                    <Col className="bg2">2 of 2</Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary">Primary</Button>{' '}
                        <Button variant="secondary">Secondary</Button>{' '}
                        <Button variant="success">Success</Button>{' '}
                        <Button variant="warning">Warning</Button>{' '}
                        <Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
                        <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
                        <Button variant="link">Link</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Bootstrap;
