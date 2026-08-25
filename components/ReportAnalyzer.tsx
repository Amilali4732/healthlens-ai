"use client";

import { useRef, useState } from "react";

type FileItem = { file: File; id: string };

export default function ReportAnalyzer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files,setFiles] = useState<FileItem[]>([]);
  const [name,setName] = useState("");
  const [age,setAge] = useState("");
  const [conditions,setConditions] = useState("");
  const [loading,setLoading] = useState(false);
  const [analyzed,setAnalyzed] = useState(false);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const allowed=["application/pdf","image/jpeg","image/png"];
    const next=[...list].filter(f=>allowed.includes(f.type)).map(file=>({file,id:crypto.randomUUID()}));
    setFiles(prev=>[...prev,...next]);
  }

  function removeFile(id:string){setFiles(prev=>prev.filter(x=>x.id!==id));}

  async function analyze(){
    if(!name.trim() || !age || !files.length) return;
    setLoading(true); setAnalyzed(false);
    // TODO: replace demo delay with POST /api/analyze-report.
    await new Promise(r=>setTimeout(r,1200));
    setLoading(false); setAnalyzed(true);
  }

  const ready=Boolean(name.trim() && age && files.length);

  return <div className="card">
    <div className="grid">
      <div className="field"><label>Patient name *</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. John Smith"/></div>
      <div className="field"><label>Age *</label><input value={age} onChange={e=>setAge(e.target.value)} type="number" min="0" max="120" placeholder="Age"/></div>
    </div>

    <div className="field">
      <label>Known diseases or health conditions</label>
      <textarea value={conditions} onChange={e=>setConditions(e.target.value)} placeholder="Example: diabetes, hypertension, asthma. Leave empty if none are known."/>
      <div className="hint">This information will provide context to the future AI analysis.</div>
    </div>

    <div className="field">
      <label>Medical report *</label>
      <label className="upload" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();addFiles(e.dataTransfer.files)}} htmlFor="report-files">
        <div style={{fontSize:30}}>📄</div><b>Choose PDF or image files</b>
        <div className="hint">PDF, JPG, JPEG, PNG</div>
        <input id="report-files" ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={e=>addFiles(e.target.files)}/>
      </label>
      <div className="files">{files.map(x=><div className="file" key={x.id}><span>📄 {x.file.name}</span><button type="button" onClick={()=>removeFile(x.id)}>×</button></div>)}</div>
    </div>

    <button className="btn analyze" disabled={!ready || loading} onClick={analyze}>{loading ? "Reading report…" : "✦ Analyze My Report"}</button>

    {loading && <div className="loading">Extracting report information and preparing a patient-friendly explanation…</div>}

    {analyzed && <div className="result">
      <div className="summary"><b>Report prepared for {name}, age {age}.</b><br/><small>Prototype response. Connect the API route to generate real report-specific analysis.</small></div>
      <div className="results">
        <div className="box full"><h3>🧠 What does the report say?</h3><p>The production AI will extract exact test names, values, units and reference ranges and explain each result in simple language.</p></div>
        <div className="box"><h3>🔎 Important findings</h3><ul><li>Exact abnormal or notable results.</li><li>Plain-language explanations.</li><li>Comparison with stated reference ranges.</li></ul></div>
        <div className="box warn"><h3>💡 Precautions</h3><ul><li>Discuss results outside the stated range with your clinician.</li><li>Do not change medication based only on AI output.</li><li>Keep older reports for trend comparison.</li></ul></div>
        <div className="box full"><h3>🩺 Questions for your doctor</h3><p>The production AI will generate questions based on actual findings and patient context.</p></div>
        <div className="box danger full"><h3>⚠️ Medical notice</h3><p>This tool is educational and does not diagnose or replace a healthcare professional. Severe or urgent symptoms require appropriate medical care.</p></div>
      </div>
    </div>}
  </div>;
}
