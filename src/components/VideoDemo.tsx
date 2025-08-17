import { useState } from "react";
import { Play, X, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import demoThumbnail from "@/assets/demo-thumbnail.webp";

interface VideoDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoDemo = ({ isOpen, onClose }: VideoDemoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      <DialogContent className={`${isFullscreen ? 'max-w-[95vw] max-h-[95vh]' : 'max-w-4xl'} p-0 bg-black border-gray-800`}>
        <DialogHeader className="p-4 bg-gradient-to-r from-blue-900/80 to-purple-900/80 text-white">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Play className="h-5 w-5" />
              Platform Demo - Revolutionary Social Impact Technology
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="relative">
          {/* Video Container */}
          <div className="relative bg-black aspect-video">
            {/* Demo Thumbnail/Video Player */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={demoThumbnail} 
                alt="Demo Video Thumbnail"
                className="w-full h-full object-cover"
              />
              
              {/* Video Overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                {!isPlaying ? (
                  <Button
                    onClick={handlePlay}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-2 border-white/50 rounded-full p-6"
                    size="lg"
                  >
                    <Play className="h-8 w-8 ml-1" />
                  </Button>
                ) : (
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold mb-2">🎬 Demo Playing...</div>
                    <div className="text-sm opacity-75">Experience our revolutionary platform features</div>
                  </div>
                )}
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePlay}
                    className="text-white hover:bg-white/10"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMute}
                    className="text-white hover:bg-white/10"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <span className="text-white text-sm">2:30</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFullscreen}
                  className="text-white hover:bg-white/10"
                >
                  {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Demo Sections */}
          {!isFullscreen && (
            <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                What You'll See in This Demo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {demoSections.map((section, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-blue-200/50 dark:border-blue-700/50 hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-sm font-mono">
                      {section.time}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{section.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{section.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Ready to experience these features yourself?
                </p>
                <Button 
                  onClick={onClose}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2"
                >
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