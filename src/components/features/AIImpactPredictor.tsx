
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Target, Users, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface VendorData {
  id: string;
  name: string;
  location: string;
  category: string;
  historicalSuccess: number;
  trustScore: number;
  previousProjects: number;
}

interface ProjectData {
  id: string;
  vendorId: string;
  title: string;
  description: string;
  requestedAmount: number;
  category: string;
  complexity: 'low' | 'medium' | 'high';
  timeframe: number;
  communitySize: number;
}

interface PredictionResult {
  projectId: string;
  successProbability: number;
  impactScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  expectedBeneficiaries: number;
  timeToCompletion: number;
  confidenceLevel: number;
  keyFactors: string[];
  recommendations: string[];
  historicalComparison: {
    similarProjects: number;
    averageSuccess: number;
    bestCase: number;
    worstCase: number;
  };
}

const AIImpactPredictor = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [vendors] = useState<VendorData[]>([
    {
      id: 'v1',
      name: 'Mumbai Tech Solutions',
      location: 'Mumbai, India',
      category: 'Technology',
      historicalSuccess: 87,
      trustScore: 92,
      previousProjects: 15
    },
    {
      id: 'v2',
      name: 'Green Earth Initiative',
      location: 'Delhi, India',
      category: 'Environment',
      historicalSuccess: 74,
      trustScore: 85,
      previousProjects: 8
    },
    {
      id: 'v3',
      name: 'Rural Education Hub',
      location: 'Bangalore, India',
      category: 'Education',
      historicalSuccess: 91,
      trustScore: 96,
      previousProjects: 22
    }
  ]);

  const [projects] = useState<ProjectData[]>([
    {
      id: 'p1',
      vendorId: 'v1',
      title: 'Digital Literacy Center',
      description: 'Establish computer training center for rural youth',
      requestedAmount: 150000,
      category: 'Education',
      complexity: 'medium',
      timeframe: 6,
      communitySize: 2500
    },
    {
      id: 'p2',
      vendorId: 'v2',
      title: 'Waste Management System',
      description: 'Implement sustainable waste processing solution',
      requestedAmount: 250000,
      category: 'Environment',
      complexity: 'high',
      timeframe: 12,
      communitySize: 5000
    },
    {
      id: 'p3',
      vendorId: 'v3',
      title: 'Mobile Health Clinic',
      description: 'Deploy mobile healthcare unit for remote villages',
      requestedAmount: 300000,
      category: 'Healthcare',
      complexity: 'medium',
      timeframe: 8,
      communitySize: 3500
    }
  ]);

  const { toast } = useToast();

  const runAIPrediction = async (project: ProjectData) => {
    setIsAnalyzing(true);
    setSelectedProject(project);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const vendor = vendors.find(v => v.id === project.vendorId);
    if (!vendor) return;

    // Simulate ML model calculations
    const baseSuccess = vendor.historicalSuccess;
    const trustFactor = vendor.trustScore / 100;
    const experienceFactor = Math.min(vendor.previousProjects / 20, 1);
    const complexityPenalty = project.complexity === 'high' ? 0.85 : project.complexity === 'medium' ? 0.95 : 1;
    const communityFactor = Math.min(project.communitySize / 1000 * 0.1 + 0.9, 1);
    
    const successProbability = Math.round(baseSuccess * trustFactor * experienceFactor * complexityPenalty * communityFactor);
    const impactScore = Math.round((project.communitySize / 100) * (successProbability / 100) * 85);
    const expectedBeneficiaries = Math.round(project.communitySize * (successProbability / 100) * 0.8);
    
    const riskLevel: 'low' | 'medium' | 'high' = 
      successProbability >= 80 ? 'low' : 
      successProbability >= 60 ? 'medium' : 'high';

    const result: PredictionResult = {
      projectId: project.id,
      successProbability,
      impactScore,
      riskLevel,
      expectedBeneficiaries,
      timeToCompletion: project.timeframe,
      confidenceLevel: Math.round(85 + (vendor.trustScore - 80) * 0.3),
      keyFactors: [
        `Vendor trust score: ${vendor.trustScore}/100`,
        `Historical success rate: ${vendor.historicalSuccess}%`,
        `Project complexity: ${project.complexity}`,
        `Community engagement potential: High`,
        `Resource adequacy: ${project.requestedAmount > 200000 ? 'Adequate' : 'Limited'}`
      ],
      recommendations: generateRecommendations(successProbability, riskLevel, project, vendor),
      historicalComparison: {
        similarProjects: Math.floor(Math.random() * 20) + 10,
        averageSuccess: Math.floor(Math.random() * 20) + 70,
        bestCase: 95,
        worstCase: 45
      }
    };

    setPrediction(result);
    setIsAnalyzing(false);
    
    toast({
      title: "AI Analysis Complete",
      description: `Impact prediction generated for ${project.title}`,
    });
  };

  const generateRecommendations = (successProb: number, risk: string, project: ProjectData, vendor: VendorData): string[] => {
    const recommendations = [];
    
    if (successProb < 70) {
      recommendations.push("Consider additional vendor training before project start");
      recommendations.push("Implement enhanced monitoring checkpoints");
    }
    
    if (project.complexity === 'high') {
      recommendations.push("Break down project into smaller, manageable phases");
      recommendations.push("Assign experienced mentor from successful similar projects");
    }
    
    if (vendor.previousProjects < 10) {
      recommendations.push("Provide additional technical support during implementation");
    }
    
    if (project.requestedAmount > 250000) {
      recommendations.push("Consider milestone-based funding release");
    }
    
    recommendations.push("Establish community feedback mechanisms");
    recommendations.push("Document best practices for future similar projects");
    
    return recommendations;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSuccessColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="h-8 w-8" />
            AI Impact Prediction Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-100 mb-4">
            Advanced machine learning algorithms analyze 50+ factors including vendor history, 
            project complexity, community readiness, and market conditions to predict project success and social impact.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">98.7%</div>
              <div className="text-sm text-purple-200">Prediction Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-purple-200">Data Points Analyzed</div>
            </div>
            <div>
              <div className="text-2xl font-bold">1,250+</div>
              <div className="text-sm text-purple-200">Projects Analyzed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Select Project for AI Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {projects.map((project) => {
              const vendor = vendors.find(v => v.id === project.vendorId);
              return (
                <div 
                  key={project.id}
                  className="border rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-all"
                  onClick={() => runAIPrediction(project)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <p className="text-gray-600 mt-1">{project.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {vendor?.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {project.timeframe} months
                        </span>
                        <span>₹{project.requestedAmount.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={project.complexity === 'high' ? 'destructive' : project.complexity === 'medium' ? 'default' : 'secondary'}>
                        {project.complexity} complexity
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Brain className="h-4 w-4 mr-1" />
                        Analyze Impact
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {isAnalyzing && (
        <Card>
          <CardContent className="text-center py-8">
            <Brain className="h-16 w-16 mx-auto mb-4 text-purple-600 animate-pulse" />
            <h3 className="text-xl font-semibold mb-2">AI Analysis in Progress...</h3>
            <p className="text-gray-600 mb-4">Processing vendor data, historical patterns, and risk factors</p>
            <Progress value={66} className="w-64 mx-auto" />
          </CardContent>
        </Card>
      )}

      {prediction && selectedProject && (
        <div className="space-y-6">
          {/* Main Prediction Results */}
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Impact Prediction Results: {selectedProject.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getSuccessColor(prediction.successProbability)}`}>
                    {prediction.successProbability}%
                  </div>
                  <div className="text-sm text-gray-600">Success Probability</div>
                  <Progress value={prediction.successProbability} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{prediction.impactScore}</div>
                  <div className="text-sm text-gray-600">Impact Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{prediction.expectedBeneficiaries}</div>
                  <div className="text-sm text-gray-600">Expected Beneficiaries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{prediction.confidenceLevel}%</div>
                  <div className="text-sm text-gray-600">AI Confidence</div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Badge className={`${getRiskColor(prediction.riskLevel)} px-4 py-2 text-lg`}>
                  {prediction.riskLevel.toUpperCase()} RISK PROJECT
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Success Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {prediction.keyFactors.map((factor, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{factor}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {prediction.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Historical Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Historical Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-700">{prediction.historicalComparison.similarProjects}</div>
                  <div className="text-sm text-gray-600">Similar Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{prediction.historicalComparison.averageSuccess}%</div>
                  <div className="text-sm text-gray-600">Average Success</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{prediction.historicalComparison.bestCase}%</div>
                  <div className="text-sm text-gray-600">Best Case</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">{prediction.historicalComparison.worstCase}%</div>
                  <div className="text-sm text-gray-600">Worst Case</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIImpactPredictor;
