import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Eye, Plus, Minus, Save } from 'lucide-react';
import { PublicLinksAPI } from '../mocks/api';
import ConfirmDialog from '../components/organisms/ConfirmDialog';

const CreatePublicLink = () => {
  const navigate = useNavigate();
  const [linkName, setLinkName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!linkName.trim()) return;
    setIsSubmitting(true);
    try {
      await PublicLinksAPI.create({
        name: linkName,
        url: `elec.tn/${linkName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        createdBy: 'Admin', // mock user
        views: 0,
        status: 'Active',
        createdOn: new Date().toISOString().split('T')[0]
      });
      navigate('/links');
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full pb-12">
      {/* Header Section */}
      <div className="flex items-start gap-4 mb-8">
        <button
          onClick={() => navigate('/links')}
          className="w-10 h-10 flex items-center justify-center bg-surface-container-lowest shadow-sm rounded-lg text-on-surface hover:bg-surface-container transition-colors shrink-0 mt-1"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center font-body-sm text-body-sm text-secondary mb-2">
            <span
              className="cursor-pointer hover:text-on-surface transition-colors"
              onClick={() => navigate('/links')}
            >
              Public Links
            </span>
            <ChevronRight className="w-3.5 h-3.5 mx-1" />
            <span className="text-brand-orange font-medium">Create Public Link</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Create Public Link</h1>
          <p className="font-body-md text-body-md text-secondary">Configure and preview an operational data view for external sharing.</p>
        </div>
      </div>

      {/* Link Name Input Card */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm p-6 mb-6">
        <label className="block font-label-md text-label-md text-on-surface mb-2">
          Link Name
        </label>
        <input
          type="text"
          value={linkName}
          onChange={(e) => setLinkName(e.target.value)}
          placeholder="Enter public link name"
          className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-on-surface placeholder:text-secondary"
        />
      </div>

      {/* Operational Preview Card */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden mb-6 flex flex-col">
        <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/50">
          <div className="flex items-center gap-2 text-on-surface font-label-md text-label-md">
            <Eye className="w-4 h-4 text-secondary" />
            Operational Preview
          </div>
          <div className="px-2.5 py-1 bg-secondary-container/50 text-secondary font-label-md text-[11px] uppercase tracking-wider rounded-md font-semibold">
            Preview Mode
          </div>
        </div>

        {/* Preview Area */}
        <div
          className="relative w-full py-16 px-4 sm:px-8 flex items-center xl:justify-center overflow-x-auto bg-cover bg-center min-h-[900px]"
        >
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 flex flex-col shadow-lg rounded-md overflow-hidden bg-white z-10 border border-gray-100">
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-b border-gray-100 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* Dashboard Mockup Image */}
          <div className="relative w-[1200px] h-[750px] shrink-0 bg-[#f4f6f8] rounded-xl shadow-2xl overflow-hidden border border-white/60 flex flex-col z-10 p-4 gap-3">

            {/* Header Row */}
            <div className="flex justify-between items-start gap-4">
              {/* Title & Progress */}
              <div className="flex-1">
                <h2 className="text-[12px] font-bold text-gray-800 tracking-tight flex items-center gap-1.5">
                  2027 Presidential Election <span className="text-gray-400 font-normal">— Live Collation</span>
                </h2>
                <p className="text-[7px] text-gray-500 mt-0.5">October 26, 2027 | 22:14:30 WAT</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 w-[86%]"></div>
                  </div>
                </div>
              </div>

              {/* Candidates */}
              <div className="flex gap-1.5">
                {[1, 2, 3].map((c) => (
                  <div key={c} className="bg-white rounded p-1.5 border border-gray-100 flex items-center gap-1.5 min-w-[70px]">
                    <div className={`w-4 h-4 rounded-full ${c === 1 ? 'bg-blue-100' : 'bg-green-100'} border border-gray-200`}></div>
                    <div>
                      <div className="text-[5px] text-gray-400 font-bold uppercase leading-tight">Candidate {c}</div>
                      <div className="text-[7px] font-bold text-gray-700 leading-tight">19,228{c}</div>
                    </div>
                  </div>
                ))}
                <div className="bg-teal-500 text-white rounded p-1.5 flex items-center justify-center min-w-[70px]">
                  <span className="text-[6px] font-bold">Leading Candidate</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center"><span className="block w-2.5 h-2.5 border-2 border-gray-400 rounded-full border-t-transparent"></span></div>
                <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center"><div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div></div>
                <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center"><div className="w-2.5 h-2.5 bg-gray-800 rounded-full"></div></div>
                <div className="px-2 py-0.5 bg-red-100 text-red-500 rounded text-[6px] font-bold border border-red-200 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div> LIVE
                </div>
              </div>
            </div>

            {/* KPIs Row */}
            <div className="grid grid-cols-5 gap-2">
              {[
                { title: 'Registered Voters', val: '98,765,432', color: 'bg-blue-500', bar: '46.2%' },
                { title: 'Accredited Voters', val: '46,678,910', color: 'bg-teal-500', bar: '42.2%' },
                { title: 'Valid Votes', val: '44,321,098', color: 'bg-green-500', bar: '91.1%' },
                { title: 'Spoiled Votes', val: '357,214', color: 'bg-red-500', bar: '0.79%' },
                { title: 'Turnout Rate', val: '68.4%', color: 'bg-orange-500', isGauge: true }
              ].map((kpi, i) => (
                <div key={i} className="bg-white rounded-md p-1.5 border border-gray-100 shadow-sm flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full ${kpi.color} opacity-20 flex-shrink-0`}></div>
                  <div className="flex-1">
                    <div className="text-[6px] text-gray-500 font-semibold">{kpi.title}</div>
                    <div className="text-[10px] font-bold text-gray-800 leading-tight">{kpi.val}</div>
                    {!kpi.isGauge && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="h-1 flex-1 bg-gray-100 rounded-full"><div className={`h-full ${kpi.color} w-1/2 rounded-full`}></div></div>
                        <span className="text-[5px] text-gray-400">{kpi.bar}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Main Middle Section */}
            <div className="flex flex-1 gap-2 min-h-0">

              {/* Left Map */}
              <div className="w-5/12 bg-white rounded-md shadow-sm border border-gray-100 p-2 relative flex flex-col">
                <div className="text-[7px] font-bold text-gray-700 mb-2">State Collation %</div>
                <div className="flex-1 relative w-full min-h-[150px]">
                  <svg viewBox="0 0 200 150" className="absolute inset-0 w-full h-full opacity-80">
                    <path d="M50,40 Q80,20 120,40 T160,80 Q170,120 120,130 T40,110 Q20,70 50,40 Z" fill="#93c5fd" stroke="#3b82f6" strokeWidth="0.5" />
                    <path d="M80,45 Q90,70 70,90 Q110,120 140,90 Q130,50 100,50" fill="#3b82f6" stroke="#2563eb" strokeWidth="0.5" />
                    <path d="M70,90 Q90,110 80,125 Q50,110 45,95 Z" fill="#1e40af" stroke="#1e3a8a" strokeWidth="0.5" />
                    {/* Heat points */}
                    <circle cx="75" cy="100" r="8" fill="#ef4444" fillOpacity="0.4" />
                    <circle cx="75" cy="100" r="2" fill="#ef4444" />
                    <circle cx="100" cy="115" r="10" fill="#ef4444" fillOpacity="0.4" />
                    <circle cx="100" cy="115" r="3" fill="#ef4444" />
                    <circle cx="150" cy="85" r="6" fill="#ef4444" fillOpacity="0.4" />
                  </svg>
                </div>
                <div className="absolute bottom-2 right-2 flex gap-0.5">
                  {[0, 25, 50, 75, 100].map(v => (
                    <div key={v} className="flex flex-col items-center">
                      <div className={`w-3 h-1.5 ${v === 0 ? 'bg-blue-100' : v === 25 ? 'bg-blue-200' : v === 50 ? 'bg-blue-400' : v === 75 ? 'bg-blue-600' : 'bg-blue-800'}`}></div>
                      <span className="text-[4px] text-gray-500 mt-0.5">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle Lists */}
              <div className="w-3/12 flex flex-col gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex-1 bg-white rounded-md shadow-sm border border-gray-100 p-1.5 flex flex-col">
                    <div className="text-[6px] font-bold text-gray-700 mb-1">Polling Unit Issues</div>
                    <div className="flex-1 flex flex-col justify-center gap-1">
                      {['Reported: N', 'PU: N', 'PU: N'].map((t, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <span className="text-[5px] text-gray-500 w-8">{t}</span>
                          <div className="flex-1 h-1 bg-gray-100 rounded-full"><div className={`h-full rounded-full ${j === 0 ? 'bg-teal-400 w-3/4' : j === 1 ? 'bg-blue-400 w-1/2' : 'bg-purple-400 w-1/4'}`}></div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Lists */}
              <div className="w-4/12 flex flex-col gap-2">
                <div className="flex justify-between items-center mb-[-4px]">
                  <span className="text-[7px] font-bold text-gray-700">Top Incidences</span>
                  <span className="text-[5px] text-gray-400 underline">View All</span>
                </div>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex-1 bg-white rounded-md shadow-sm border border-gray-100 p-1.5 flex justify-between items-center">
                    <div className="flex flex-col gap-0.5 w-1/3">
                      <span className="text-[6px] font-semibold text-gray-600">Others</span>
                      <span className="text-[4px] text-gray-400">Reported: N</span>
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1 mx-2">
                      <div className="h-1 bg-teal-400 w-full rounded-full"></div>
                      <div className="h-1 bg-orange-400 w-2/3 rounded-full"></div>
                      <div className="h-1 bg-blue-400 w-1/3 rounded-full"></div>
                    </div>
                    <div className="w-1/3 text-[5px] text-gray-500 leading-tight">
                      1. Abbosin<br />2. Joka Moval
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Charts Row */}
            <div className="grid grid-cols-5 gap-2 h-24">
              <div className="bg-white rounded-md shadow-sm border border-gray-100 p-1.5 flex flex-col">
                <div className="text-[6px] font-bold text-gray-700 mb-1">Vote Trends Over Time</div>
                <div className="flex-1 relative flex items-end gap-1">
                  <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                    <path d="M0,35 L20,30 L40,25 L60,20 L80,15 L100,5" fill="none" stroke="#2dd4bf" strokeWidth="1" />
                    <path d="M0,38 L20,35 L40,30 L60,28 L80,22 L100,15" fill="none" stroke="#fb923c" strokeWidth="1" />
                    <path d="M0,40 L20,39 L40,37 L60,32 L80,30 L100,25" fill="none" stroke="#60a5fa" strokeWidth="1" />
                  </svg>
                </div>
              </div>
              <div className="bg-white rounded-md shadow-sm border border-gray-100 p-1.5 flex flex-col">
                <div className="text-[6px] font-bold text-gray-700 mb-1">Turnout by Region</div>
                <div className="flex-1 flex items-end justify-between px-1 gap-1">
                  <div className="w-full bg-blue-400 h-[40%] rounded-t-sm"></div>
                  <div className="w-full bg-teal-400 h-[60%] rounded-t-sm"></div>
                  <div className="w-full bg-purple-400 h-[80%] rounded-t-sm"></div>
                  <div className="w-full bg-orange-400 h-[50%] rounded-t-sm"></div>
                </div>
              </div>
              <div className="bg-white rounded-md shadow-sm border border-gray-100 p-1.5 flex flex-col items-center justify-center relative">
                <div className="text-[6px] font-bold text-gray-700 absolute top-1.5 left-1.5">Win Probability</div>
                <div className="w-12 h-6 border-[3px] border-gray-100 border-t-orange-400 border-r-teal-400 rounded-t-full mt-2 relative">
                  <div className="w-0.5 h-4 bg-gray-800 absolute bottom-0 left-1/2 origin-bottom rotate-[30deg]"></div>
                </div>
                <span className="text-[8px] font-bold mt-0.5">62%</span>
              </div>
              <div className="bg-white rounded-md shadow-sm border border-gray-100 p-1.5 flex flex-col">
                <div className="text-[6px] font-bold text-gray-700 mb-1">Incident Heat Map</div>
                <div className="flex-1 grid grid-cols-6 grid-rows-3 gap-px">
                  {[...Array(18)].map((_, i) => (
                    <div key={i} className={`${i % 3 === 0 ? 'bg-teal-500' : i % 5 === 0 ? 'bg-orange-400' : 'bg-teal-200'}`}></div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-md shadow-sm border border-gray-100 p-1.5 flex flex-col">
                <div className="text-[6px] font-bold text-gray-700 mb-1">Historical Comparison</div>
                <div className="flex-1 flex items-end justify-around">
                  <div className="w-3 bg-teal-400 h-[50%] rounded-t-sm"></div>
                  <div className="w-3 bg-orange-400 h-[40%] rounded-t-sm"></div>
                  <div className="w-3 bg-teal-400 h-[70%] rounded-t-sm"></div>
                  <div className="w-3 bg-orange-400 h-[80%] rounded-t-sm"></div>
                </div>
              </div>
            </div>

            {/* Bottom Tweets / Sentiment */}
            <div className="flex gap-2 h-14">
              <div className="flex-1 bg-white rounded-md shadow-sm border border-gray-100 p-1.5 flex flex-col">
                <div className="text-[6px] font-bold text-gray-700 mb-0.5">Tweets Signals</div>
                <div className="flex gap-2">
                  <div className="flex gap-1 flex-1">
                    <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                    <div className="text-[4px] text-gray-500 leading-[1.2]">Google election trees election senmmy...</div>
                  </div>
                  <div className="flex gap-1 flex-1">
                    <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                    <div className="text-[4px] text-gray-500 leading-[1.2]">Oumipier denics diavee wolf...</div>
                  </div>
                </div>
              </div>
              <div className="w-3/12 bg-white rounded-md shadow-sm border border-gray-100 p-1.5 flex flex-col justify-center">
                <div className="text-[6px] font-bold text-gray-700 mb-1">Sentiment Analysis</div>
                <div className="flex h-1.5 rounded-full overflow-hidden">
                  <div className="bg-teal-400 w-1/2"></div>
                  <div className="bg-gray-300 w-1/4"></div>
                  <div className="bg-orange-400 w-1/4"></div>
                </div>
              </div>
              <div className="w-2/12 flex items-center justify-center bg-gray-50 rounded-md border border-gray-100">
                <span className="text-[7px] font-bold text-gray-400">Powered by DOC</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end mb-8">
        <button 
          onClick={handleSave}
          disabled={!linkName.trim() || isSubmitting}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-label-md text-label-md shadow-sm transition-opacity ${
            !linkName.trim() || isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-brand-orange hover:opacity-90 text-white'
          }`}
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? 'Saving...' : 'Save Public Link'}
        </button>
      </div>
    </div>
  );
};

export default CreatePublicLink;
