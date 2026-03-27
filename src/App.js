import React, { useState, useEffect } from 'react';
import { List } from 'react-window';

const Row = React.memo(({ index, style, ariaAttributes, logs }) => {
  const log = logs[index];
  if (!log) return null;
  return (
    <div style={style} {...ariaAttributes}>
      <div style={{ padding: '4px 0', borderBottom: '1px solid #eee' }}>
        <strong>[{log.timestamp}]</strong> {log.message}
      </div>
    </div>
  );
});

function App() {
  const [logs, setLogs] = useState(() => {
    // Reduced stress test volume to 50,000 for development stability
    return Array.from({ length: 50000 }, (_, i) => ({
      id: `initial-${i}`,
      timestamp: new Date().toISOString(),
      message: `INITIAL LOG: System Node ${i} - Operational`,
    }));
  });

  useEffect(() => {
    const firehose = setInterval(() => {
      const newLogs = Array.from({ length: 50 }, () => ({
        id: `${Date.now()}-${Math.random()}`,
        timestamp: new Date().toISOString(),
        message: `WARN: High CPU Load Detected - Node ${Math.floor(Math.random() * 100000)}`,
      }));

      setLogs((prevLogs) => [...newLogs, ...prevLogs].slice(0, 100000)); // Cap at 100,000
    }, 5000); // Increased interval to 5s to further reduce render frequency

    return () => {
      clearInterval(firehose);
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

// TEST CHANGE COMMIT
export default App;
