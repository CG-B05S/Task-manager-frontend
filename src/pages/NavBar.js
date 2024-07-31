import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from '../components/Button';
import Avatar from '../components/Avatar';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user);
    } else {
      setIsAuthenticated(false);
    }
  }, [location]);

  return (
    <div className="navbar bg-info">
      <div className="flex-1">
        <div className="w-10 rounded-full">
          <img
            alt="Todo logo"
            src="https://cdn-icons-png.flaticon.com/512/1950/1950715.png"
          />
        </div>
      </div>
      <div className="flex-none flex items-center">
        <ul className="menu menu-horizontal px-1 flex items-center">
          {isAuthenticated ? (
            <>
              <li>
                <Avatar fullName={user ? `${user.firstName} ${user.lastName}` : ''} />
              </li>
              <li>
                <Button onClick={handleLogout} className="btn-sm btn-error text-base-100">
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={`btn btn-sm ${
                    location.pathname === "/login"
                      ? "bg-base-100 text-info/80"
                      : "text-base-100 btn btn-ghost"
                  }`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`btn btn-sm ${
                    location.pathname === "/register"
                      ? "bg-base-100 text-info/80"
                      : "text-base-100 btn btn-ghost"
                  } ml-2`}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
