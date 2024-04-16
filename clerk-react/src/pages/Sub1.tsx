import { useUser } from '@clerk/clerk-react';

export default function Sub1() {
  const { isSignedIn, isLoaded, user } = useUser();

  return <h3>{isSignedIn && isLoaded ? `현재 로그인한 사용자는 ${user?.fullName} 입니다.` : '확인중...'}</h3>;
}
