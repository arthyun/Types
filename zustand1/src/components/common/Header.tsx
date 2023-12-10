import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

// style
const NavTag = styled.nav`
  background: #000;
  ul {
    display: flex;
    gap: 1.5rem;
    li a {
      display: block;
      color: #fff;
      font-size: 1.5rem;
      padding: 14px 0;
      margin-left: 2rem;
    }
  }
`;

const Header = () => {
  return (
    <div>
      <header>
        <NavTag>
          <ul>
            <li>
              <Link to="/">Logo</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sub1">Sub1</Link>
            </li>
            <li>
              <Link to="/sub2">Sub2</Link>
            </li>
          </ul>
        </NavTag>
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
