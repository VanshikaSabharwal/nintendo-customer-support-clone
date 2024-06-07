"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.css";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error submitting form: " + response.statusText);
      }

      const result = await response.json();
      if (result.success) {
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        window.location.href = "/success";
      } else {
        console.error("Error submitting form:", result.error);
        setError(result.error);
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      setError(error.message);
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
      </div>
      <div className={styles.heading}>
        <h1>Create a Nintendo Account</h1>
      </div>
      <div className={styles.Oauth}></div>
      <div className={styles.formContainer}>
        <p>
          If you don't have an account with one of the services listed above or
          would rather not use an existing account to create your Nintendo
          Account, please enter your information below.
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.nameCont}>
            <label htmlFor="name">Nickname: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="on"
              placeholder="10 characters or less"
              required
            />
          </div>
          <div className={styles.emailCont}>
            <label htmlFor="email">E-mail address: </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="on"
              placeholder="Email address"
              required
            />
          </div>
          <div className={styles.passwordCont}>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="on"
              placeholder="At least 8 characters"
              required
            />
          </div>
          <button type="submit" className={styles.btn}>
            Submit
          </button>
        </form>
        {error && <p>Error: {error}</p>}
      </div>
    </div>
  );
};

export default Page;
