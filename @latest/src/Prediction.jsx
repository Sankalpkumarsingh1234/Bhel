import axios from 'axios';
import { useState } from 'react';

export default function Prediction({ email }) {
  const [type, setType] = useState("H");
  const [airTemp, setAirTemp] = useState(300);
  const [processTemp, setProcessTemp] = useState(320);
  const [rpm, setRpm] = useState(1500);
  const [torque, setTorque] = useState(40);
  const [wear, setWear] = useState(50);
  const [result, setResult] = useState("");

  const handlePredict = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("http://localhost:8501/predict", {
        type,
        air_temp: airTemp,
        process_temp: processTemp,
        rpm,
        torque,
        wear,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setResult(res.data.prediction);
    } catch (err) {
      console.error(err);
      setResult("Prediction failed");
    }
  };

  return (
    <div>
      <h2>Predict Machine Failure</h2>

      <label>Type:</label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="H">H</option>
        <option value="L">L</option>
        <option value="M">M</option>
      </select><br />

      <label>Air Temp:</label>
      <input type="number" value={airTemp} onChange={e => setAirTemp(e.target.value)} /><br />

      <label>Process Temp:</label>
      <input type="number" value={processTemp} onChange={e => setProcessTemp(e.target.value)} /><br />

      <label>RPM:</label>
      <input type="number" value={rpm} onChange={e => setRpm(e.target.value)} /><br />

      <label>Torque:</label>
      <input type="number" value={torque} onChange={e => setTorque(e.target.value)} /><br />

      <label>Tool Wear:</label>
      <input type="number" value={wear} onChange={e => setWear(e.target.value)} /><br />

      <button onClick={handlePredict}>Predict</button>

      {result && <p><strong>Prediction:</strong> {result}</p>}
    </div>
  );
}