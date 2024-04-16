import './App.css';
import { useUser } from '@clerk/clerk-react';
import AppRouter from './Router';

function App() {
  const { isSignedIn, isLoaded, user } = useUser();

  console.log('signedIn ==>', isSignedIn);
  console.log('loaded ==>', isLoaded);
  console.log('user ==>', user);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
