import { useState } from "react";
import { Play, X, Volume2, VolumeX, Maximize, Minimize, Sparkles, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import demoThumbnail from "@/assets/demo-video-hero.webp";

interface VideoDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoDemo = ({ isOpen, onClose }: VideoDemoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [currentTime, setCurrentTime] = useState(0);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
  ];

  // Demo video sections with timestamps
  const demoSections = [
    { title: "Platform Overview", time: "0:00", description: "Introduction to the social impact ecosystem" },
    { title: "AI Impact Predictor", time: "0:30", description: "Machine learning powered success predictions" },
    { title: "Blockchain Certificates", time: "1:00", description: "NFT-based impact verification system" },
    { title: "VR Impact Tours", time: "1:30", description: "360° virtual site visits and experiences" },
    { title: "Dashboard Analytics", time: "2:00", description: "Real-time impact tracking and reporting" },
  ];

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isFullscreen ? 'max-w-[95vw] max-h-[95vh]' : 'max-w-5xl'} p-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 border border-blue-500/20 shadow-2xl shadow-blue-500/20`}>
        <DialogHeader className="p-6 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
          <div className="flex items-center justify-between relative z-10">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Sparkles className="h-6 w-6 text-yellow-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  Platform Demo 
                  <Zap className="h-5 w-5 text-yellow-300 animate-pulse" />
                </div>
                <div className="text-sm font-normal text-blue-100 mt-1">Revolutionary Social Impact Technology</div>
              </div>
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="relative">
          {/* Video Container */}
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 aspect-video overflow-hidden">
            {/* Demo Thumbnail/Video Player */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={demoThumbnail} 
                alt="Demo Video Thumbnail"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              
              {/* Animated Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 via-transparent to-purple-600/40"></div>
              
              {/* Video Overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                {!isPlaying ? (
                  <div className="text-center">
                    <Button
                      onClick={handlePlay}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 backdrop-blur-sm text-white border-2 border-white/30 rounded-full p-8 shadow-2xl shadow-blue-500/50 transition-all duration-300 hover:scale-110 group"
                      size="lg"
                    >
                      <Play className="h-10 w-10 ml-1 group-hover:scale-110 transition-transform" />
                    </Button>
                    <div className="mt-4 text-white">
                      <div className="text-lg font-semibold mb-1 animate-fade-in">Watch Our Platform Demo</div>
                      <div className="text-sm opacity-80 animate-fade-in">
                        Discover revolutionary social impact features in {selectedLanguage}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-white text-center animate-fade-in">
                    <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                      <div className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        🎬 Demo Playing
                      </div>
                      <div className="text-lg opacity-90">Experience our revolutionary platform features in {selectedLanguage}</div>
                      <div className="mt-4 flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Language Selector */}
              <div className="absolute top-6 right-6 z-20">
                <div className="bg-black/60 backdrop-blur-md rounded-xl px-4 py-2 border border-white/10 shadow-lg">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <Globe className="h-4 w-4" />
                    <select 
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="bg-transparent text-white border-none outline-none cursor-pointer"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.name} className="bg-slate-800 text-white">
                          {lang.flag} {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between bg-black/60 backdrop-blur-md rounded-xl px-6 py-3 border border-white/10 shadow-lg">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePlay}
                    className="text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                  >
                    {isPlaying ? <X className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMute}
                    className="text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                  <div className="text-white text-sm font-medium bg-white/10 px-3 py-1 rounded-full">
                    {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / 2:30
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-white text-xs opacity-75">
                    {selectedLanguage}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleFullscreen}
                    className="text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                  >
                    {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Sections */}
          {!isFullscreen && (
            <div className="p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  What You'll Discover in This Demo
                </h3>
                <p className="text-gray-600 dark:text-gray-400">Experience revolutionary features that transform social impact</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {demoSections.map((section, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-4 p-5 bg-white/90 dark:bg-slate-800/90 rounded-2xl border border-blue-200/30 dark:border-blue-700/30 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer hover:scale-105"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-2 rounded-xl text-sm font-bold shadow-lg">
                      {section.time}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {section.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-blue-200/20 dark:border-blue-700/20">
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Ready to Transform Social Impact?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Join thousands of organizations already making a difference
                  </p>
                </div>
                <Button 
                  onClick={onClose}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Start Your Free Trial
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDemo;