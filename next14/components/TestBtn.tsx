import React from 'react';
import Link from 'next/link';

export default function TestBtn({ id }: { id: string }) {
  return <Link href={`/movies/${id}`}>테스트</Link>;
}
