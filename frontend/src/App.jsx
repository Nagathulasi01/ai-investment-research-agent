import { useState } from "react";
import axios from "axios";
import "./App.css";

const FEATURES = [
  {
    title: "AI-ready Research",
    description: "Generate clean company summaries, strengths, and risk analysis.",
  },
  {
    title: "Modern Dashboard",
    description: "Mobile-first design with cards, tags, and a polished data panel.",
  },
  {
    title: "Built for submissions",
    description: "Simple lightweight project structure ideal for internships.",
  },
];

const SUGGESTIONS = ["Apple", "Tesla", "Google", "Amazon", "Nvidia", "TCS"];

function App() {
  const [company, setCompany] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastSearch, setLastSearch] = useState("");

  const handleAnalyze = async () => {
    const query = company.trim();

    if (!query) {
      setError("Please enter a company name before analyzing.");
      return;
    }

    setError("");
    setAnalysis("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/analyze", {
        company: query,
      });

      if (response.data?.success) {
        setAnalysis(response.data.analysis || "No analysis available.");
        setLastSearch(query);
      } else {
        setError(response.data?.error || "Unable to fetch analysis.");
      }
    } catch (submitError) {
      setError(
        submitError.response?.data?.error || submitError.message ||
          "A network error occurred while requesting analysis."
      );
    } finally {
      setLoading(false);
    }
  };

  const chooseSuggestion = (value) => {
    setCompany(value);
    setError("");
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">A</span>
          <div>
            <h1>AI Investment Research</h1>
            <p>Internship-ready dashboard for company screening and insight delivery.</p>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#dashboard">Dashboard</a>
          <a href="#analysis">Results</a>
        </nav>
      </header>

      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Investor intelligence</span>
          <h2>Clean, modern research for company evaluation.</h2>
          <p>
            Enter a company name to generate a structured analysis report with summary, strengths, risks,
            and a recommendation.
          </p>

          <div className="search-card">
            <label htmlFor="company-input">Company name</label>
            <div className="search-row">
              <input
                id="company-input"
                type="text"
                value={company}
                placeholder="Search Apple, Tesla, Google, Amazon..."
                onChange={(e) => setCompany(e.target.value)}
              />
              <button type="button" onClick={handleAnalyze} disabled={loading}>
                {loading ? <span className="button-loader" /> : "Analyze"}
              </button>
            </div>
            <div className="hint-row">
              <span>Try these:</span>
              <div className="suggestions">
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="suggestion-btn"
                    onClick={() => chooseSuggestion(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {error && <div className="alert error">{error}</div>}
        </div>

        <div className="hero-stats">
          <article>
            <span>6</span>
            <p>Preloaded company profiles</p>
          </article>
          <article>
            <span>2-step</span>
            <p>Backend analysis workflow</p>
          </article>
          <article>
            <span>Review ready</span>
            <p>Polished UI for submissions</p>
          </article>
        </div>
      </section>

      <section id="dashboard" className="dashboard-grid">
        {FEATURES.map((feature) => (
          <article key={feature.title} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>

      <main id="analysis" className="results-section">
        <div className="results-headline">
          <div>
            <p className="section-label">Analysis output</p>
            <h3>Investment research summary</h3>
            <p className="section-copy">
              The backend returns a formatted report that is easy to read and share.
            </p>
          </div>
          {lastSearch && <span className="search-tag">Latest query: {lastSearch}</span>}
        </div>

        {loading ? (
          <div className="status-card loading-card">
            <span className="loader" />
            <div>
              <h4>Loading analysis</h4>
              <p>Processing the research workflow, please wait.</p>
            </div>
          </div>
        ) : analysis ? (
          <article className="analysis-card">
            <pre>{analysis.trim()}</pre>
          </article>
        ) : (
          <div className="status-card muted-card">
            <h4>Ready to analyze</h4>
            <p>Type a company name above and click Analyze to begin.</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>React + Express workflow designed for beginner-friendly investment research demos.</p>
      </footer>
    </div>
  );
}

export default App;
