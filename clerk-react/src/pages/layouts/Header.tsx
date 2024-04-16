import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export default function Header() {
  return (
    <header>
      <nav>
        <ul style={{ display: 'flex', gap: '1rem' }}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/sub1'>Sub1</Link>
          </li>
          <li>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </li>
        </ul>
      </nav>
    </header>
  );
}
