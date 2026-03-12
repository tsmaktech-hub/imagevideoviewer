/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ExternalLink, Video, Image as ImageIcon, Loader2, PlayCircle } from 'lucide-react';

export default function App() {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  
  // Direct link for background video (works better for autoplay/loop)
  const videoId = "1cSfHsqIIZK-KJ2rmgNmLRHYpC4CqVTiI";
  const directVideoUrl = `https://drive.google.com/uc?export=download&id=${videoId}`;
  const videoUrl = `https://drive.google.com/file/d/${videoId}/preview`;
  const imageUrl = "https://lh3.googleusercontent.com/u/0/d/18nLGL3pZFUFfiJ0HFMyMiE-wlz2mFGnr";

  return (
    <div className="relative min-h-screen flex flex-col items-center py-12 px-6 sm:px-12 gap-12 overflow-x-hidden">
      {/* Background Video Layer - Oversized iframe to hide Drive UI */}
      <div className="fixed inset-0 -z-10 bg-zinc-950 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <iframe 
          src={`${videoUrl}?autoplay=1&mute=1&controls=0`}
          className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 border-0 opacity-40 grayscale-[0.5] pointer-events-none"
          allow="autoplay"
        ></iframe>
      </div>

      <header className="text-center space-y-2 relative z-20">
        <h1 className="text-4xl font-sans font-bold tracking-tight text-white drop-shadow-lg">
          image & video test
        </h1>
        <p className="text-zinc-300 font-sans drop-shadow-md">
          Testing media assets from Google Drive
        </p>
      </header>

      {/* Video Section */}
      <div className="max-w-4xl w-full bg-white rounded-[24px] shadow-2xl overflow-hidden border border-black/5 relative z-20">
        <div className="px-8 py-6 border-b border-black/[0.03] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
              <Video size={20} />
            </div>
            <div>
              <h1 className="text-lg font-sans font-semibold tracking-tight text-zinc-900 leading-tight">
                Video Preview
              </h1>
              <p className="text-xs text-zinc-400 font-sans uppercase tracking-wider font-medium">
                Google Drive Player
              </p>
            </div>
          </div>
        </div>

        <div className="relative aspect-video flex items-center justify-center bg-black">
          {isVideoLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 z-10 gap-4">
              <Loader2 className="animate-spin text-zinc-500" size={32} />
              <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Initialising Stream...</p>
            </div>
          )}
          
          <iframe 
            src={videoUrl} 
            className={`
              w-full h-full border-0 transition-all duration-1000
              ${isVideoLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
            `}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            onLoad={() => setIsVideoLoading(false)}
            title="Google Drive Video Player"
          ></iframe>
        </div>

        <div className="px-8 py-4 bg-zinc-50/80 border-t border-black/[0.03] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlayCircle size={14} className="text-zinc-400" />
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
              Embed Mode
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[11px] font-sans font-medium text-zinc-500 uppercase tracking-wider">
                Video Stream
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="max-w-4xl w-full bg-white rounded-[24px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden border border-black/5">
        <div className="px-8 py-6 border-b border-black/[0.03] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
              <ImageIcon size={20} />
            </div>
            <div>
              <h1 className="text-lg font-sans font-semibold tracking-tight text-zinc-900 leading-tight">
                Image Preview
              </h1>
              <p className="text-xs text-zinc-400 font-sans uppercase tracking-wider font-medium">
                Google Drive Asset
              </p>
            </div>
          </div>
          <a 
            href={imageUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-600"
            title="Open original"
          >
            <ExternalLink size={20} />
          </a>
        </div>

        <div className="relative flex items-center justify-center bg-[#fafafa] p-4 sm:p-8 min-h-[300px]">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
              <Loader2 className="animate-spin text-zinc-300" size={32} />
            </div>
          )}
          <img
            src={imageUrl}
            alt="Requested content"
            onLoad={() => setIsImageLoading(false)}
            className={`
              max-w-full max-h-[70vh] rounded-xl shadow-2xl shadow-black/5 object-contain transition-all duration-700
              ${isImageLoading ? 'scale-95 opacity-0 blur-lg' : 'scale-100 opacity-100 blur-0'}
            `}
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="px-8 py-4 bg-zinc-50/50 border-t border-black/[0.03] flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
            ID: 18nLGL3p...
          </span>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-sans font-medium text-zinc-500 uppercase tracking-wider">
              Image Asset
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
