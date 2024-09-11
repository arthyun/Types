import Lottie from 'lottie-react';
import loadingLottie from './netflix_animation.json';

// 기존
// const styles = {
//   container: {
//     position: 'absolute',
//     width: window.innerWidth,
//     height: '100vh',
//     // backgroundColor: 'rgba(200, 200, 200, 0.3)',
//     left: 0,
//     top: 0,
//     zIndex: 999,
//   },
//   loadingStyle: {
//     position: 'absolute',
//     left: '50%',
//     top: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '500px',
//     height: '350px',
//   },
//   loadingContainer: {
//     position: 'absolute',
//     left: '50%',
//     top: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '450px',
//     height: '450px',
//   },
// };

// 변경
const containerStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100vh',
  left: 0,
  top: 0,
  zIndex: 999,
};

const loadingStyle: React.CSSProperties = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  height: '350px',
};

const loadingContainerStyle: React.CSSProperties = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '450px',
  height: '450px',
};

export default function LoadingSplash() {
  return (
    <div style={containerStyle}>
      <div style={loadingStyle}>
        <div style={loadingContainerStyle}>
          <Lottie animationData={loadingLottie} />
        </div>
      </div>
    </div>
  );
}
