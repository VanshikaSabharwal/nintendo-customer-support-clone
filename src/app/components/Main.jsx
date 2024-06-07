"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Image from "next/image";

// Function to fetch issues from the API
const fetchIssues = async () => {
  try {
    const response = await fetch("/api/issues");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Network response was not ok: ${response.statusText} - ${errorText}`
      );
    }
    const data = await response.json();
    const issueData = data.data;

    return issueData;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};

export default function Main() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch issues on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedIssues = await fetchIssues();
        setIssues(fetchedIssues); // Handle empty response
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/issues", {
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
        const updatedIssues = await fetchIssues();

        setIssues(updatedIssues); // Handle empty response
        // Clear the form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        console.error("Error submitting form:", result.error);
        setError(result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // handle login
  // const handleLogin = async (email,password) =>{
  //   try{
  //     const response = await fetch("/api/signup",{
  //       method:"POST",
  //       headers:{
  //         "Content-Type":"application/json",
  //       },

  //     })
  //   }
  // }

  function handleSearch(searchTerm) {
    setIssues(
      issues.filter((issue) =>
        issue.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  return (
    <div>
      <div className={styles.support}>
        <div className={styles.supportContainer}>
          <div className={styles.mainSupport}>
            <div className={styles.supportHeadingContainer}>
              <div className={styles.supportImg}>
                <Image
                  src="/images/marioFunImg.png"
                  objectFit="cover"
                  width={300}
                  height={300}
                  quality={100}
                  alt="mario img"
                />
              </div>
              <div className={styles.supportHeading}>
                <h1>
                  Welcome to <br /> Customer Support
                </h1>
              </div>
            </div>
            <div className="searchSupport">
              <form>
                <input
                  name="search"
                  type="text"
                  placeholder="Search Support"
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="supportIssuesContainer">
        <h1 className="issues">Issues</h1>
        {isLoading && <p>Loading issues...</p>}
        {error && <p>Error: {error}</p>}
        {!isLoading && !error && issues.length === 0 && <p>No issues found.</p>}
        {issues.length > 0 && (
          <ul>
            {issues.map((issue) => (
              <li key={issue.id}>
                <h3 className="issueName">
                  Name: <p> {issue.name}</p>
                </h3>
                <h3 className="issueEmail">
                  Email: <p> {issue.email}</p>
                </h3>
                <h3 className="issueSubject">
                  Subject: <p> {issue.subject}</p>
                </h3>
                <h3 className="issueMessage">
                  Message: <p> {issue.message}</p>
                </h3>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="supportIssueList">
        <h1 className="issues">Create a Issue to seek customer support</h1>
        <form onSubmit={handleSubmit}>
          <div className="name">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="on"
              required
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="on"
              required
            />
          </div>
          <div className="subject">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              autoComplete="on"
              required
            />
          </div>
          <div className="message">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              autoComplete="on"
              required
              style={{ width: "300px", height: "100px" }}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
