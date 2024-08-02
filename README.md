Here's a `README.md` file for your project:

````markdown
# NASA Astronomy Picture of the Day (APOD) Explorer

This project is a React application built with TypeScript that allows users to explore NASA's Astronomy Picture of the Day (APOD) API. This application fetches data from the APOD API and displays the image, title, explanation, and date of the astronomy picture of the day.

## Objective

Develop a React application with TypeScript that allows users to explore NASA's Astronomy Picture of the Day (APOD) API.

## Requirements

### Fetch Data

- Utilize the NASA APOD API (https://api.nasa.gov/) to retrieve information about the astronomy picture of the day.
- The information should include the image URL, title, explanation, and date.

### Display Data

- Implement a user interface (UI) to display the fetched data. This should include:
  - A high-quality image of the astronomy picture.
  - The title of the picture.
  - A detailed explanation of the picture content.
  - The date the picture was captured.

### Error Handling

- Implement proper error handling mechanisms to gracefully handle situations where data cannot be fetched from the API.
- Display a user-friendly message in such cases.

## Evaluation Criteria

- Adherence to the given specifications.
- Code quality and organization.
- Responsiveness and compatibility with various devices.
- Attention to detail in design and functionality.

## Tips

- Familiarize yourself with the NASA APOD API documentation.
- Utilize online resources and tutorials to learn and implement React and TypeScript concepts effectively.
- Focus on writing clean, maintainable, and well-commented code.
- Feel free to showcase your creativity and add additional features that enhance the application's value.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/victot0121/NASA-APOD.git
cd nasa-apod-explorer
```
````

2. Install the dependencies:

```bash
npm install
# or
yarn install
```

### Configuration

1. Create a `.env.local` file in the root directory of your project.
2. Add your NASA API key to the `.env.local` file:

```plaintext
NEXT_PUBLIC_NASA_API_KEY=your_api_key_here
```

### Running the Application

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `api/apod.ts`: Contains the function to fetch data from the NASA APOD API.
- `app/Apod.tsx`: The component responsible for fetching and displaying the APOD data.

## Code Overview

### `api/apod.ts`

```typescript
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

export const fetchApodData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
```

### `app/page.tsx`

```typescript
import React, { useEffect, useState } from "react";
import { fetchApodData } from "../api/apod";

interface ApodData {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

const Apod: React.FC = () => {
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

  if (loading)
    return (
      <div className="text-center mt-20 text-3xl font-bold">Loading...</div>
    );
  if (error)
    return (
      <div className="text-center mt-20 text-red-500 text-3xl font-bold">
        {error}
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{data?.title}</h1>
      {data?.media_type === "image" && (
        <img src={data.url} alt={data.title} className="w-full h-auto mb-4" />
      )}
      {data?.media_type === "video" && (
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
};

export default Apod;
```

## Submission Instructions

Please ensure your code is well-organized, properly commented, and adheres to the given specifications. Submit your project by the due date: **2nd August 2024**.

---

Thank you for your effort and dedication. We look forward to reviewing your submission!

```

Feel free to modify this `README.md` file according to any additional features or instructions specific to your project.
```
