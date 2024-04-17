/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';

export default function Room() {
  const [open, setOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 카메라, 보이스 접근
  const openMediaDevices = async (constraints: any) => {
    return await navigator.mediaDevices.getUserMedia(constraints);
  };

  // 기기 접근 (기기 직접 지정)
  const getConnectedDevices = async (type: any) => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === type);
  };

  // 로컬 카메라 접근
  const playVideoFromCamera = async () => {
    const constraints = {
      audio: false,
      video: {
        width: { min: 640, max: 1024 },
        height: { min: 480, max: 768 }
      }
    };
    return await navigator.mediaDevices.getUserMedia(constraints);
  };

  // 화면공유
  const displayCamera = async () => {
    const constraints: any = {
      video: {
        cursor: 'always'
        // cursor: 'always' | 'motion' | 'never',
        // displaySurface: 'application' | 'browser' | 'monitor' | 'window'
      }
    };
    return await navigator.mediaDevices.getDisplayMedia(constraints);
  };

  // 화면 연결 끊기
  const offCamera = async () => {
    const myStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });
    const videos1 = myStream.getTracks();
    videos1.forEach((item) => (item.enabled = !item.enabled));
    const videos2 = myStream.getVideoTracks();
    videos2.forEach((item) => item.stop());
    return myStream;
  };

  // // 피어연결 (송신)
  // const signalingChannel = new SignalingChannel();
  // const makeCall = async () => {
  //   const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
  //   const peerConnection = new RTCPeerConnection(configuration);
  //   signalingChannel.addEventListener('message', async (message: any) => {
  //     if (message.answer) {
  //       const remoteDesc = new RTCSessionDescription(message.answer);
  //       await peerConnection.setRemoteDescription(remoteDesc);
  //     }
  //   });
  //   const offer = await peerConnection.createOffer();
  //   await peerConnection.setLocalDescription(offer);
  //   signalingChannel.send({ offer: offer });
  // };

  // // 피어연결 (수신)
  // const bringCall = async () => {
  //   const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
  //   const peerConnection = new RTCPeerConnection(configuration);
  //   signalingChannel.addEventListener('message', async (message: any) => {
  //     if (message.answer) {
  //       const remoteDesc = new RTCSessionDescription(message.answer);
  //       await peerConnection.setRemoteDescription(remoteDesc);
  //     }
  //   });
  //   const offer = await peerConnection.createOffer();
  //   await peerConnection.setLocalDescription(offer);
  //   signalingChannel.send({ offer: offer });
  // };

  useEffect(() => {
    // // 카메라, 보이스 접근
    // openMediaDevices({ video: true, audio: false }).then((stream) => {
    //   const videoElement = videoRef?.current;
    //   if (videoElement) videoElement.srcObject = stream;
    // });
    // // 기기 접근
    // getConnectedDevices('videoinput').then((res) => console.log(res));
    // // 로컬 카메라 접근
    // let videoElement;
    // if (!open) {
    //   playVideoFromCamera()
    //     .then((stream) => {
    //       setOpen(true);
    //       videoElement = videoRef.current;
    //       if (videoElement) {
    //         videoElement.srcObject = stream;
    //       }
    //     })
    //     .catch((error) => alert(error));
    // } else {
    //   setOpen(false);
    //   videoElement = null;
    // }
    // // 화면공유
    // displayCamera().then((stream) => console.log(stream));
  }, []);

  return (
    <div>
      <h3>Room</h3>
      {/* {open ? <video ref={videoRef} autoPlay playsInline controls={false} /> : <p>화면켜기</p>} */}
      <video ref={videoRef} autoPlay playsInline controls={false} />
      <button
        type='button'
        onClick={() => {
          if (!open) {
            playVideoFromCamera()
              .then((stream) => {
                const videoElement = videoRef.current;
                if (videoElement) {
                  videoElement.srcObject = stream;
                }
              })
              .catch((error) => alert(error))
              .finally(() => setOpen(true));
          } else {
            offCamera()
              .then((result) => {
                console.log(result);
              })
              .catch((error) => alert(error))
              .finally(() => {
                setOpen(false);
              });
          }
        }}
      >
        {open ? '끄기' : '켜기'}
      </button>
    </div>
  );
}
