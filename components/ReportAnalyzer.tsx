"use client";

import { useState } from "react";

export default function ReportAnalyzer() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [conditions, setConditions] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleFiles(selectedFiles: FileList | null) {
    if (!selectedFiles) return;

    setFiles((previous) => [
      ...previous,
      ...Array.from(selectedFiles),
    ]);
  }

  function removeFile(index: number) {
    setFiles((previous) =>
      previous.filter((_, fileIndex) => fileIndex !== index)
    );
  }

  async function handleSubmit() {
    if (!name || !age || files.length === 0) {
      setMessage("Please enter patient details and upload a report.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("age", age);
      formData.append("conditions", conditions);

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setMessage("Report analyzed successfully!");
      console.log(data);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="analyzer-card">
      <div className="form-grid">
        <div className="field">
          <label htmlFor="patient-name">Patient Name *</label>
          <input
            id="patient-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter patient name"
          />
        </div>

        <div className="field">
          <label htmlFor="patient-age">Age *</label>
          <input
            id="patient-age"
            type="number"
            min="0"
            max="120"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="conditions">
          Known Diseases / Health Conditions
        </label>

        <textarea
          id="conditions"
          value={conditions}
          onChange={(e) => setConditions(e.target.value)}
          placeholder="Optional — for example: diabetes, high blood pressure, asthma..."
        />
      </div>

      <div className="field">
        <label>Upload Medical Report *</label>

        <label className="upload-area">
          <span className="upload-icon">📄</span>
          <strong>Upload your report</strong>
          <span>PDF, JPG, or PNG · You can select multiple files</span>

          <input
            className="file-input"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="selected-files">
          <h4>Selected files</h4>

          {files.map((file, index) => (
            <div className="selected-file" key={`${file.name}-${index}`}>
              <span>📎 {file.name}</span>

              <button
                type="button"
                onClick={() => removeFile(index)}
                aria-label={`Remove ${file.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        className="analyze-button"
        onClick={handleSubmit}
        disabled={loading}
        type="button"
      >
        {loading ? "AI is analyzing your report..." : "✦ Analyze My Report"}
      </button>

      {message && (
        <div
          className={
            message.includes("successfully")
              ? "form-message success"
              : "form-message error"
          }
        >
          {message}
        </div>
      )}

      <p className="privacy-note">
        🔒 Your information should only be processed securely. This prototype
        does not provide a medical diagnosis.
      </p>
    </div>
  );
}
