import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/App.css";
import AppRouter from "./Router";

function App() {
   const [isPage, setIsPage] = useState<boolean>(false);

   return (
      <>
         {isPage ? (
            <AppRouter />
         ) : (
            <>
               <div>
                  <a
                     href="https://vitejs.dev"
                     target="_blank"
                  >
                     <img
                        src={viteLogo}
                        className="logo"
                        alt="Vite logo"
                     />
                  </a>
                  <a
                     href="https://react.dev"
                     target="_blank"
                  >
                     <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                     />
                  </a>
               </div>
               <h1>Vite + React</h1>
               <div className="card">
                  <button onClick={() => setIsPage(!isPage)}>Insert</button>
                  <p>Please Click to Home</p>
               </div>
            </>
         )}
      </>
   );
}

export default App;
