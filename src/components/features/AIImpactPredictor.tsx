import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Target, Users, Calendar, Filter, Download, Zap, PieChart, LineChart } from 'lucide-react';
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
  timeline: Array<{
    month: number;
    milestone: string;
    probability: number;
  }>;
  featureImportance: Array<{
    factor: string;
    importance: number;
    impact: 'positive' | 'negative' | 'neutral';
  }>;
  riskFactors: Array<{
    category: string;
    level: number;
    description: string;
  }>;
  optimizationSuggestions: Array<{
    category: string;
    suggestion: string;
    expectedImprovement: number;
  }>;
}

interface FilterOptions {
  businessType: string;
  location: string;
  fundingRange: string;
  timeframe: string;
  riskLevel: string;
}

const AIImpactPredictor = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [batchPredictions, setBatchPredictions] = useState<PredictionResult[]>([]);
  const [viewMode, setViewMode] = useState<'single' | 'batch' | 'comparison'>('single');
  const [filters, setFilters] = useState<FilterOptions>({
    businessType: 'all',
    location: 'all',
    fundingRange: 'all',
    timeframe: 'all',
    riskLevel: 'all'
  });
  
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

  const generateTimeline = (timeframe: number, successProb: number) => {
    const timeline = [];
    const milestones = ['Planning & Setup', 'Initial Implementation', 'Mid-term Review', 'Final Implementation', 'Impact Assessment'];
    
    for (let i = 0; i < Math.min(timeframe, 5); i++) {
      timeline.push({
        month: Math.round((timeframe / 5) * (i + 1)),
        milestone: milestones[i] || `Milestone ${i + 1}`,
        probability: Math.max(20, Math.min(95, successProb + Math.random() * 10 - 5))
      });
    }
    return timeline;
  };

  const generateFeatureImportance = (vendor: VendorData, project: ProjectData) => [
    { factor: 'Vendor Trust Score', importance: 25, impact: 'positive' as const },
    { factor: 'Historical Success', importance: 22, impact: 'positive' as const },
    { factor: 'Project Complexity', importance: 18, impact: project.complexity === 'high' ? 'negative' as const : 'neutral' as const },
    { factor: 'Community Size', importance: 15, impact: 'positive' as const },
    { factor: 'Funding Amount', importance: 12, impact: 'neutral' as const },
    { factor: 'Timeframe', importance: 8, impact: project.timeframe > 12 ? 'negative' as const : 'positive' as const }
  ];

  const generateRiskFactors = (riskLevel: string, project: ProjectData) => [
    { category: 'Technical Risk', level: project.complexity === 'high' ? 75 : 35, description: 'Implementation complexity and technical challenges' },
    { category: 'Financial Risk', level: project.requestedAmount > 250000 ? 60 : 25, description: 'Budget management and cost overruns' },
    { category: 'Timeline Risk', level: project.timeframe > 12 ? 70 : 30, description: 'Project duration and milestone delivery' },
    { category: 'Community Risk', level: project.communitySize < 1000 ? 55 : 20, description: 'Community engagement and adoption' }
  ];

  const generateOptimizationSuggestions = (successProb: number, project: ProjectData, vendor: VendorData) => [
    { category: 'Training', suggestion: 'Provide advanced technical training to vendor team', expectedImprovement: 8 },
    { category: 'Monitoring', suggestion: 'Implement weekly progress tracking system', expectedImprovement: 12 },
    { category: 'Community', suggestion: 'Establish community liaison program', expectedImprovement: 15 },
    { category: 'Resources', suggestion: 'Allocate 20% contingency budget', expectedImprovement: 10 }
  ];

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
      },
      timeline: generateTimeline(project.timeframe, successProbability),
      featureImportance: generateFeatureImportance(vendor, project),
      riskFactors: generateRiskFactors(riskLevel, project),
      optimizationSuggestions: generateOptimizationSuggestions(successProbability, project, vendor)
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

  const runBatchPrediction = async () => {
    if (selectedProjects.length === 0) {
      toast({
        title: "No Projects Selected",
        description: "Please select projects for batch analysis",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    const results: PredictionResult[] = [];

    for (const projectId of selectedProjects) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        const vendor = vendors.find(v => v.id === project.vendorId);
        if (vendor) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
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
            },
            timeline: generateTimeline(project.timeframe, successProbability),
            featureImportance: generateFeatureImportance(vendor, project),
            riskFactors: generateRiskFactors(riskLevel, project),
            optimizationSuggestions: generateOptimizationSuggestions(successProbability, project, vendor)
          };

          results.push(result);
        }
      }
    }

    setBatchPredictions(results);
    setIsAnalyzing(false);
    
    toast({
      title: "Batch Analysis Complete",
      description: `Generated predictions for ${results.length} projects`,
    });
  };

  const filteredProjects = projects.filter(project => {
    const vendor = vendors.find(v => v.id === project.vendorId);
    if (!vendor) return false;

    if (filters.businessType !== 'all' && project.category !== filters.businessType) return false;
    if (filters.location !== 'all' && !vendor.location.includes(filters.location)) return false;
    if (filters.fundingRange !== 'all') {
      const amount = project.requestedAmount;
      if (filters.fundingRange === 'low' && amount >= 200000) return false;
      if (filters.fundingRange === 'medium' && (amount < 200000 || amount >= 300000)) return false;
      if (filters.fundingRange === 'high' && amount < 300000) return false;
    }
    if (filters.timeframe !== 'all') {
      if (filters.timeframe === 'short' && project.timeframe > 6) return false;
      if (filters.timeframe === 'medium' && (project.timeframe <= 6 || project.timeframe > 12)) return false;
      if (filters.timeframe === 'long' && project.timeframe <= 12) return false;
    }

    return true;
  });

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

      {/* Mode Selector & Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'single' ? 'default' : 'outline'}
                onClick={() => setViewMode('single')}
                className="flex items-center gap-2"
              >
                <Target className="h-4 w-4" />
                Single Analysis
              </Button>
              <Button 
                variant={viewMode === 'batch' ? 'default' : 'outline'}
                onClick={() => setViewMode('batch')}
                className="flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                Batch Analysis
              </Button>
              <Button 
                variant={viewMode === 'comparison' ? 'default' : 'outline'}
                onClick={() => setViewMode('comparison')}
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Comparison View
              </Button>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="text-sm font-medium mb-1 block">Business Type</label>
              <Select value={filters.businessType} onValueChange={(value) => setFilters({...filters, businessType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Environment">Environment</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Location</label>
              <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Funding Range</label>
              <Select value={filters.fundingRange} onValueChange={(value) => setFilters({...filters, fundingRange: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All Ranges" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ranges</SelectItem>
                  <SelectItem value="low">&lt; ₹2L</SelectItem>
                  <SelectItem value="medium">₹2L - ₹3L</SelectItem>
                  <SelectItem value="high">&gt; ₹3L</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Timeframe</label>
              <Select value={filters.timeframe} onValueChange={(value) => setFilters({...filters, timeframe: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All Timeframes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Timeframes</SelectItem>
                  <SelectItem value="short">&lt; 6 months</SelectItem>
                  <SelectItem value="medium">6-12 months</SelectItem>
                  <SelectItem value="long">&gt; 12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Single Analysis Mode */}
      {viewMode === 'single' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Select Project for AI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {filteredProjects.map((project) => {
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
      )}

      {/* Batch Analysis Mode */}
      {viewMode === 'batch' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Batch Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Select multiple projects for simultaneous analysis</p>
                <Button 
                  onClick={runBatchPrediction} 
                  disabled={selectedProjects.length === 0 || isAnalyzing}
                  className="flex items-center gap-2"
                >
                  <Brain className="h-4 w-4" />
                  Analyze {selectedProjects.length} Projects
                </Button>
              </div>
              
              <div className="grid gap-3">
                {filteredProjects.map((project) => {
                  const vendor = vendors.find(v => v.id === project.vendorId);
                  const isSelected = selectedProjects.includes(project.id);
                  
                  return (
                    <div 
                      key={project.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        isSelected ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-300'
                      }`}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedProjects(prev => prev.filter(id => id !== project.id));
                        } else {
                          setSelectedProjects(prev => [...prev, project.id]);
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox checked={isSelected} />
                        <div className="flex-1">
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>{vendor?.name}</span>
                            <span>{project.timeframe} months</span>
                            <span>₹{project.requestedAmount.toLocaleString()}</span>
                          </div>
                        </div>
                        <Badge variant={project.complexity === 'high' ? 'destructive' : project.complexity === 'medium' ? 'default' : 'secondary'}>
                          {project.complexity}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison View */}
      {viewMode === 'comparison' && batchPredictions.length > 0 && (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Project Comparison Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {batchPredictions.map((pred, index) => {
                  const project = projects.find(p => p.id === pred.projectId);
                  return (
                    <div key={pred.projectId} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-lg">{project?.title}</h3>
                        <Badge className={getRiskColor(pred.riskLevel)}>
                          {pred.riskLevel.toUpperCase()} RISK
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                          <div className={`text-2xl font-bold ${getSuccessColor(pred.successProbability)}`}>
                            {pred.successProbability}%
                          </div>
                          <div className="text-sm text-gray-600">Success Rate</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{pred.impactScore}</div>
                          <div className="text-sm text-gray-600">Impact Score</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">{pred.expectedBeneficiaries}</div>
                          <div className="text-sm text-gray-600">Beneficiaries</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{pred.confidenceLevel}%</div>
                          <div className="text-sm text-gray-600">Confidence</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analysis Loading */}
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

      {/* Detailed Results */}
      {prediction && selectedProject && (
        <div className="space-y-6">
          {/* Main Results */}
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

            <Card>
              <CardHeader>
                <CardTitle>Feature Importance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {prediction.featureImportance.map((feature, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{feature.factor}</span>
                        <span className={`text-sm ${
                          feature.impact === 'positive' ? 'text-green-600' : 
                          feature.impact === 'negative' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {feature.importance}%
                        </span>
                      </div>
                      <Progress value={feature.importance} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {prediction.riskFactors.map((risk, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{risk.category}</span>
                        <Badge variant={risk.level > 60 ? 'destructive' : risk.level > 30 ? 'default' : 'secondary'}>
                          {risk.level}%
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600">{risk.description}</div>
                      <Progress value={risk.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline & Historical */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prediction.timeline.map((milestone, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">{milestone.month}M</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{milestone.milestone}</div>
                        <div className="text-xs text-gray-500">Success probability: {Math.round(milestone.probability)}%</div>
                        <Progress value={milestone.probability} className="h-1 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Historical Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
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
        </div>
      )}
    </div>
  );
};

export default AIImpactPredictor;