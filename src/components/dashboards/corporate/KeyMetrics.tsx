
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";

const KeyMetrics = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <Card className="bg-white border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <CardHeader className="pb-3 bg-white rounded-t-lg border-b border-gray-200">
        <CardTitle className="text-lg font-bold text-black text-center">
          Total Investment
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 bg-white rounded-b-lg text-center">
        <div className="text-4xl font-bold text-blue-600 mb-2">
          ₹<CountUp end={15.2} duration={2500} />M
        </div>
        <p className="text-sm text-gray-600 font-medium">
          +<CountUp end={22} duration={2000} />% from last quarter
        </p>
      </CardContent>
    </Card>

    <Card className="bg-white border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <CardHeader className="pb-3 bg-white rounded-t-lg border-b border-gray-200">
        <CardTitle className="text-lg font-bold text-black text-center">
          Social ROI
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 bg-white rounded-b-lg text-center">
        <div className="text-4xl font-bold text-green-600 mb-2">
          <CountUp end={3.4} duration={2000} />x
        </div>
        <p className="text-sm text-gray-600 font-medium">
          ₹<CountUp end={51.7} duration={2300} />M social value created
        </p>
      </CardContent>
    </Card>

    <Card className="bg-white border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <CardHeader className="pb-3 bg-white rounded-t-lg border-b border-gray-200">
        <CardTitle className="text-lg font-bold text-black text-center">
          Brand Impact Score
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 bg-white rounded-b-lg text-center">
        <div className="text-4xl font-bold text-purple-600 mb-2">
          <CountUp end={92} duration={1800} />/100
        </div>
        <p className="text-sm text-gray-600 font-medium">Excellent brand perception</p>
      </CardContent>
    </Card>

    <Card className="bg-white border-2 border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <CardHeader className="pb-3 bg-white rounded-t-lg border-b border-gray-200">
        <CardTitle className="text-lg font-bold text-black text-center">
          Active Campaigns
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 bg-white rounded-b-lg text-center">
        <div className="text-4xl font-bold text-orange-600 mb-2">
          <CountUp end={12} duration={1500} />
        </div>
        <p className="text-sm text-gray-600 font-medium">
          Across <CountUp end={8} duration={1200} /> cities
        </p>
      </CardContent>
    </Card>
  </div>
);

export default KeyMetrics;
