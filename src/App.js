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
    if (msg.includes("CRITICAL")) {
      return formatMessage(msg.replace("CRITICAL", "CRITICAL ALERT"));
    }
    return msg;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2 style={{ color: 'red' }}>Live System Logs ({logs.length} events)</h2>

      <div style={{ height: '600px', overflowY: 'auto', border: '1px solid #333' }}>
        <ul>
          {logs.map((log) => (
            <li key={log.id} style={{ padding: '4px 0', borderBottom: '1px solid #eee' }}>
              <strong>[{log.timestamp}]</strong> {formatMessage(log.message)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
