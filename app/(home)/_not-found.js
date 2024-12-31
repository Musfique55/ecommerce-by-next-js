// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center text-black">
      <h2 className="text-2xl">Not Found</h2>
      <p>Could not find the requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
