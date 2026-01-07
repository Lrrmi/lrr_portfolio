import React from 'react';
import { Navbar, Nav, NavLink, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/main.scss';
import { NavDrag, NavHide, PadForNav } from '../scripts/navdrag.js';
import { GetProjects } from '../scripts/projectDataHandler.js';

import Index from '../index';
import Projects from './Projects.js';
import Project from './Project.js';
import About from './About.js';
import Contact from './Contact.js';
import Potpourri from './Potpourri.js';

const handleClick = (e) => {
  // remove underline from all nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.style.textDecoration = 'none';
  });

  // underline only the clicked link
  e.currentTarget.style.textDecoration = 'underline';
  e.currentTarget.style.textUnderlineOffset = '6px';
  e.currentTarget.style.textDecorationThickness = '1px';
};

function App() {
  // Add listeners
  var navBarHeight = 0;
  React.useEffect(() => {
    NavDrag('.navbar');
    NavHide('.navbar');
    navBarHeight = PadForNav('.navbar');
    document.documentElement.style.setProperty('--nav-height', navBarHeight + "px");
  });

  // Get Projects
  const projects = GetProjects();

  return (
    <Router>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/index"><img src="./logo192.png" alt="Lee Adams Portfolio" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink as={Link} to="/projects" onClick={handleClick}>projects</NavLink>
              <NavLink as={Link} to="/about" onClick={handleClick}>about</NavLink>
              <NavLink as={Link} to="/contact" onClick={handleClick}>contact</NavLink>
              <NavLink as={Link} to="/potpourri" onClick={handleClick}>potpourri</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/index" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/potpourri" element={<Potpourri />} />
          {projects.map(project => (
            <Route path={project.page_name} element={<Project projectTitle={project.title} />} />
          ))}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;