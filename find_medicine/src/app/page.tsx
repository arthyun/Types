import ConfirmAccess from './common/ConfirmAccess';
import Intro from './common/Intro';

// font-awesome
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

// // Types
// interface HomeTypes {
//   children: React.ReactNode;
// }

// Components
export default function Home() {
   return (
      <div className="w-[75%] min-w-[480px] m-auto py-10">
         {/* getSession */}
         <ConfirmAccess />
         {/* MainArea */}
         <Intro />
      </div>
   );
}
