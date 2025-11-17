import React, { useState } from 'react';

export default function UserForm({ initial = {}, onSubmit }) {
  const [name, setName] = useState(initial.name || '');
  const [email, setEmail] = useState(initial.email || '');
  const [role, setRole] = useState(initial.role || '');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({ name, email, role });
    } catch (err) {
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Name
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Full name"
          required
        />
      </label>

      <label>
        Email
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="email@example.com"
          type="email"
          required
        />
      </label>

      <label>
        Role
        <input
          value={role}
          onChange={e => setRole(e.target.value)}
          placeholder="Developer"
          required
        />
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
