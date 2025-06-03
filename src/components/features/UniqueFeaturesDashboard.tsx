import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Shield, Sparkles, TrendingUp, Target, Award, Headset, Trophy, BookOpen } from 'lucide-react';
import AIImpactPredictor from './AIImpactPredictor';
import BlockchainImpactCertificates from './BlockchainImpactCertificates';
import VRImpactTours from './VRImpactTours';
import CommunityGameHub from './CommunityGameHub';
import AIStoryGenerator from './AIStoryGenerator';

const UniqueFeaturesDashboard = () => {
  const [activeFeature, setActiveFeature] = useState<'overview' | 'ai-predictor' | 'blockchain-certs' | 'vr-tours' | 'community-games' | 'ai-stories'>('overview');

  const features = [
    {
      id: 'ai-predictor',
      title: 'AI Impact Predictor',
      description: 'Machine learning algorithms predict project success rates and social impact before funding',
      icon: Brain,
      color: 'from-purple-600 to-blue-600',
      metrics: {
        accuracy: '98.7%',
        projectsAnalyzed: '1,250+',
        dataPoints: '50+'
      },
      benefits: [
        'Predict long-term community impact',
        'Risk assessment for vendor/project combinations',
        'Data-driven funding decisions',
        'Optimize resource allocation'
      ]
    },
    {
      id: 'blockchain-certs',
      title: 'Blockchain Impact Certificates',
      description: 'NFT-based certificates create a tradeable impact economy with immutable proof of achievements',
      icon: Shield,
      color: 'from-emerald-600 to-blue-600',
      metrics: {
        marketValue: '₹2.3M',
        certificatesMinted: '156',
        verificationRate: '98.7%'
      },
      benefits: [
        'Immutable proof of social impact',
        'Tradeable impact credits marketplace',
        'NFT-based verification system',
        'Corporate impact portfolio management'
      ]
    }
  ];

  // Add new features to the array
  const newFeatures = [
    {
      id: 'vr-tours',
      title: 'Virtual Reality Impact Tours',
      description: 'Immersive VR experiences showing before/after transformations with 360° documentation',
      icon: Headset,
      color: 'from-cyan-600 to-blue-600',
      metrics: {
        toursCreated: '24',
        viewsGenerated: '3,400+',
        fundingIncrease: '67%'
      },
      benefits: [
        'Immersive project site visits',
        '360° before/after documentation',
        'Remote funder engagement',
        'Enhanced funding conversion'
      ]
    },
    {
      id: 'community-games',
      title: 'Gamified Community Challenges',
      description: 'Seasonal competitions with leaderboards, achievement badges, and milestone rewards',
      icon: Trophy,
      color: 'from-pink-600 to-purple-600',
      metrics: {
        activeChallenges: '12',
        participants: '890+',
        completionRate: '78%'
      },
      benefits: [
        'Competitive project completion',
        'Achievement-based motivation',
        'Cross-organization collaboration',
        'Performance recognition system'
      ]
    },
    {
      id: 'ai-stories',
      title: 'AI-Generated Impact Stories',
      description: 'Automatically create compelling narratives from data in multiple languages for global reach',
      icon: BookOpen,
      color: 'from-green-600 to-emerald-600',
      metrics: {
        storiesGenerated: '2,400+',
        languages: '50+',
        engagementRate: '92%'
      },
      benefits: [
        'Automated story generation',
        'Multi-language support',
        'Personalized narratives',
        'Cultural context adaptation'
      ]
    }
  ];

  // Combine original and new features
  const allFeatures = [...features, ...newFeatures];

  // Import components dynamically
  const renderActiveComponent = () => {
    switch (activeFeature) {
      case 'ai-predictor':
        return (
          <div className="space-y-4">
            <Button 
              variant="outline" 
              onClick={() => setActiveFeature('overview')}
              className="mb-4"
            >
              ← Back to Features Overview
            </Button>
            <AIImpactPredictor />
          </div>
        );
      case 'blockchain-certs':
        return (
          <div className="space-y-4">
            <Button 
              variant="outline" 
              onClick={() => setActiveFeature('overview')}
              className="mb-4"
            >
              ← Back to Features Overview
            </Button>
            <BlockchainImpactCertificates />
          </div>
        );
      case 'vr-tours':
        return (
          <div className="space-y-4">
            <Button 
              variant="outline" 
              onClick={() => setActiveFeature('overview')}
              className="mb-4"
            >
              ← Back to Features Overview
            </Button>
            <VRImpactTours />
          </div>
        );
      case 'community-games':
        return (
          <div className="space-y-4">
            <Button 
              variant="outline" 
              onClick={() => setActiveFeature('overview')}
              className="mb-4"
            >
              ← Back to Features Overview
            </Button>
            <CommunityGameHub />
          </div>
        );
      case 'ai-stories':
        return (
          <div className="space-y-4">
            <Button 
              variant="outline" 
              onClick={() => setActiveFeature('overview')}
              className="mb-4"
            >
              ← Back to Features Overview
            </Button>
            <AIStoryGenerator />
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Header */}
            <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Sparkles className="h-8 w-8" />
                  Unique Platform Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-indigo-100 mb-4">
                  Revolutionary technologies that set EmpowerLink apart from traditional social impact platforms. 
                  Our AI, blockchain, VR, and gamification innovations ensure transparency, predictability, and measurable impact.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">5</div>
                    <div className="text-sm text-indigo-200">Unique Technologies</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm text-indigo-200">First to Market</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">₹15M+</div>
                    <div className="text-sm text-indigo-200">Impact Value Created</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.id} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <CardHeader>
                      <div className={`w-full h-32 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                        <Icon className="h-16 w-16 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Key Metrics */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        {Object.entries(feature.metrics).map(([key, value]) => (
                          <div key={key} className="bg-gray-50 p-3 rounded">
                            <div className="font-bold text-lg">{value}</div>
                            <div className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                          </div>
                        ))}
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="font-semibold mb-2">Key Benefits:</h4>
                        <div className="space-y-1">
                          {feature.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <Target className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button 
                        className="w-full"
                        onClick={() => setActiveFeature(feature.id as any)}
                      >
                        Explore {feature.title}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Competitive Advantage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Competitive Advantage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Predictive Analytics</h3>
                    <p className="text-sm text-gray-600">
                      First platform to use ML for impact prediction, reducing funding risks by 67%
                    </p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-12 w-12 text-emerald-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Blockchain Verification</h3>
                    <p className="text-sm text-gray-600">
                      Immutable impact certificates create new economy for social impact trading
                    </p>
                  </div>
                  <div className="text-center">
                    <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Market Innovation</h3>
                    <p className="text-sm text-gray-600">
                      Revolutionary approach combining AI, blockchain, and social impact measurement
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Implementation Roadmap */}
            <Card>
              <CardHeader>
                <CardTitle>Feature Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge className="bg-green-100 text-green-800">✓ Completed</Badge>
                    <span>AI Impact Prediction Engine v1.0</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-green-100 text-green-800">✓ Completed</Badge>
                    <span>Blockchain Impact Certificates</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                    <span>Advanced ML Models with Computer Vision</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-yellow-100 text-yellow-800">Planned</Badge>
                    <span>DeFi Integration for Impact Funding</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-yellow-100 text-yellow-800">Planned</Badge>
                    <span>Cross-chain Certificate Trading</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return renderActiveComponent();
};

export default UniqueFeaturesDashboard;
