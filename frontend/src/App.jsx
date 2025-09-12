import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ name: "", message: "" });

  async function loadMessages() {
    const res = await fetch(`${API_URL}/messages`);
    const data = await res.json();
    setMessages(data);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.message) return;
    await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", message: "" });
    loadMessages();
  }

  async function handleDelete(id) {
    await fetch(`${API_URL}/messages/${id}`, { method: "DELETE" });
    loadMessages();
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Guestbook</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <br />
        <textarea
          placeholder="Your message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        <br />
        <button type="submit">Add Entry</button>
      </form>

      <ul>
        {messages.map((m) => (
          <li key={m.id} style={{ marginBottom: "1rem" }}>
            <strong>{m.name}:</strong> {m.message}{" "}
            <button onClick={() => handleDelete(m.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
