
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VrHeadset, Play, Eye, Camera, Globe, MapPin, Calendar, Users } from 'lucide-react';

interface VRTour {
  id: string;
  title: string;
  location: string;
  project: string;
  duration: string;
  viewCount: number;
  rating: number;
  status: 'live' | 'processing' | 'scheduled';
  beforeImage: string;
  afterImage: string;
  dateRecorded: string;
  impact: {
    beneficiaries: number;
    improvements: string[];
  };
}

const VRImpactTours = () => {
  const [activeView, setActiveView] = useState<'tours' | 'create' | 'analytics'>('tours');
  const [selectedTour, setSelectedTour] = useState<VRTour | null>(null);

  const vrTours: VRTour[] = [
    {
      id: 'VR-001',
      title: 'Clean Water Project - Village Transformation',
      location: 'Rajasthan, India',
      project: 'Water Infrastructure Development',
      duration: '8:45',
      viewCount: 1247,
      rating: 4.8,
      status: 'live',
      beforeImage: '/api/placeholder/400/300',
      afterImage: '/api/placeholder/400/300',
      dateRecorded: '2024-02-15',
      impact: {
        beneficiaries: 850,
        improvements: ['Clean water access', 'Reduced waterborne diseases', 'Time savings for families']
      }
    },
    {
      id: 'VR-002',
      title: 'Solar Energy Installation - Rural Electrification',
      location: 'Tamil Nadu, India',
      project: 'Renewable Energy Initiative',
      duration: '12:30',
      viewCount: 892,
      rating: 4.9,
      status: 'live',
      beforeImage: '/api/placeholder/400/300',
      afterImage: '/api/placeholder/400/300',
      dateRecorded: '2024-01-28',
      impact: {
        beneficiaries: 1200,
        improvements: ['24/7 electricity', 'Improved education', 'Economic opportunities']
      }
    },
    {
      id: 'VR-003',
      title: 'School Infrastructure Upgrade',
      location: 'Uttar Pradesh, India',
      project: 'Education Infrastructure',
      duration: '15:20',
      viewCount: 2156,
      rating: 4.7,
      status: 'live',
      beforeImage: '/api/placeholder/400/300',
      afterImage: '/api/placeholder/400/300',
      dateRecorded: '2024-03-05',
      impact: {
        beneficiaries: 450,
        improvements: ['Modern classrooms', 'Digital learning tools', 'Increased enrollment']
      }
    },
    {
      id: 'VR-004',
      title: 'Healthcare Center Construction',
      location: 'Bihar, India',
      project: 'Rural Healthcare Development',
      duration: '10:15',
      viewCount: 567,
      rating: 4.6,
      status: 'processing',
      beforeImage: '/api/placeholder/400/300',
      afterImage: '/api/placeholder/400/300',
      dateRecorded: '2024-03-18',
      impact: {
        beneficiaries: 2000,
        improvements: ['Primary healthcare access', 'Maternal care', 'Emergency services']
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const playVRTour = (tour: VRTour) => {
    setSelectedTour(tour);
    // In a real implementation, this would launch the VR player
    console.log('Launching VR tour:', tour.title);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <VrHeadset className="h-8 w-8" />
            Virtual Reality Impact Tours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-100 mb-4">
            Immersive VR experiences showcasing real project transformations. Let funders virtually visit 
            project sites and witness the impact firsthand through 360° documentation.
          </p>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{vrTours.length}</div>
              <div className="text-sm text-purple-200">Active Tours</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{vrTours.reduce((acc, tour) => acc + tour.viewCount, 0).toLocaleString()}</div>
              <div className="text-sm text-purple-200">Total Views</div>
            </div>
            <div>
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm text-purple-200">Avg Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold">6,500+</div>
              <div className="text-sm text-purple-200">Lives Impacted</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex gap-2">
        <Button 
          variant={activeView === 'tours' ? 'default' : 'outline'}
          onClick={() => setActiveView('tours')}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          VR Tours Gallery
        </Button>
        <Button 
          variant={activeView === 'create' ? 'default' : 'outline'}
          onClick={() => setActiveView('create')}
          className="flex items-center gap-2"
        >
          <Camera className="h-4 w-4" />
          Create Tour
        </Button>
        <Button 
          variant={activeView === 'analytics' ? 'default' : 'outline'}
          onClick={() => setActiveView('analytics')}
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          Analytics
        </Button>
      </div>

      {/* VR Tours Gallery */}
      {activeView === 'tours' && (
        <div className="grid md:grid-cols-2 gap-6">
          {vrTours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img 
                  src={tour.afterImage} 
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button 
                    onClick={() => playVRTour(tour)}
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Launch VR Tour
                  </Button>
                </div>
                <Badge 
                  className={`absolute top-2 right-2 ${getStatusColor(tour.status)}`}
                >
                  {tour.status.toUpperCase()}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{tour.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {tour.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    Recorded: {new Date(tour.dateRecorded).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    {tour.impact.beneficiaries.toLocaleString()} beneficiaries
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
                  <div>
                    <div className="font-bold">{tour.duration}</div>
                    <div className="text-gray-600">Duration</div>
                  </div>
                  <div>
                    <div className="font-bold">{tour.viewCount}</div>
                    <div className="text-gray-600">Views</div>
                  </div>
                  <div>
                    <div className="font-bold">⭐ {tour.rating}</div>
                    <div className="text-gray-600">Rating</div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Impact Highlights:</p>
                  <div className="flex flex-wrap gap-1">
                    {tour.impact.improvements.map((improvement, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {improvement}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => playVRTour(tour)}
                    className="flex-1"
                  >
                    <VrHeadset className="h-4 w-4 mr-2" />
                    Experience VR
                  </Button>
                  <Button variant="outline" size="sm">
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Tour Interface */}
      {activeView === 'create' && (
        <Card>
          <CardHeader>
            <CardTitle>Create New VR Impact Tour</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Selection</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Select a project...</option>
                    <option>Water Infrastructure - Rajasthan</option>
                    <option>Solar Energy - Tamil Nadu</option>
                    <option>Education - Uttar Pradesh</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tour Title</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter descriptive tour title..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Recording Schedule</label>
                  <input 
                    type="datetime-local" 
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">360° Camera Setup</label>
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <Camera className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Configure VR camera settings</p>
                    <Button variant="outline" className="mt-2">
                      Camera Settings
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tour Route Planning</label>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <p className="text-sm mb-2">Suggested tour points:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Project overview area</li>
                      <li>• Before transformation site</li>
                      <li>• During construction phase</li>
                      <li>• Completed project showcase</li>
                      <li>• Beneficiary testimonials</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline">Save Draft</Button>
              <Button>Schedule Recording</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analytics Dashboard */}
      {activeView === 'analytics' && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Viewer Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Average Watch Time</span>
                  <span className="font-bold">7:23 min</span>
                </div>
                <Progress value={73} className="w-full" />
                
                <div className="flex justify-between items-center">
                  <span>Completion Rate</span>
                  <span className="font-bold">68%</span>
                </div>
                <Progress value={68} className="w-full" />
                
                <div className="flex justify-between items-center">
                  <span>Interaction Points</span>
                  <span className="font-bold">12.5 avg</span>
                </div>
                <Progress value={85} className="w-full" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Impact Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">₹12.5M</div>
                  <div className="text-sm text-gray-600">Funding Generated</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">156</div>
                    <div className="text-xs text-gray-600">Corporate Viewers</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">89%</div>
                    <div className="text-xs text-gray-600">Funding Conversion</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Viewer Satisfaction</span>
                    <span>4.8/5.0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>VR Equipment Usage</span>
                    <span>73%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Mobile/Desktop</span>
                    <span>27%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* VR Player Modal */}
      {selectedTour && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">VR Tour Player</h3>
            <p className="mb-4">Launching VR experience for: <strong>{selectedTour.title}</strong></p>
            <div className="bg-gray-100 p-8 rounded-lg text-center mb-4">
              <VrHeadset className="h-16 w-16 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">VR Player would launch here</p>
              <p className="text-xs text-gray-500">Put on VR headset for full experience</p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setSelectedTour(null)}
                variant="outline"
                className="flex-1"
              >
                Close
              </Button>
              <Button className="flex-1">
                Launch VR App
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VRImpactTours;
