


// import React, { useState, useEffect } from "react";
// import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import logo from "./common-img/logo.png";
// import axios from "axios";

// import "./navbar.css";

// const backendUrl = process.env.REACT_APP_BACKEND_URL;

// function NavBar() {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

   
//     getUserProfile(token)
//       .then((data) => {
//         if (data && data.email) {
//           setEmail(data.email);
//         }
//       })
//       .catch(() => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("email");
//         navigate("/login");
//       });
//   }, [navigate]);

  
//   async function getUserProfile(token) {
//     try {
//       const response = await axios.get(`${backendUrl}/api/user/profile`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         navigate('/login');
//       }
//       throw error; 
//     }
//   }
  

//   const handleLogOut = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("email");
//     setEmail("");
//     navigate("/login");
//   };

//   return (
//     <Navbar expand="lg" className="bg-body-tertiary sticky-top ">
//       <Container>
//         <Navbar.Brand as={Link} to="/">
//           <img
//             src={logo}
//             className=""
//             style={{ maxWidth: "100px", height: "auto" }}
//             alt="Logo"
//           />
//           <span className=" ">Taking FOOD</span>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link
//               as={Link}
//               to="/"
//               className={location.pathname === "/" ? "nav-link active" : "nav-link"}
//             >
//               Home
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/allProducts"
//               className={location.pathname === "/allProducts" ? "nav-link active" : "nav-link"}
//             >
//               All Products
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/cartPage"
//               className={location.pathname === "/cartPage" ? "nav-link active" : "nav-link"}
//             >
//               Cart
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/payment"
//               className={location.pathname === "/payment" ? "nav-link active" : "nav-link"}
//             >
//               Payment
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/orderList"
//               className={location.pathname === "/orderList" ? "nav-link active" : "nav-link"}
//             >
//               Orders
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/admin"
//               className={location.pathname === "/admin" ? "nav-link active" : "nav-link"}
//             >
//               Admin Page
//             </Nav.Link>
//             {email && (
//               <NavDropdown title={email} id="basic-nav-dropdown" align="end">
//                 <NavDropdown.Item onClick={handleLogOut}>
//                   Logout
//                 </NavDropdown.Item>
//               </NavDropdown>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavBar;





import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "./common-img/logo.png";
import axios from "axios";

import "./navbar.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function NavBar() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      getUserProfile(token)
        .then((data) => {
          if (data && data.email) {
            setEmail(data.email);
            localStorage.setItem("email", data.email); // Cache email in local storage
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          navigate("/login");
        });
    }
  }, [navigate]);

  async function getUserProfile(token) {
    try {
      const response = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
      throw error;
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setEmail("");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top ">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            style={{ maxWidth: "100px", height: "auto" }}
            alt="Logo"
          />
          <span className=" ">Taking FOOD</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={location.pathname === "/" ? "nav-link active" : "nav-link"}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/allProducts"
              className={location.pathname === "/allProducts" ? "nav-link active" : "nav-link"}
            >
              All Products
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/cartPage"
              className={location.pathname === "/cartPage" ? "nav-link active" : "nav-link"}
            >
              Cart
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/payment"
              className={location.pathname === "/payment" ? "nav-link active" : "nav-link"}
            >
              Payment
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/orderList"
              className={location.pathname === "/orderList" ? "nav-link active" : "nav-link"}
            >
              Orders
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin"
              className={location.pathname === "/admin" ? "nav-link active" : "nav-link"}
            >
              Admin Page
            </Nav.Link>
            {email && (
              <NavDropdown title={email} id="basic-nav-dropdown" align="end">
                <NavDropdown.Item onClick={handleLogOut}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
