
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, DollarSign, MapPin, AlertTriangle, Eye, Calendar } from 'lucide-react';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'vendor' | 'ngo' | 'corporate' | 'admin';
}

const AnalyticsModal = ({ isOpen, onClose, userType }: AnalyticsModalProps) => {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Sample data for different user types
  const getAnalyticsData = () => {
    switch (userType) {
      case 'vendor':
        return {
          trustScoreData: [
            { month: 'Jan', score: 72, submissions: 8, verifications: 6 },
            { month: 'Feb', score: 75, submissions: 12, verifications: 10 },
            { month: 'Mar', score: 78, submissions: 15, verifications: 13 },
            { month: 'Apr', score: 82, submissions: 18, verifications: 16 },
            { month: 'May', score: 87, submissions: 22, verifications: 20 },
            { month: 'Jun', score: 89, submissions: 25, verifications: 23 },
          ],
          fraudDetection: [
            { type: 'Clean Images', count: 156, percentage: 78 },
            { type: 'Minor Issues', count: 32, percentage: 16 },
            { type: 'Flagged for Review', count: 12, percentage: 6 },
          ],
          fundingData: [
            { month: 'Jan', received: 15000, requested: 20000 },
            { month: 'Feb', received: 20000, requested: 25000 },
            { month: 'Mar', received: 25000, requested: 30000 },
            { month: 'Apr', received: 30000, requested: 35000 },
            { month: 'May', received: 35000, requested: 40000 },
            { month: 'Jun', received: 40000, requested: 45000 },
          ]
        };
      case 'ngo':
        return {
          impactData: [
            { month: 'Jan', vendorsHelped: 45, fundsDistributed: 450000 },
            { month: 'Feb', vendorsHelped: 52, fundsDistributed: 520000 },
            { month: 'Mar', vendorsHelped: 61, fundsDistributed: 610000 },
            { month: 'Apr', vendorsHelped: 68, fundsDistributed: 680000 },
            { month: 'May', vendorsHelped: 75, fundsDistributed: 750000 },
            { month: 'Jun', vendorsHelped: 82, fundsDistributed: 820000 },
          ],
          regionData: [
            { region: 'Mumbai', vendors: 45, funding: 450000 },
            { region: 'Delhi', vendors: 38, funding: 380000 },
            { region: 'Bangalore', vendors: 32, funding: 320000 },
            { region: 'Chennai', vendors: 28, funding: 280000 },
            { region: 'Kolkata', vendors: 25, funding: 250000 },
          ]
        };
      case 'corporate':
        return {
          investmentData: [
            { month: 'Jan', invested: 200000, roi: 15 },
            { month: 'Feb', invested: 250000, roi: 18 },
            { month: 'Mar', invested: 300000, roi: 22 },
            { month: 'Apr', invested: 350000, roi: 25 },
            { month: 'May', invested: 400000, roi: 28 },
            { month: 'Jun', invested: 450000, roi: 32 },
          ],
          impactMetrics: [
            { category: 'Small Businesses Supported', value: 156 },
            { category: 'Jobs Created', value: 342 },
            { category: 'Communities Reached', value: 28 },
            { category: 'Success Rate', value: 87 },
          ]
        };
      default:
        return {
          platformData: [
            { month: 'Jan', vendors: 450, ngos: 45, corporates: 12, totalFunding: 2500000 },
            { month: 'Feb', vendors: 520, ngos: 48, corporates: 14, totalFunding: 2800000 },
            { month: 'Mar', vendors: 610, ngos: 52, corporates: 16, totalFunding: 3200000 },
            { month: 'Apr', vendors: 680, ngos: 55, corporates: 18, totalFunding: 3600000 },
            { month: 'May', vendors: 750, ngos: 58, corporates: 20, totalFunding: 4000000 },
            { month: 'Jun', vendors: 820, ngos: 62, corporates: 22, totalFunding: 4500000 },
          ],
          fraudStats: [
            { type: 'Verified Submissions', count: 8456, color: '#10B981' },
            { type: 'Under Review', count: 1245, color: '#F59E0B' },
            { type: 'Flagged', count: 234, color: '#EF4444' },
          ]
        };
    }
  };

  const data = getAnalyticsData();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Analytics Dashboard - {userType.charAt(0).toUpperCase() + userType.slice(1)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">1 Month</SelectItem>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Vendor Analytics */}
          {userType === 'vendor' && (
            <>
              {/* Trust Score Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Trust Score & Activity Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{ score: { label: 'Trust Score', color: '#3B82F6' } }} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.trustScoreData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} name="Trust Score" />
                        <Line type="monotone" dataKey="submissions" stroke="#10B981" strokeWidth={2} name="Submissions" />
                        <Line type="monotone" dataKey="verifications" stroke="#F59E0B" strokeWidth={2} name="Verifications" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Fraud Detection Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Fraud Detection Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{}} className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={data.fraudDetection}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                            label={({ name, percentage }) => `${name}: ${percentage}%`}
                          >
                            {data.fraudDetection.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Funding Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{}} className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.fundingData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Bar dataKey="received" fill="#10B981" name="Received" />
                          <Bar dataKey="requested" fill="#3B82F6" name="Requested" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* NGO Analytics */}
          {userType === 'ngo' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Impact Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.impactData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Line type="monotone" dataKey="vendorsHelped" stroke="#10B981" strokeWidth={3} name="Vendors Helped" />
                        <Line type="monotone" dataKey="fundsDistributed" stroke="#3B82F6" strokeWidth={2} name="Funds Distributed" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.regionData.map((region, index) => (
                      <div key={region.region} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{region.region}</span>
                          <p className="text-sm text-gray-600">{region.vendors} vendors</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-green-600">₹{region.funding.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Corporate Analytics */}
          {userType === 'corporate' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Investment & ROI Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.investmentData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Line type="monotone" dataKey="invested" stroke="#3B82F6" strokeWidth={3} name="Investment" />
                        <Line type="monotone" dataKey="roi" stroke="#10B981" strokeWidth={2} name="ROI %" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.impactMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{metric.value}{metric.category === 'Success Rate' ? '%' : ''}</div>
                        <div className="text-sm text-gray-600 mt-1">{metric.category}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Admin Analytics */}
          {userType === 'admin' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.platformData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Line type="monotone" dataKey="vendors" stroke="#3B82F6" strokeWidth={3} name="Vendors" />
                        <Line type="monotone" dataKey="ngos" stroke="#10B981" strokeWidth={2} name="NGOs" />
                        <Line type="monotone" dataKey="corporates" stroke="#F59E0B" strokeWidth={2} name="Corporates" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fraud Detection System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.fraudStats}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          label={({ name, count }) => `${name}: ${count}`}
                        >
                          {data.fraudStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnalyticsModal;
