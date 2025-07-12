import React, { useState } from "react";
import axios from "axios";

function App() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://ai-video-backend-be7j.onrender.com", { topic });
      setResults(res.data);
    } catch (error) {
      alert("Error searching videos. Make sure the backend is running.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>🔍 AI Video Finder</h1>
      <input
        type="text"
        placeholder="Enter a topic like 'Computer Networks'"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ padding: 10, width: "60%", marginRight: 10 }}
      />
      <button onClick={handleSearch} style={{ padding: 10 }} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
      <div style={{ marginTop: 30 }}>
        {results.map((video, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <a href={video.url} target="_blank" rel="noreferrer">
              <h3>{video.title}</h3>
            </a>
            <p>{video.channelTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
