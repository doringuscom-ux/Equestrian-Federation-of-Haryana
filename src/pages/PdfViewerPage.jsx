import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../config/api';
import NotFoundPage from './NotFoundPage';

const PdfViewerPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [newsItem, setNewsItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/news/slug/${slug}`);
        if (!response.ok) throw new Error('Document not found');
        const data = await response.json();
        setNewsItem(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchNews();
  }, [slug]);

  const rawUrl = newsItem?.pdfLink || newsItem?.image || '';
  const isImage = !newsItem?.pdfLink && !!newsItem?.image;
  const title = newsItem?.headline || 'Document Viewer';
  const subtitle = 'OFFICIAL EFH PUBLICATION';

  // Format Google Drive links for iframe embedding if necessary
  const formatUrlForIframe = (url) => {
    if (!url) return '';
    if (url.includes('drive.google.com/file/d/')) {
      // Replace /view with /preview
      return url.replace(/\/view.*$/, '/preview');
    }
    return url;
  };

  const iframeUrl = formatUrlForIframe(rawUrl);

  useEffect(() => {
    if (newsItem) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [newsItem]);

  if (error || (!rawUrl && newsItem)) {
    return <NotFoundPage />;
  }

  if (!newsItem) {
    return (
      <div className="w-full h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-[#cba358] animate-spin mb-4" />
        <span className="text-[#cba358] text-sm tracking-widest uppercase font-bold">Loading...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-[#050505] overflow-hidden font-['Inter']">
      
      {/* Top Header Bar */}
      <div className="h-16 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-10 shadow-md">
        
        {/* Left: Back & Title */}
        <div className="flex items-center gap-4 md:gap-6 w-2/3">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/5"
            title="Go Back"
          >
            <ArrowLeft size={18} />
          </button>
          
          <div className="flex flex-col overflow-hidden">
            <h1 className="text-white text-sm md:text-base font-bold uppercase tracking-widest truncate">
              {title}
            </h1>
            <span className="text-[10px] text-[#cba358] font-bold tracking-[0.2em] uppercase">
              {subtitle}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Using rawUrl for download/external to ensure it behaves correctly outside the iframe */}
          <a 
            href={rawUrl} 
            download 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/5 hidden md:flex"
            title="Download Document"
          >
            <Download size={16} />
          </a>
          
          <a 
            href={rawUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 md:w-auto md:px-4 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] flex items-center justify-center gap-2 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-blue-500/20"
            title="Open in New Tab"
          >
            <span className="hidden md:inline-block">Open</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Document Viewer Area */}
      <div className="flex-grow relative w-full h-full bg-[#111]">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111] z-10">
            <Loader2 className="w-10 h-10 text-[#cba358] animate-spin mb-4" />
            <span className="text-[#cba358] text-sm tracking-widest uppercase font-bold animate-pulse">Loading Document...</span>
          </div>
        )}
        
        {isImage ? (
          <div className="w-full h-full flex items-center justify-center p-4">
            <img 
              src={rawUrl} 
              alt={title} 
              className="max-w-full max-h-full object-contain rounded-md shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        ) : (
          <iframe
            src={iframeUrl}
            className="w-full h-full border-none bg-white"
            title={title}
            onLoad={() => setIsLoading(false)}
            allow="autoplay"
          ></iframe>
        )}
      </div>

    </div>
  );
};

export default PdfViewerPage;
