import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import './Home.css';

function Home() {
  return (
    <Container>
        <h2 className="text-center my-5">Welcome to your wallet</h2>
      <Row className="justify-content-center">
        <Col xs={12} sm={4} className="my-3">
          <Card className="h-100 shadow rounded-lg p-4" style={{backgroundColor: '#8EA2FF'}}>
            <Card.Body>
              <Card.Title className="text-center text-white mb-4">Add Funds</Card.Title>
              <Card.Text className="text-center mb-5 text-white">
                Add funds to your wallet using your preferred payment method.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={4} className="my-3">
          <Card className="h-100 shadow rounded-lg p-4" style={{backgroundColor: '#FFB6C1'}}>
            <Card.Body>
              <Card.Title className="text-center text-white mb-4">Manage Funds</Card.Title>
              <Card.Text className="text-center mb-5 text-white">
                View your current balance and transaction history, and withdraw funds as needed.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={4} className="my-3">
          <Card className="h-100 shadow rounded-lg p-4" style={{backgroundColor: '#90EE90'}}>
            <Card.Body>
              <Card.Title className="text-center text-white mb-4">Transfer Funds</Card.Title>
              <Card.Text className="text-center mb-5 text-white">
                Transfer funds to other users of our e-wallet service, using their email address or mobile number.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
