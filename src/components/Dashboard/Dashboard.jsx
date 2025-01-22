import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, setRegion } from "../../redux/countriesSlice";
import { Carousel } from "react-responsive-carousel";
import { LuFacebook } from "react-icons/lu";
import { CiTwitter } from "react-icons/ci";
import { SlSocialLinkedin } from "react-icons/sl";
import { AiOutlineYoutube } from "react-icons/ai";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
} from "react-bootstrap";
import "./Dashboard.css";

const Dashboard = () => {
  const LOG_ENABLED = false;
  const dispatch = useDispatch();
  /**
   * Redux state for fetching countries data
   */
  const { filteredCountries, status, region } = useSelector(
    (state) => state.countries
  );

  LOG_ENABLED && console.log(filteredCountries);

  /**
   *
   */
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

  /**
   * Loading condition for countries
   */
  if (status === "loading") {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  /**
   * Failed condition for fetching countries data
   */
  if (status === "failed") {
    return (
      <div className="failed-condition-container">
        <p>Failed to fetch data</p>
      </div>
    );
  }

  return (
    <Container className="dashboard">
      {/* Navbar */}
      <Navbar expand="lg" className="mb-4">
        <Container>
          {/* Brand aligned to the left */}
          <Navbar.Brand href="#">Countries</Navbar.Brand>

          {/* Toggle button for small screens */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Collapsible Nav contents aligned to the right */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link
                className={region === "All" ? "nav-text-decoration" : ""}
                onClick={() => handleRegionChange("All")}
              >
                All
              </Nav.Link>
              <Nav.Link
                className={region === "Asia" ? "nav-text-decoration" : ""}
                onClick={() => handleRegionChange("Asia")}
              >
                Asia
              </Nav.Link>
              <Nav.Link
                className={region === "Europe" ? "nav-text-decoration" : ""}
                onClick={() => handleRegionChange("Europe")}
              >
                Europe
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="welcome-section">
        <div className="line top-left"></div>
        <p className="welcome-text">WELCOME</p>
        <div className="line bottom-right"></div>
      </div>

      {/* Slider */}
      <div className="carousel-container">
        <div className="carousel-section">
          <Carousel
            showThumbs={false}
            showStatus={false}
            showArrows={true}
            infiniteLoop
          >
            {filteredCountries.slice(0, 4).map((country, index) => (
              <div key={index}>
                <img src={country.flag} alt={country.name} />
              </div>
            ))}
          </Carousel>
        </div>
        {filteredCountries.some((country) => country.name === "Austria" || country.name === "India") && (
          <div className="india-flag-container">
            <img
              src={
                filteredCountries.find((country) => country.name === "Austria" || country.name === "India")
                  .flag
              }
              alt="India Flag"
              className="india-flag"
            />
          </div>
        )}
      </div>

      {/* Country List */}
      <Row className="mt-4">
        {filteredCountries.slice(0, visible).map((country, index) => (
          <Col key={index} xs={12} md={6} className="mb-3">
            <Card className="d-flex align-items-center p-2 custom-card">
              <div className="flag-container me-3">
                <Card.Img
                  src={country.flag}
                  alt={country.name}
                  className="flag-icon"
                />
              </div>
              <div>
                <Card.Title className="mb-1">{country.name}</Card.Title>
                <Card.Text className="text-muted">{country.region}</Card.Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {visible < filteredCountries.length && (
        <div className="text-center filter-btn">
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      )}

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="social-signup">
          <button className="social-btn">
            <LuFacebook />
          </button>
          <button className="social-btn">
            <CiTwitter />
          </button>
          <button className="social-btn">
            <SlSocialLinkedin />
          </button>
          <button className="social-btn">
            <AiOutlineYoutube />
          </button>
        </div>
      </footer>
    </Container>
  );
};

export default Dashboard;
