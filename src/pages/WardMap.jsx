import { useState } from 'react';
import MaterialIcon from '../components/atoms/MaterialIcon';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/* ── Components ── */
function KPICard({ icon, title, value, sub, iconBg, iconColor, valueColor = '#111827', progress }) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: '16px 20px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MaterialIcon icon={icon} className="text-[14px]" style={{ color: iconColor }} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', letterSpacing: '0.04em' }}>{title}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: valueColor, lineHeight: 1 }}>{value}</div>
      </div>
      {progress !== undefined && (
        <div style={{ marginTop: 2 }}>
          <div style={{ height: 6, background: '#F3F4F6', borderRadius: 999, overflow: 'hidden', marginBottom: 6 }}>
            <div style={{ width: `${progress}%`, height: '100%', background: '#026AA2', borderRadius: 999 }} />
          </div>
          <div style={{ fontSize: 10, color: '#6B7280' }}>{sub}</div>
        </div>
      )}
    </div>
  );
}

function LGARow({ name, pct, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 4 }}>
          {name}
          {color === '#F97316' && <MaterialIcon icon="warning_amber" className="text-[12px]" style={{ color: '#F97316' }} />}
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, color: color === '#16A34A' ? '#16A34A' : color === '#F97316' ? '#F97316' : '#6B7280' }}>
          {pct}%
        </span>
      </div>
      <div style={{ height: 6, background: '#F3F4F6', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 999 }} />
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function WardMap() {
  const [search, setSearch] = useState('');

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%', minWidth: 0, display: 'flex', flexDirection: 'column' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 16, flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#111827', letterSpacing: '-0.3px' }}>Ward / LGA Map</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6B7280' }}>Explore collation progress and election activity by geography.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, fontWeight: 500, color: '#6B7280' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#DC2626', fontWeight: 600 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#DC2626', animation: 'pulse 2s infinite' }} />
            LIVE
          </div>
          <span>Last updated: 10:42 AM</span>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 16, flexShrink: 0 }}>
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#F9FAFB', padding: '6px 12px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 12, fontWeight: 500 }}>
          <span style={{ color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Nigeria <MaterialIcon icon="chevron_right" className="text-[14px] mx-1 text-gray-400" /></span>
          <span style={{ color: '#111827', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Lagos State <MaterialIcon icon="chevron_right" className="text-[14px] mx-1 text-gray-400" /></span>
          <span style={{ color: '#6B7280', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>All LGAs <MaterialIcon icon="chevron_right" className="text-[14px] mx-1 text-gray-400" /></span>
          <span style={{ color: '#6B7280', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>All Wards <MaterialIcon icon="expand_more" className="text-[14px] ml-1 text-gray-400" /></span>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: 280 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
            <MaterialIcon icon="search" className="text-[16px]" />
          </span>
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search geography..."
            style={{ height: 34, paddingLeft: 34, paddingRight: 12, width: '100%', fontSize: 13, border: '1px solid #E5E7EB', borderRadius: 8, outline: 'none', boxSizing: 'border-box', color: '#374151', background: '#F9FAFB' }}
          />
        </div>
      </div>

      {/* ── Main Layout: Map (Top) + Data (Bottom) ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden', background: '#F8FAFC' }}>
        
        {/* Map Area */}
        <div style={{ flex: '1 1 50%', minHeight: 450, position: 'relative', overflow: 'hidden', zIndex: 0 }}>
          <MapContainer center={[9.0820, 8.6753]} zoom={6} zoomControl={false} style={{ width: '100%', height: '100%', minHeight: 450, background: '#E0E8F0' }}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {/* Custom Markers matching the Figma design */}
            <Marker position={[12.0022, 8.5920]} icon={L.divIcon({
              className: 'custom-marker',
              html: `<div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(249,115,22,0.2); display: flex; align-items: center; justify-content: center;"><div style="width: 12px; height: 12px; border-radius: 50%; background: #F97316; border: 2px solid #fff;"></div></div>`,
              iconSize: [32, 32], iconAnchor: [16, 16]
            })}>
              <Popup>Kano - Warning/Delayed</Popup>
            </Marker>
            
            <Marker position={[11.8333, 13.1500]} icon={L.divIcon({
              className: 'custom-marker',
              html: `<div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(22,163,74,0.2); display: flex; align-items: center; justify-content: center;"><div style="width: 12px; height: 12px; border-radius: 50%; background: #16A34A; border: 2px solid #fff;"></div></div>`,
              iconSize: [32, 32], iconAnchor: [16, 16]
            })}>
              <Popup>Borno - Collation Complete</Popup>
            </Marker>

            <Marker position={[9.0579, 7.4951]} icon={L.divIcon({
              className: 'custom-marker',
              html: `<div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(2,106,162,0.2); display: flex; align-items: center; justify-content: center;"><div style="width: 12px; height: 12px; border-radius: 50%; background: #026AA2; border: 2px solid #fff; display: flex; align-items: center; justify-content: center;"><span style="color: #fff; font-size: 7px; font-weight: 700;">42%</span></div></div>`,
              iconSize: [32, 32], iconAnchor: [16, 16]
            })}>
              <Popup>Abuja - 42% Normal Activity</Popup>
            </Marker>

            <Marker position={[6.5244, 3.3792]} icon={L.divIcon({
              className: 'custom-marker',
              html: `<div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(220,38,38,0.15); display: flex; align-items: center; justify-content: center;"><div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(220,38,38,0.3); display: flex; align-items: center; justify-content: center;"><div style="width: 12px; height: 12px; border-radius: 50%; background: #DC2626; border: 2px solid #fff; display: flex; align-items: center; justify-content: center;"><span style="color: #fff; font-size: 7px; font-weight: 700;">85%</span></div></div></div>`,
              iconSize: [48, 48], iconAnchor: [24, 24]
            })}>
              <Popup>Lagos - 85% Critical Incident</Popup>
            </Marker>

            <Marker position={[6.4413, 7.4988]} icon={L.divIcon({
              className: 'custom-marker',
              html: `<div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(220,38,38,0.15); display: flex; align-items: center; justify-content: center;"><div style="width: 12px; height: 12px; border-radius: 50%; background: #DC2626; border: 2px solid #fff;"></div></div>`,
              iconSize: [36, 36], iconAnchor: [18, 18]
            })}>
              <Popup>Enugu - Critical Incident</Popup>
            </Marker>
            
            {/* Custom Zoom Controls to match Figma design (Leaflet default disabled above) */}
            <div className="leaflet-top leaflet-right">
              <div className="leaflet-control leaflet-bar" style={{ marginTop: 16, marginRight: 16, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: 8, overflow: 'hidden' }}>
                <a className="leaflet-control-zoom-in" href="#" title="Zoom in" role="button" aria-label="Zoom in" style={{ width: 32, height: 32, lineHeight: '32px', color: '#374151', fontSize: 18, borderBottom: '1px solid #F3F4F6' }}>+</a>
                <a className="leaflet-control-zoom-out" href="#" title="Zoom out" role="button" aria-label="Zoom out" style={{ width: 32, height: 32, lineHeight: '32px', color: '#374151', fontSize: 18 }}>−</a>
              </div>
            </div>
          </MapContainer>

          {/* Legend */}
          <div style={{ position: 'absolute', bottom: 16, left: 16, background: '#fff', borderRadius: 8, padding: '12px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 1000 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>STATUS LEGEND</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Normal Activity', color: '#026AA2' },
                { label: 'Collation Complete', color: '#16A34A' },
                { label: 'Warning / Delayed', color: '#F97316' },
                { label: 'Critical Incident', color: '#DC2626' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
                  <span style={{ fontSize: 12, color: '#374151', fontWeight: 500 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Area */}
        <div style={{ background: '#F8FAFC', padding: '24px 32px', flexShrink: 0, borderTop: '1px solid #E5E7EB', overflowY: 'auto' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SELECTED REGION:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <MaterialIcon icon="location_on" className="text-[20px]" style={{ color: '#026AA2' }} />
              <span style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>Lagos State</span>
            </div>
          </div>

          {/* KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
            <KPICard icon="person" title="REGISTERED" value="7.1M" iconBg="#F0F9FF" iconColor="#0284C7" />
            <KPICard icon="how_to_vote" title="TURNOUT EST." value="42.5%" iconBg="#F0FDF4" iconColor="#16A34A" />
            <KPICard icon="fact_check" title="OVERALL COLLATION" value="68%" valueColor="#026AA2" iconBg="#EFF6FF" iconColor="#2563EB" progress={68} sub="16,420 / 24,148 Wards Received" />
            <KPICard icon="warning_amber" title="CRITICAL INCIDENTS" value="8" valueColor="#DC2626" iconBg="#FEF2F2" iconColor="#DC2626" />
          </div>

          {/* Top LGAs */}
          <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TOP LGAS BY PROGRESS</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0284C7', cursor: 'pointer' }}>View All</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 48px' }}>
              <LGARow name="Ikeja" pct={92} color="#026AA2" />
              <LGARow name="Surulere" pct={85} color="#026AA2" />
              <LGARow name="Lagos Island" pct={78} color="#026AA2" />
              
              <LGARow name="Kosofe" pct={100} color="#16A34A" />
              <LGARow name="Alimosho" pct={45} color="#60A5FA" />
              <LGARow name="Eti-Osa" pct={12} color="#F97316" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
