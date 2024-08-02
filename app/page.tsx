"use client"

import React, { useState, useEffect } from 'react';
import { fetchApodData } from "@/api/apod";

interface ApodData {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export default function Home() {
  const [data, setData] = useState<ApodData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchApodData();
        setData(result);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-20 text-4xl font-bold capitalize">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500 text-4xl font-bold capitalize">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{data?.title}</h1>
      {data?.media_type === 'image' && (
        <img src={data.url} alt={data.title} className="w-full h-auto mb-4" />
      )}
      {data?.media_type === 'video' && (
        <iframe
          src={data.url}
          title={data.title}
          className="w-full h-96 mb-4"
          frameBorder="0"
          allowFullScreen
        />
      )}
      <p className="text-gray-700">{data?.explanation}</p>
      <p className="text-gray-500 text-sm mt-2">Date: {data?.date}</p>
    </div>
  );
}