import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <Link href="/">Go to the home page</Link>
    </div>
  );
}
