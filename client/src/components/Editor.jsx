// src/components/Editor.jsx

import React from 'react';

const Editor = ({ language, code, onChange, onSubmit, loading }) => {
  return (
    <div className="bg-gray-100 rounded-xl p-4">
      <div className="mb-2">
        <label className="text-sm font-medium text-gray-700">Language:</label>
        <select
          value={language}
          onChange={(e) => onChange('language', e.target.value)}
          className="ml-2 p-1 rounded border"
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      <textarea
        className="w-full h-64 p-3 font-mono border rounded-lg resize-none"
        placeholder="Write your code here..."
        value={code}
        onChange={(e) => onChange('code', e.target.value)}
      />

      <button
        onClick={onSubmit}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Code'}
      </button>
    </div>
  );
};

export default Editor;
