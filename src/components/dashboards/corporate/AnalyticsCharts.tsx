
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';

const roiData = [
  { month: 'Jan', investment: 100000, socialReturn: 120000, brandValue: 25000 },
  { month: 'Feb', investment: 150000, socialReturn: 180000, brandValue: 35000 },
  { month: 'Mar', investment: 120000, socialReturn: 160000, brandValue: 40000 },
  { month: 'Apr', investment: 200000, socialReturn: 250000, brandValue: 50000 },
  { month: 'May', investment: 180000, socialReturn: 230000, brandValue: 55000 },
];

const AnalyticsCharts = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    <Card className="card-hover bg-white border-2 border-gray-200">
      <CardHeader>
        <CardTitle>Social ROI Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{ socialReturn: { label: 'Social Return', color: '#10B981' } }} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={roiData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Line type="monotone" dataKey="socialReturn" stroke="#10B981" strokeWidth={3} />
              <Line type="monotone" dataKey="investment" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>

    <Card className="card-hover bg-white border-2 border-gray-200">
      <CardHeader>
        <CardTitle>Brand Value Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{ brandValue: { label: 'Brand Value', color: '#8B5CF6' } }} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={roiData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="brandValue" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  </div>
);

export default AnalyticsCharts;
