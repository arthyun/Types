import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: `Movie Detail`
};

// /movies/:id
export default function MovieDetail({ params: { id } }: { params: { id: string } }) {
  return <h1>Movie {id}</h1>;
}
