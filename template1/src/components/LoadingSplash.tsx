import Lottie from "lottie-react";
import loadingLottie from "../assets/lottie/animation_loading2.json";

type LoadingStyle = {
   position: string | any;
   left: string | any;
   top: string | any;
   marginTop: string | any;
   marginLeft: string | any;
   width: string | any;
   height: string | any;
};

interface StyleTypes<T> {
   loadingStyle: T;
   loadingContainer: T;
}

const styles: StyleTypes<LoadingStyle> = {
   loadingStyle: {
      position: "absolute",
      left: "50%",
      top: "50%",
      marginTop: "-150px",
      marginLeft: "-150px",
      width: "450px",
      height: "300px",
   },
   loadingContainer: {
      position: "absolute",
      left: "50%",
      top: "50%",
      marginTop: "-150px",
      marginLeft: "-150px",
      width: "300px",
      height: "300px",
   },
};

export default function LoadingSplash() {
   return (
      <div style={styles.loadingStyle}>
         <div style={styles.loadingContainer}>
            <Lottie animationData={loadingLottie} />
         </div>
      </div>
   );
}
