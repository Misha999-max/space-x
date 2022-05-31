import React  from "react";
import { Link, NavLink} from 'react-router-dom';
import logo from "../../logo.svg";
import './header.css';



 const Header = (props)=> (
    <header className="header">
     <Link to = '/'>
     <img
          src={logo}
          alt="Logo Space X"
          className="logo"
      />
     </Link>
      <nav className="main-nav nav">
        <ul className="list">
          {props.rockets.map((item, i) => (
            <li key={i} className="item" >
              <Link
               to="rocket" 
               className="item-link"
               onClick={() => {
                 props.changeRocket(item)
                }}
               >{item}</Link>
            </li>
            
          ))}
          
        </ul>
      </nav>
      <nav className="secondary-nav">
        <ul className="list">
          <li className="item">
            <NavLink to="/" activeClassName="active" exact className="item-link">Home</NavLink>
          </li>
          <li className="item">
            <NavLink to="calendar" activeClassName="active" className="item-link">Calendar</NavLink>
          </li>
        </ul>
      </nav>
    </header>
 )


export default Header;