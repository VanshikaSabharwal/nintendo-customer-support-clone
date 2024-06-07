"use client";
import React, { useState } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import Link from "next/link";

const Signin = () => {
  const [signIn, setSignIn] = useState({ email: "", password: "" });
  const [error, setError] = useState(null); // Track errors

  const handleSignIn = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signIn),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      if (data.success) {
        setSignIn({ email: "", password: "" });
        setError(null); // Clear any previous errors
        window.location.href = "/successLoggedIn";
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Server Error");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link href="/" className="logoImg">
          <Image
            width={200}
            height={300}
            src="/images/nintendo-logo-red-background.jpg"
            alt="Nintendo Logo"
          />
        </Link>
        <p>Nintendo Account</p>
        <Link href="/signup">Create a Nintendo Account</Link>
      </div>
      <div className={styles.main}>
        <h1 className={styles.heading}>Nintendo Account</h1>
        <div className={styles.SignInForm}>
          <div className={styles.signContainer}>
            <h3>Log in with password</h3>
            <form onSubmit={handleSignIn}>
              <label htmlFor="email">E-mail address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={signIn.email}
                onChange={(e) =>
                  setSignIn({ ...signIn, email: e.target.value })
                }
                autoComplete="on"
                placeholder="E-mail address/Sign-in ID"
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={signIn.password}
                onChange={(e) =>
                  setSignIn({ ...signIn, password: e.target.value })
                }
                autoComplete="on"
                placeholder="Password"
              />
              <button type="submit" className={styles.btn}>
                Sign in
              </button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
          <Link href="forgotPw" className={styles.signInLinks}>
            Forgot your password?
          </Link>
          <div className={styles.passkeySignIn}>
            <h3>Passkey Sign-In</h3>
            <div className={styles.images}>
              <Image
                src="/images/face-recognition.png"
                width={32}
                height={32}
                alt="Face Recognition"
              />
              <Image
                src="/images/fingerprint.png"
                width={32}
                height={32}
                alt="Fingerprint"
              />
            </div>
            <button className={styles.passKeyBtn}>Sign in</button>
          </div>
          <Link href="" className={styles.signInLinks}>
            About Passkeys
          </Link>
          <Link href="" className={styles.signInLinks}>
            Can&apos;t use passkey sign-in?
          </Link>
          <hr />
          <div className={styles.otherSignIn}>
            <h3>Sign in with </h3>
            <button>Google</button>
            <button>Apple</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
