import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Maximize, Minimize } from 'lucide-react';

const ViewPublicLink = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [link, setLink] = useState(null);
  
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const backUrl = location.state?.from || '/links';

  useEffect(() => {
    const localLinksStr = localStorage.getItem('metabase_public_links');
    if (localLinksStr) {
      const localLinks = JSON.parse(localLinksStr);
      const found = localLinks.find((l) => l.id === id);
      if (found) {
        setLink(found);
      }
    }
  }, [id]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) containerRef.current.requestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  if (!link) {
    return (
      <div className="flex flex-col items-center justify-center h-full pb-12">
        <h2 className="font-display-lg text-display-lg text-on-surface mb-2">Link Not Found</h2>
        <button onClick={() => navigate(backUrl)} className="mt-4 text-brand-orange hover:underline">
          Return to Previous Page
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(backUrl)}
            className="w-10 h-10 flex items-center justify-center bg-surface-container-lowest shadow-sm rounded-lg text-on-surface hover:bg-surface-container transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-display-lg text-display-lg text-on-surface leading-tight">{link.name}</h1>
            <p className="font-body-md text-body-md text-secondary">Viewing public dashboard.</p>
          </div>
        </div>
        
        <button
          onClick={toggleFullscreen}
          className="flex items-center gap-2 bg-surface-container-lowest shadow-sm border border-outline-variant/30 px-4 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors font-label-md"
        >
          <Maximize className="w-4 h-4" /> Full Screen
        </button>
      </div>

      {/* Embedded Dashboard */}
      <div ref={containerRef} className="flex-1 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30 relative bg-white">
        <iframe
          src={link.url}
          frameBorder="0"
          width="100%"
          height="100%"
          allowTransparency
          title={link.name}
          className="w-full h-full"
        ></iframe>
        
        {isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 bg-white/90 shadow-md border border-outline-variant/20 text-on-surface hover:text-brand-orange px-4 py-2 rounded-lg backdrop-blur transition-colors z-50 flex items-center gap-2 font-label-md"
          >
            <Minimize className="w-4 h-4" /> Exit Full Screen
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewPublicLink;
