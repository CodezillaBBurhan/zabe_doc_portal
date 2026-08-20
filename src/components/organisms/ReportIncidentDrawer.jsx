import { useState, useEffect } from 'react';
import MaterialIcon from '../atoms/MaterialIcon';

const inputStyle = { width: '100%', height: 36, padding: '0 12px', fontSize: 13, border: '1px solid #E5E7EB', borderRadius: 8, outline: 'none', color: '#111827', background: '#fff', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 };
const Field = ({ label, required, children }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={labelStyle}>{label}{required && <span style={{ color: '#EF4444', marginLeft: 2 }}>*</span>}</label>
    {children}
  </div>
);

export default function ReportIncidentDrawer({ open, onClose }) {
  const [form, setForm] = useState({ category: '', severity: '', location: '', ward: '', description: '', reporter: '', time: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { if (open) { setForm({ category: '', severity: '', location: '', ward: '', description: '', reporter: '', time: '' }); setSubmitted(false); } }, [open]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isValid = form.category && form.severity && form.location && form.description && form.reporter;

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); setTimeout(onClose, 1200); }, 900);
  };

  if (!open) return null;

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 200, backdropFilter: 'blur(1px)' }} />
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 480, background: '#fff', zIndex: 201, display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 32px rgba(0,0,0,0.12)', animation: 'slideIn .22s cubic-bezier(.4,0,.2,1)' }}>
        <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>

        {/* Header */}
        <div style={{ padding: '18px 22px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MaterialIcon icon="warning_amber" className="text-[17px]" style={{ color: '#DC2626' }} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#111827' }}>Report Incident</h2>
              <p style={{ margin: 0, fontSize: 11, color: '#9CA3AF' }}>Create a new incident report</p>
            </div>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, border: 'none', background: '#F3F4F6', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>
            <MaterialIcon icon="close" className="text-[16px]" />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px' }}>
          {submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcon icon="check_circle" className="text-[28px]" style={{ color: '#16A34A' }} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>Incident Reported!</div>
              <div style={{ fontSize: 13, color: '#6B7280' }}>The incident has been logged and assigned.</div>
            </div>
          ) : (
            <>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 14px' }}>INCIDENT INFORMATION</p>
              <div style={{ border: '1px solid #E5E7EB', borderRadius: 10, padding: 16, background: '#FAFAFA', marginBottom: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <Field label="Category" required>
                    <div style={{ position: 'relative' }}>
                      <select value={form.category} onChange={set('category')} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', paddingRight: 28 }}>
                        <option value="">Select…</option>
                        <option>Security</option><option>Technical</option>
                        <option>Logistics</option><option>Results</option><option>Others</option>
                      </select>
                      <MaterialIcon icon="expand_more" className="text-[14px]" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                    </div>
                  </Field>
                  <Field label="Severity" required>
                    <div style={{ position: 'relative' }}>
                      <select value={form.severity} onChange={set('severity')} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', paddingRight: 28 }}>
                        <option value="">Select…</option>
                        <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
                      </select>
                      <MaterialIcon icon="expand_more" className="text-[14px]" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                    </div>
                  </Field>
                  <Field label="Reported By" required>
                    <input value={form.reporter} onChange={set('reporter')} placeholder="Full name" style={inputStyle} />
                  </Field>
                  <Field label="Time Detected">
                    <input type="time" value={form.time} onChange={set('time')} style={inputStyle} />
                  </Field>
                </div>
              </div>

              <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 14px' }}>LOCATION</p>
              <div style={{ border: '1px solid #E5E7EB', borderRadius: 10, padding: 16, background: '#FAFAFA', marginBottom: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <Field label="State / LGA" required>
                    <input value={form.location} onChange={set('location')} placeholder="e.g. Abuja, Central" style={inputStyle} />
                  </Field>
                  <Field label="Ward / Unit">
                    <input value={form.ward} onChange={set('ward')} placeholder="e.g. Ward 4" style={inputStyle} />
                  </Field>
                </div>
              </div>

              <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 14px' }}>DESCRIPTION</p>
              <div style={{ border: '1px solid #E5E7EB', borderRadius: 10, padding: 16, background: '#FAFAFA' }}>
                <Field label="Incident Description" required>
                  <textarea value={form.description} onChange={set('description')} rows={4} placeholder="Describe what happened in detail…" style={{ ...inputStyle, height: 'auto', padding: '10px 12px', resize: 'vertical', lineHeight: 1.6 }} />
                </Field>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div style={{ padding: '14px 22px', borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, flexShrink: 0 }}>
            <button onClick={onClose} style={{ height: 36, padding: '0 18px', border: '1px solid #E5E7EB', borderRadius: 8, background: '#fff', fontSize: 13, fontWeight: 500, color: '#374151', cursor: 'pointer' }}>Cancel</button>
            <button onClick={handleSubmit} disabled={!isValid || submitting} style={{ height: 36, padding: '0 20px', border: 'none', borderRadius: 8, background: isValid ? '#FF5A1F' : '#E5E7EB', fontSize: 13, fontWeight: 600, color: isValid ? '#fff' : '#9CA3AF', cursor: isValid ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: 6 }}>
              {submitting ? <><MaterialIcon icon="hourglass_empty" className="text-[14px]" /> Submitting…</> : <><MaterialIcon icon="warning_amber" className="text-[14px]" /> Submit Report</>}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
