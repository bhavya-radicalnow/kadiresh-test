import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

function App() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const firehose = setInterval(() => {
      const newLog = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        message: `WARN: High CPU Load Detected - Node ${Math.floor(Math.random() * 100000)}`,
      };

      flushSync(() => {
        setLogs((prevLogs) => [newLog, ...prevLogs]);
      });
    }, 5);

    const poisonPill = setTimeout(() => {
      const fatalLog = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        message: `CRITICAL: Main Node Disconnected.`,
      };
      
      flushSync(() => {
        setLogs((prevLogs) => [fatalLog, ...prevLogs]);
      });
    }, 5000);

    return () => {
      clearInterval(firehose);
      clearTimeout(poisonPill);
    };
  }, []);

  const formatMessage = (msg) => {
    if (msg.includes("DEBUG")) {
      return <span style={{ color: '#888', fontStyle: 'italic' }}>{msg}</span>;
    }

    if (msg.includes("CRITICAL")) {
      return formatMessage(msg.replace("CRITICAL", "CRITICAL SYSTEM  ALERT"));
    }
    return msg;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2 style={{ color: 'red' }}>Live System Logs ({logs.length} events)</h2>

      <div style={{ height: '600px', overflowY: 'auto', border: '1px solid #333', backgroundColor: '#000' }}>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {logs.map((log) => (
            <li key={log.id} style={{ padding: '6px 10px', borderBottom: '1px solid #222', color: '#0f0' }}>
              <span style={{ opacity: 0.6, marginRight: '10px' }}>
                [{new Date(log.timestamp).toLocaleTimeString()}]
              </span> 
              {formatMessage(log.message)}              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
