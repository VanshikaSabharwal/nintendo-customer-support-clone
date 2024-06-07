import React from "react";
import Link from "next/link";

export default function Success() {
  return (
    <div className="formSubmitted">
      <h1>Issue Submitted Successfully 👍.</h1>
      <p>Thank you for reaching out to us. We will get back to you shortly.</p>
      <Link href="/">Go back to Home</Link>
    </div>
  );
}
