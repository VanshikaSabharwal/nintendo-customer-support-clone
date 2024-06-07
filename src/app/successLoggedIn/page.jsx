import React from "react";
import Link from "next/link";

export default function Success() {
  return (
    <div className="formSubmitted">
      <h1>Logged In Successfully 👍.</h1>
      <Link href="/">Go back to Home</Link>
    </div>
  );
}
