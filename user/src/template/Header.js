import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { auth } from '../database/config'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'



function Header() {

  const [openedDrawer, setOpenedDrawer] = useState(false)

  const history = useHistory();
  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false)
    }
  }
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })
  const logout = async () => {
    await signOut(auth);
    history.push('/')
  }


  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/productlist" onClick={changeNav}>
            <FontAwesomeIcon
              icon={["fab", "bootstrap"]}
              className="ms-1"
              size="lg"
            />
            <span className="ms-2 h5">Shop</span>
          </Link>

          <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? 'open' : '')}>
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link to="/productlist" className="nav-link" replace onClick={changeNav}>
                  List Product
                </Link>
              </li>
            </ul>
            <Link to='/cart'>
              <button type="button" className="btn btn-outline-dark me-3 d-none d-lg-inline">
                <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                <span className="ms-3 badge rounded-pill bg-dark"></span>
              </button>
            </Link>
            <Link to='/order-status'>
              <button type="button" className="btn btn-outline-dark me-3 d-none d-lg-inline">
                Order
                <span className="ms-3 badge rounded-pill bg-dark"></span>
              </button>
            </Link>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  href="!#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={["fas", "user-alt"]} />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <div className="text-center">
                      <p>{user?.email}</p>
                      <button className="text-center ml-5 btn btn-danger"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="d-inline-block d-lg-none">
            <Link to="/cart">
              <button type="button" className="btn btn-outline-dark">
                <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              </button>
            </Link>

            <button className="navbar-toggler p-0 border-0 ms-3" type="button" onClick={toggleDrawer}>
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
