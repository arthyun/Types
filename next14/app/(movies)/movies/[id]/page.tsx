import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: `Movie Detail`
};

// /movies/:id
// /movies/:id/credits
// /movies/:id/videos
// /movies/:id/providers
// /movies/:id/similar
export default function MovieDetail({ params: { id } }: { params: { id: string } }) {
  return <h1>Movie {id}</h1>;
}
