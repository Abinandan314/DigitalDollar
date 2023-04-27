import React from 'react';
import './App.css';
import Register from './components/Register';
import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback } from "react";
import { logout } from "./slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Wallet from './components/Wallets/Wallet';
import Transaction from './components/Transactions/Transaction';
import Cashback from './components/Cashbacks/Cashback';

function RouterComponent(){
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);
    return(
        <Router>
      <div data-testid="router-component">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
             Wallet Application
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            {currentUser && (
              <li className="nav-item">
                <Link to={"/wallet"} className="nav-link">
                  Wallet
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/transactions"} className="nav-link">
                  Transactions
                </Link>
              </li>
              <li>
              <Link to={"/cashbacks"} className="nav-link">
                  Cashbacks
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/transactions" element={<Transaction/>} />
            <Route path="/cashbacks" element={<Cashback/>} />
          </Routes>
        </div>
      </div>
    </Router>
    )
}
export default RouterComponent;