// client/src/components/BugForm.jsx
function BugForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // 🔴 Intentional bug: misspelled "titl" instead of "title"
    const newBug = {
      titl: title,
      description,
    };

    try {
      const response = await fetch('/api/bugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBug),
      });

      if (!response.ok) throw new Error('Failed to submit bug');
      alert('Bug submitted!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Submit Bug</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
