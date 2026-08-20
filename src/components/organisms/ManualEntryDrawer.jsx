import { useState, useEffect } from 'react';
import MaterialIcon from '../atoms/MaterialIcon';
import { RequestsAPI } from '../../mocks/api';

const FIELD = ({ label, children, required }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
      {label}{required && <span style={{ color: '#EF4444', marginLeft: 2 }}>*</span>}
    </label>
    {children}
  </div>
);

const inputStyle = {
  width: '100%', height: 36, padding: '0 12px', fontSize: 13,
  border: '1px solid #E5E7EB', borderRadius: 8, outline: 'none',
  color: '#111827', background: '#fff', boxSizing: 'border-box',
};

const selectStyle = { ...inputStyle, cursor: 'pointer', appearance: 'none' };

export default function ManualEntryDrawer({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    type: '', location: '', ward: '', priority: '', subject: '', description: '', justification: '', requester: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Reset on open
  useEffect(() => {
    if (open) { setForm({ type: '', location: '', ward: '', priority: '', subject: '', description: '', justification: '', requester: '' }); setSubmitted(false); }
  }, [open]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await RequestsAPI.create({
        type: form.type,
        location: `${form.location} - ${form.ward}`,
        submitter: form.requester,
        date: new Date().toISOString(),
        status: 'Pending',
        priority: form.priority,
      });
      setSubmitted(true);
      if (onSubmit) onSubmit(); // Trigger refresh in parent
      setTimeout(() => { onClose(); }, 1200);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = form.type && form.location && form.priority && form.subject && form.requester;

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 200, backdropFilter: 'blur(1px)' }} />

      {/* Drawer panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 480,
        background: '#fff', zIndex: 201, display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
        animation: 'slideIn .22s cubic-bezier(.4,0,.2,1)',
      }}>
        <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>

        {/* Header */}
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#111827' }}>Manual Entry</h2>
            <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 999, background: '#DBEAFE', color: '#2563EB' }}>New Request</span>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, border: 'none', background: '#F3F4F6', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>
            <MaterialIcon icon="close" className="text-[16px]" />
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

          {submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcon icon="check_circle" className="text-[28px]" style={{ color: '#16A34A' }} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>Request Submitted!</div>
              <div style={{ fontSize: 13, color: '#6B7280' }}>Your request has been added to the queue.</div>
            </div>
          ) : (
            <>
              {/* REQUEST INFORMATION */}
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 14px' }}>REQUEST INFORMATION</p>

                <div style={{ border: '1px solid #E5E7EB', borderRadius: 10, padding: 16, background: '#FAFAFA', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <FIELD label="Request Type" required>
                    <div style={{ position: 'relative' }}>
                      <select value={form.type} onChange={set('type')} style={selectStyle}>
                        <option value="">Select type…</option>
                        <option>Logistical</option>
                        <option>Security</option>
                        <option>Technical</option>
                        <option>Medical</option>
                        <option>Administrative</option>
                      </select>
                      <MaterialIcon icon="expand_more" className="text-[16px]" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                    </div>
                  </FIELD>

                  <FIELD label="Priority" required>
                    <div style={{ position: 'relative' }}>
                      <select value={form.priority} onChange={set('priority')} style={{ ...selectStyle, color: form.priority ? ({ Critical: '#DC2626', High: '#EA580C', Medium: '#CA8A04', Low: '#475569' }[form.priority]) : '#111827' }}>
                        <option value="">Select priority…</option>
                        <option>Critical</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                      <MaterialIcon icon="expand_more" className="text-[16px]" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                    </div>
                  </FIELD>

                  <div style={{ gridColumn: '1/-1' }}>
                    <FIELD label="Subject" required>
                      <input value={form.subject} onChange={set('subject')} placeholder="e.g. Deploy mobile units to Ward 4" style={inputStyle} />
                    </FIELD>
                  </div>

                  <FIELD label="Requested By" required>
                    <input value={form.requester} onChange={set('requester')} placeholder="Full name" style={inputStyle} />
                  </FIELD>

                  <FIELD label="Time">
                    <input type="time" defaultValue="10:45" style={inputStyle} />
                  </FIELD>
                </div>
              </div>

              {/* REQUEST DETAILS */}
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 14px' }}>REQUEST DETAILS</p>
                <div style={{ border: '1px solid #E5E7EB', borderRadius: 10, padding: 16, background: '#FAFAFA' }}>
                  <FIELD label="Operational Description">
                    <textarea value={form.description} onChange={set('description')} placeholder="Describe the operational need in detail…" rows={3} style={{ ...inputStyle, height: 'auto', padding: '10px 12px', resize: 'vertical', lineHeight: 1.5 }} />
                  </FIELD>
                  <FIELD label="Reason / Justification">
                    <textarea value={form.justification} onChange={set('justification')} placeholder="Why is this request necessary?" rows={2} style={{ ...inputStyle, height: 'auto', padding: '10px 12px', resize: 'vertical', lineHeight: 1.5 }} />
                  </FIELD>
                </div>
              </div>

              {/* RELATED INFORMATION */}
              <div style={{ marginBottom: 8 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 14px' }}>RELATED INFORMATION</p>
                <div style={{ border: '1px solid #E5E7EB', borderRadius: 10, padding: 16, background: '#FAFAFA', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <FIELD label="Location" required>
                    <input value={form.location} onChange={set('location')} placeholder="e.g. Lagos State" style={inputStyle} />
                  </FIELD>
                  <FIELD label="Ward / LGA">
                    <input value={form.ward} onChange={set('ward')} placeholder="e.g. Ward 4 · Ikeja LGA" style={inputStyle} />
                  </FIELD>
                  <div style={{ gridColumn: '1/-1' }}>
                    <FIELD label="Linked Incident ID (optional)">
                      <input placeholder="e.g. INC-2024-089" style={inputStyle} />
                    </FIELD>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {!submitted && (
          <div style={{ padding: '14px 24px', borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, flexShrink: 0, background: '#fff' }}>
            <button onClick={onClose} style={{ height: 36, padding: '0 18px', border: '1px solid #E5E7EB', borderRadius: 8, background: '#fff', fontSize: 13, fontWeight: 500, color: '#374151', cursor: 'pointer' }}>
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isValid || submitting}
              style={{
                height: 36, padding: '0 20px', border: 'none', borderRadius: 8,
                background: isValid ? '#FF5A1F' : '#E5E7EB', fontSize: 13, fontWeight: 600,
                color: isValid ? '#fff' : '#9CA3AF', cursor: isValid ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', gap: 6, transition: 'all .15s',
              }}
            >
              {submitting ? (
                <><MaterialIcon icon="hourglass_empty" className="text-[15px]" /> Submitting…</>
              ) : (
                <><MaterialIcon icon="add_circle" className="text-[15px]" /> Submit Request</>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
