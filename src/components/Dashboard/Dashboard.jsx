import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, setRegion } from "../../redux/countriesSlice";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Container, Row, Col, Card, Button, Navbar, Nav } from "react-bootstrap";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { filteredCountries, status, region } = useSelector(
    (state) => state.countries
  );

  const [visible, setVisible] = useState(6);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisible((prev) => prev + 6);
  };

  const handleRegionChange = (selectedRegion) => {
    dispatch(setRegion(selectedRegion));
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Failed to fetch data</p>;

  return (
    <Container className="dashboard">
      <Navbar expand="lg" className="bg-body-tertiary mb-4">
        <Container>
          <Navbar.Brand href="#">Country</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                className={region === "All" ? "text-primary" : ""}
                onClick={() => handleRegionChange("All")}
              >
                All
              </Nav.Link>
              <Nav.Link
                className={region === "Asia" ? "text-primary" : ""}
                onClick={() => handleRegionChange("Asia")}
              >
                Asia
              </Nav.Link>
              <Nav.Link
                className={region === "Europe" ? "text-primary" : ""}
                onClick={() => handleRegionChange("Europe")}
              >
                Europe
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Slider */}
      <Carousel showThumbs={false} showStatus={false} infiniteLoop>
        {filteredCountries.slice(0, 5).map((country, index) => (
          <div key={index}>
            <img src={country.flag} alt={country.name} />
            {/* <p className="legend">{country.name}</p> */}
          </div>
        ))}
      </Carousel>

      {/* Country List */}
      <Row className="mt-4">
        {filteredCountries.slice(0, visible).map((country, index) => (
          <Col key={index} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={country.flag} />
              <Card.Body>
                <Card.Title>{country.name}</Card.Title>
                <Card.Text>{country.region}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {visible < filteredCountries.length && (
        <div className="text-center">
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      )}

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="social-icons">
          <span>🌐</span>
          <span>🐦</span>
          <span>📷</span>
          <span>🎥</span>
        </div>
      </footer>
    </Container>
  );
};

export default Dashboard;
