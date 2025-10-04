import React, { useState } from "react";

const JobApplyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    coverLetter: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.coverLetter.trim()) newErrors.coverLetter = "Cover letter is required";
    if (!formData.resume) newErrors.resume = "Resume is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("coverLetter", formData.coverLetter);
    data.append("resume", formData.resume);

    try {
      const response = await fetch("/api/job-apply", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setSuccessMessage("Application submitted successfully!");
        setFormData({ name: "", email: "", coverLetter: "", resume: null });
        setErrors({});
        // If you want to clear file input visually, reload or use a ref for the file input.
      } else {
        setSuccessMessage("Failed to submit application.");
      }
    } catch (err) {
      console.error(err);
      setSuccessMessage("An error occurred. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 16 }}>
      <h2>Apply for Job</h2>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Name:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Cover Letter:</label><br />
          <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} rows={6} />
          {errors.coverLetter && <div style={{ color: "red" }}>{errors.coverLetter}</div>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Resume (PDF/DOC):</label><br />
          <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
          {errors.resume && <div style={{ color: "red" }}>{errors.resume}</div>}
        </div>

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default JobApplyForm;
