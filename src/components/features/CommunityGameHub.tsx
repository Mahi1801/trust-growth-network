
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Star, Users, Calendar, Zap, Gift, Crown } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'Infrastructure' | 'Education' | 'Health' | 'Environment';
  participants: number;
  prize: string;
  endDate: string;
  progress: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  type: 'vendor' | 'ngo' | 'corporate';
  points: number;
  badge: string;
  projects: number;
}

const CommunityGameHub = () => {
  const [activeTab, setActiveTab] = useState<'challenges' | 'leaderboard' | 'achievements'>('challenges');
  const [userPoints, setUserPoints] = useState(1250);

  const challenges: Challenge[] = [
    {
      id: "CHAL-001",
      title: "Clean Water Challenge",
      description: "Install 10 water purification systems in rural areas",
      category: "Infrastructure",
      participants: 45,
      prize: "₹50,000 + Impact Certificate",
      endDate: "2024-07-15",
      progress: 67,
      difficulty: "Medium",
      points: 500
    },
    {
      id: "CHAL-002",
      title: "Digital Literacy Sprint",
      description: "Train 100 people in basic computer skills",
      category: "Education",
      participants: 23,
      prize: "₹30,000 + Recognition",
      endDate: "2024-06-30",
      progress: 34,
      difficulty: "Easy",
      points: 300
    },
    {
      id: "CHAL-003",
      title: "Green City Initiative",
      description: "Plant 1000 trees and create urban gardens",
      category: "Environment",
      participants: 67,
      prize: "₹75,000 + Eco Badge",
      endDate: "2024-08-01",
      progress: 89,
      difficulty: "Hard",
      points: 750
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: "GreenTech Solutions", type: "vendor", points: 3450, badge: "🏆 Impact Champion", projects: 15 },
    { rank: 2, name: "Education First NGO", type: "ngo", points: 3200, badge: "📚 Learning Leader", projects: 12 },
    { rank: 3, name: "Tech Corp India", type: "corporate", points: 2890, badge: "💼 Corporate Star", projects: 8 },
    { rank: 4, name: "Rural Development Co", type: "vendor", points: 2650, badge: "🌟 Rising Star", projects: 11 },
    { rank: 5, name: "Health Plus NGO", type: "ngo", points: 2400, badge: "❤️ Health Hero", projects: 9 }
  ];

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case 'vendor': return '🔧';
      case 'ngo': return '🤝';
      case 'corporate': return '🏢';
      default: return '👤';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Infrastructure': return 'bg-blue-100 text-blue-800';
      case 'Education': return 'bg-green-100 text-green-800';
      case 'Health': return 'bg-red-100 text-red-800';
      case 'Environment': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            Community Game Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-2">Transform communities while earning rewards and recognition!</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  <span className="font-bold">{userPoints} Points</span>
                </div>
                <Badge className="bg-white text-purple-600">
                  <Crown className="h-4 w-4 mr-1" />
                  Impact Pioneer
                </Badge>
              </div>
            </div>
            <Gift className="h-16 w-16 opacity-80" />
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-2">
        <Button 
          variant={activeTab === 'challenges' ? 'default' : 'outline'}
          onClick={() => setActiveTab('challenges')}
          className="flex items-center gap-2"
        >
          <Target className="h-4 w-4" />
          Challenges
        </Button>
        <Button 
          variant={activeTab === 'leaderboard' ? 'default' : 'outline'}
          onClick={() => setActiveTab('leaderboard')}
          className="flex items-center gap-2"
        >
          <Trophy className="h-4 w-4" />
          Leaderboard
        </Button>
        <Button 
          variant={activeTab === 'achievements' ? 'default' : 'outline'}
          onClick={() => setActiveTab('achievements')}
          className="flex items-center gap-2"
        >
          <Star className="h-4 w-4" />
          Achievements
        </Button>
      </div>

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="grid gap-4">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {challenge.title}
                      <Badge className={getCategoryColor(challenge.category)}>
                        {challenge.category}
                      </Badge>
                    </CardTitle>
                    <p className="text-gray-600 mt-1">{challenge.description}</p>
                  </div>
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{challenge.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Ends {challenge.endDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{challenge.points} points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{challenge.prize}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} />
                </div>
                
                <Button className="w-full">Join Challenge</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <Card>
          <CardHeader>
            <CardTitle>Community Leaders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboard.map((entry) => (
                <div key={entry.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-gray-400">#{entry.rank}</div>
                    <div className="text-2xl">{getUserTypeIcon(entry.type)}</div>
                    <div>
                      <p className="font-semibold">{entry.name}</p>
                      <p className="text-sm text-gray-600">{entry.badge}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">{entry.points} pts</p>
                    <p className="text-sm text-gray-600">{entry.projects} projects</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-2 border-yellow-200 bg-yellow-50">
            <CardContent className="text-center p-6">
              <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
              <h3 className="font-bold">First Impact</h3>
              <p className="text-sm text-gray-600">Complete your first project</p>
              <Badge className="mt-2 bg-yellow-600">Earned</Badge>
            </CardContent>
          </Card>
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="text-center p-6">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <h3 className="font-bold">Team Player</h3>
              <p className="text-sm text-gray-600">Collaborate with 5 partners</p>
              <Badge className="mt-2 bg-blue-600">Earned</Badge>
            </CardContent>
          </Card>
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="text-center p-6">
              <Star className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <h3 className="font-bold">Impact Master</h3>
              <p className="text-sm text-gray-600">Reach 1000 people helped</p>
              <Badge className="mt-2 bg-green-600">Earned</Badge>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CommunityGameHub;
