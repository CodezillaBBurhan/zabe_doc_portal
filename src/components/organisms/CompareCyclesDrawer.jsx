import MaterialIcon from '../atoms/MaterialIcon';

export default function CompareCyclesDrawer({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 999, transition: 'opacity 0.3s' }} 
      />
      
      {/* Drawer */}
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 700, background: '#fff', zIndex: 1000, display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 24px rgba(0,0,0,0.1)' }}>
        
        {/* Header */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F9FAFB' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#111827' }}>Compare Cycles</h2>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6B7280' }}>Detailed metric comparison across selected election years.</p>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: '50%', background: '#E5E7EB', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4B5563', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#D1D5DB'} onMouseLeave={(e) => e.currentTarget.style.background = '#E5E7EB'}>
            <MaterialIcon icon="close" className="text-[18px]" />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          {data.length < 2 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6B7280' }}>
              <MaterialIcon icon="info" className="text-[48px] text-gray-300 mb-4" />
              <div style={{ fontSize: 16, fontWeight: 600, color: '#374151' }}>Not enough data to compare</div>
              <p style={{ fontSize: 13, marginTop: 8 }}>Please select at least two election cycles in the filters to see a comparison.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              
              {/* Metric 1: Turnout % */}
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Turnout Percentage</h3>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: 8 }}>
                  {data.map(cycle => (
                    <div key={cycle.cycle} style={{ flex: '1 1 0', minWidth: 140, background: '#F8FAFC', padding: 20, borderRadius: 12, border: '1px solid #E5E7EB' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 8 }}>{cycle.cycle} <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>{cycle.type}</span></div>
                      <div style={{ fontSize: 28, fontWeight: 800, color: '#FF5A1F' }}>{cycle.turnout}</div>
                      <div style={{ marginTop: 12, height: 6, background: '#E2E8F0', borderRadius: 999, overflow: 'hidden' }}>
                        <div style={{ width: cycle.turnout, height: '100%', background: '#FF5A1F', borderRadius: 999 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metric 2: Total vs Valid vs Rejected */}
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Vote Distribution</h3>
                <div style={{ border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden', overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 500 }}>
                    <thead style={{ background: '#F9FAFB' }}>
                      <tr>
                        <th style={{ padding: '12px 16px', fontSize: 11, fontWeight: 600, color: '#6B7280' }}>METRIC</th>
                        {data.map(cycle => (
                          <th key={cycle.cycle} style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: '#111827' }}>{cycle.cycle}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderTop: '1px solid #E5E7EB' }}>
                        <td style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#4B5563', background: '#F9FAFB' }}>Total Votes</td>
                        {data.map(cycle => <td key={cycle.cycle} style={{ padding: '14px 16px', fontSize: 13, color: '#111827', fontWeight: 600 }}>{cycle.total}</td>)}
                      </tr>
                      <tr style={{ borderTop: '1px solid #E5E7EB' }}>
                        <td style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#4B5563', background: '#F9FAFB' }}>Valid Votes</td>
                        {data.map(cycle => <td key={cycle.cycle} style={{ padding: '14px 16px', fontSize: 13, color: '#16A34A', fontWeight: 600 }}>{cycle.valid}</td>)}
                      </tr>
                      <tr style={{ borderTop: '1px solid #E5E7EB' }}>
                        <td style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#4B5563', background: '#F9FAFB' }}>Rejected Votes</td>
                        {data.map(cycle => <td key={cycle.cycle} style={{ padding: '14px 16px', fontSize: 13, color: '#DC2626', fontWeight: 600 }}>{cycle.rejected}</td>)}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Metric 3: Party Performance & Margin */}
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Winning Party & Change</h3>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: 8 }}>
                  {data.map(cycle => (
                    <div key={cycle.cycle} style={{ flex: '1 1 0', minWidth: 140, display: 'flex', flexDirection: 'column', gap: 12, background: '#fff', padding: 16, borderRadius: 12, border: '1px solid #E5E7EB' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: '50%', background: cycle.party === 'APC' ? '#E0F2FE' : '#DCFCE7', border: cycle.party === 'APC' ? '1px solid #BAE6FD' : '1px solid #BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: cycle.party === 'APC' ? '#0284C7' : '#16A34A' }}>
                          {cycle.party}
                        </div>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>{cycle.cycle} Winner</div>
                          <div style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>{cycle.party}</div>
                        </div>
                      </div>
                      <div style={{ borderTop: '1px dashed #E5E7EB', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 12, color: '#6B7280' }}>Change vs Prev</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: cycle.change.includes('↓') ? '#DC2626' : '#6B7280' }}>{cycle.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}
