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

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2 style={{ color: 'red' }}>Live System Logs ({logs.length} events)</h2>

      <div style={{ border: '1px solid #333' }}>
        <List
          style={{ height: '600px', width: '100%' }}
          rowCount={logs.length}
          rowHeight={35}
          rowProps={{ logs }}
          rowComponent={Row}
        />
      </div>
    </div>
  );
}

// TEST CHANGE COMMIT
export default App;
