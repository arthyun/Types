import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className='headerArea'>
      <nav className='navigation'>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='room'>Room</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
