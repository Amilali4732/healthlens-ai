import ReportAnalyzer from "@/components/ReportAnalyzer";

export default function Home(){
  return <>
    <nav className="nav">
      <div className="brand"><b>+</b>HealthLens</div>
      <div className="navlinks"><a href="#analyze">Analyze</a><a href="#how">How it works</a></div>
    </nav>

    <section className="hero">
      <div><span className="tag">✦ AI-powered health report assistant</span>
        <h1>Understand your <span>health reports.</span></h1>
        <p>Upload a medical report and turn complicated results into clear, patient-friendly explanations, important findings and questions for your healthcare professional.</p>
        <button className="btn" onClick={()=>document.getElementById("analyze")?.scrollIntoView({behavior:"smooth"})}>Analyze My Report →</button>
      </div>
      <div className="preview"><div className="mockhead"><b>Example blood report</b><small>AI preview</small></div>
        <div className="metric"><small>HbA1c</small><strong>6.4%</strong><small>Average glucose marker</small></div>
        <div className="metric"><small>LDL Cholesterol</small><strong>142 mg/dL</strong><small>May need discussion</small></div>
        <div className="metric"><small>Hemoglobin</small><strong>14.2 g/dL</strong><small>Example result</small></div>
        <div className="ai"><b>✦ AI explanation</b><br/>Important results can be explained in simple language.</div>
      </div>
    </section>

    <section className="section" id="analyze"><div className="heading"><h2>Analyze a report</h2><p>Enter patient information and upload PDF or report images.</p></div><ReportAnalyzer/></section>

    <section className="section" id="how"><div className="heading"><h2>How it works</h2><p>Simple for patients, structured for the AI.</p></div>
      <div className="features"><div className="box"><h3>1. Upload</h3><p>Upload a PDF, scan or photo.</p></div><div className="box"><h3>2. AI reads</h3><p>Extract results and relevant context.</p></div><div className="box"><h3>3. Understand</h3><p>Explain findings and prepare questions for the clinician.</p></div></div>
    </section>
    <footer><div className="brand">＋ HealthLens</div><small>AI health report assistant prototype. Not a medical diagnostic tool.</small></footer>
  </>;
}
