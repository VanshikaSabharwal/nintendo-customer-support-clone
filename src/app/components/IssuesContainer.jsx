const IssuesContainer = () => {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
  return (
    <div>
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
    </div>
  );
};

export default IssuesContainer;
