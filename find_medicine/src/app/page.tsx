import Intro from './common/Intro';

// font-awesome
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

// Components
export default function Home() {
  return (
    <div className="w-[75%] min-w-[480px] m-auto py-10">
      {/* MainArea */}
      <Intro />
    </div>
  );
}
