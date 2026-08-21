import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Eye, Plus, Minus, Save, ExternalLink } from 'lucide-react';
import { PublicLinksAPI } from '../mocks/api';
import ConfirmDialog from '../components/organisms/ConfirmDialog';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import DashboardWidget from '../components/molecules/DashboardWidget';
import AddWidgetModal from '../components/organisms/AddWidgetModal';
import { getVoteTrendsData, getWinProbabilityData, getTurnoutByRegionData } from '../utils/dummyChartData';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const CreatePublicLink = () => {
  const navigate = useNavigate();
  const [linkName, setLinkName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [slides, setSlides] = useState([{ id: 1, name: 'Slide 1', widgets: [] }]);
  const [activeSlideId, setActiveSlideId] = useState(1);

  const activeSlideIndex = slides.findIndex(s => s.id === activeSlideId);
  const activeWidgets = slides[activeSlideIndex]?.widgets || [];

  const handleAddWidget = (newWidget) => {
    const w = 4;
    const h = 2;
    const row = Math.floor(activeWidgets.length / 3);
    const nextX = (activeWidgets.length % 3) * w;
    const nextY = row * h;

    const updatedWidgets = [...activeWidgets, { ...newWidget, grid: { x: nextX, y: nextY, w, h } }];
    const updatedSlides = [...slides];
    updatedSlides[activeSlideIndex].widgets = updatedWidgets;
    setSlides(updatedSlides);
  };

  const handleLayoutChange = (newLayout) => {
    const updatedWidgets = activeWidgets.map(w => {
      const layoutItem = newLayout.find(l => l.i === w.id);
      return layoutItem ? { ...w, grid: { x: layoutItem.x, y: layoutItem.y, w: layoutItem.w, h: layoutItem.h } } : w;
    });
    const updatedSlides = [...slides];
    updatedSlides[activeSlideIndex].widgets = updatedWidgets;
    setSlides(updatedSlides);
  };

  const handleRemoveWidget = (id) => {
    const updatedWidgets = activeWidgets.filter(w => w.id !== id);
    const updatedSlides = [...slides];
    updatedSlides[activeSlideIndex].widgets = updatedWidgets;
    setSlides(updatedSlides);
  };

  const handleChangeType = (id) => {
    const types = ['bar', 'line', 'pie', 'area', 'scatter'];
    const updatedWidgets = activeWidgets.map(w => {
      if (w.id === id) {
        const nextIdx = (types.indexOf(w.type) + 1) % types.length;
        return { ...w, type: types[nextIdx] };
      }
      return w;
    });
    const updatedSlides = [...slides];
    updatedSlides[activeSlideIndex].widgets = updatedWidgets;
    setSlides(updatedSlides);
  };

  const handleAddSlide = () => {
    const newId = Date.now();
    setSlides([...slides, { id: newId, name: `Slide ${slides.length + 1}`, widgets: [] }]);
    setActiveSlideId(newId);
  };

  const handlePreview = () => {
    localStorage.setItem('dashboard_preview', JSON.stringify({ linkName, slides }));
    window.open('/preview', '_blank');
  };

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
        <Button
          variant="ghost"
          onClick={() => navigate('/links')}
          className="w-10 h-10 p-0 flex items-center justify-center bg-surface-container-lowest shadow-sm rounded-lg text-on-surface hover:bg-surface-container shrink-0 mt-1"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
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
        <Input
          label="Link Name"
          value={linkName}
          onChange={(e) => setLinkName(e.target.value)}
          placeholder="Enter public link name"
          className="bg-surface-container-lowest font-body-md"
        />
      </div>

      {/* Operational Preview Card */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden mb-6 flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200/30 flex items-center justify-between bg-surface-container-low/50">
          <div className="flex items-center gap-2 text-on-surface font-label-md text-label-md">
            <Eye className="w-4 h-4 text-secondary" />
            Operational Preview
          </div>
          <div className="flex items-center gap-3">
            <div className="px-2.5 py-1 bg-secondary-container/50 text-secondary font-label-md text-[11px] uppercase tracking-wider rounded-md font-semibold">
              Preview Mode
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div
          className="relative w-full py-16 px-4 sm:px-8 flex items-center xl:justify-center overflow-x-auto bg-cover bg-center min-h-[900px]"
        >
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

          {/* Slides Manager */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white/80 backdrop-blur-md px-2 py-1.5 rounded-full shadow-sm border border-white/60 flex items-center gap-1">
            {slides.map(slide => (
              <button
                key={slide.id}
                onClick={() => setActiveSlideId(slide.id)}
                className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-colors ${activeSlideId === slide.id
                    ? 'bg-brand-orange text-white shadow-sm'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                  }`}
              >
                {slide.name}
              </button>
            ))}
            <button
              onClick={handleAddSlide}
              className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 ml-1 transition-colors"
              title="Add new slide"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Dashboard Mockup Image */}
          <div className="relative w-[1200px] min-h-[750px] h-auto shrink-0 bg-gray-50 rounded-xl shadow-2xl overflow-hidden border border-white/60 flex flex-col z-10 p-4 gap-3">

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

            {/* Dynamic Draggable Grid Area */}
            <div className="flex-1 mt-4 min-h-[300px]">
              {activeWidgets.length === 0 ? (
                <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 min-h-[300px]">
                  <p className="text-gray-400 font-semibold mb-2">Dashboard is empty</p>
                  <p className="text-gray-400 text-[12px] mb-4">Click "Add Widget" below to build your custom view</p>
                </div>
              ) : (
                <GridLayout
                  className="layout"
                  layout={activeWidgets.map(w => ({ i: w.id, ...w.grid }))}
                  cols={12}
                  rowHeight={140}
                  width={1160}
                  onLayoutChange={handleLayoutChange}
                  draggableHandle=".drag-handle"
                  isResizable={true}
                  isDraggable={true}
                  margin={[16, 16]}
                >
                  {activeWidgets.map(w => (
                    <div key={w.id}>
                      <DashboardWidget
                        title={w.title}
                        type={w.type}
                        data={w.data}
                        onRemove={() => handleRemoveWidget(w.id)}
                        onChangeType={() => handleChangeType(w.id)}
                      />
                    </div>
                  ))}
                </GridLayout>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-center items-center gap-4 pb-8">
              <Button variant="secondary" className="w-auto min-w-[180px] px-6 border-dashed whitespace-nowrap" onClick={() => setIsModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2 shrink-0" />
                Add Widget
              </Button>
              <Button
                variant="ghost"
                className="w-auto min-w-[180px] px-6 whitespace-nowrap text-brand-orange bg-orange-50 border border-orange-100/50 hover:bg-brand-orange hover:text-white transition-colors flex items-center justify-center"
                onClick={handlePreview}
              >
                <ExternalLink className="w-4 h-4 mr-2 shrink-0" />
                Preview Dashboard
              </Button>
            </div>

          </div>
        </div>
      </div>

      <div className="flex justify-end mb-8">
        <Button
          onClick={handleSave}
          disabled={!linkName.trim() || isSubmitting}
        >
          <Save className="w-4 h-4 mr-2" />
          {isSubmitting ? 'Saving...' : 'Save Public Link'}
        </Button>
      </div>

      {/* Modals */}
      <AddWidgetModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddWidget={handleAddWidget}
      />
    </div>
  );
};

export default CreatePublicLink;
