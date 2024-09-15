'use client'
import React from 'react';
import axios from 'axios';
import {getUser} from "@workos-inc/authkit-nextjs";
import {WorkOS} from "@workos-inc/node";



interface EmailResponse {
  emails: string[];
}

const ColdEmailPage: React.FC = () => {
  const [url, setUrl] = React.useState('');
  const [emails, setEmails] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');


  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post<EmailResponse>('http://localhost:5001/generate-email', { url });
      setEmails(response.data.emails);
    } catch (err) {
      setError('An error occurred while generating emails. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Generate Cold Emails</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">Job Description URL</label>
          <input
            type="url"
            id="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
        >
          {loading ? 'Generating...' : 'Generate Emails'}
        </button>
      </form>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {emails.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Generated Emails:</h2>
          <ul className="list-disc pl-5">
            {emails.map((email, index) => (
              <li key={index} className="mb-2">
                <pre className="bg-gray-100 p-4 rounded-md">{email}</pre>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ColdEmailPage;
