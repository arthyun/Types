import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavContainer = styled.nav<{ right: number }>`
   background: #18d382;
   position: fixed;
   /* right: -280px; */
   right: ${(props) => props.right + "px"};
   top: 0;
   z-index: 100;
   width: 350px;
   height: 100%;
   text-align: start;
   transition: all 0.3s;
`;
const NavUl = styled.ul`
   margin: 0;
   margin-top: 2rem;
   padding: 0;
   text-align: left;
   & > li > .active {
      font-weight: bold;
   }
`;
const Btn1 = styled.button`
   background: #1600dc;
   color: #fff;
`;
const StyledNavLink = styled(NavLink)`
   display: block;
   padding: 1rem 1.5rem;
   color: #333;
   border-bottom: 1px solid #333;
`;

const Sidebar = () => {
   const [openSide, setOpenSide] = useState<boolean>(false);

   return (
      <NavContainer right={openSide ? 0 : -280}>
         <Btn1
            type="button"
            onClick={() => setOpenSide(!openSide)}
         >
            {openSide ? "닫기" : "열기"}
         </Btn1>
         {openSide && (
            <NavUl>
               <li>
                  <StyledNavLink to="/">Home</StyledNavLink>
               </li>
               <li>
                  <StyledNavLink to="/about">About</StyledNavLink>
               </li>
               <li>
                  <StyledNavLink to="/topic">Topic</StyledNavLink>
               </li>
               <li>
                  <StyledNavLink to="/tailwind">Tailwind</StyledNavLink>
               </li>
            </NavUl>
         )}
      </NavContainer>
   );
};

export default Sidebar;
