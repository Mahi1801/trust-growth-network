
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Target, Users, Globe } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Our Mission",
      description: "To create sustainable economic opportunities for local vendors while enabling transparent social impact investment for corporations and NGOs."
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Community Focus",
      description: "We believe in empowering local communities by providing them with the tools and funding needed to improve their businesses and livelihoods."
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: "Global Impact",
      description: "Our platform connects local needs with global resources, creating a network of positive change that spans across continents."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-orange-600" />,
      title: "Transparency",
      description: "Every transaction, improvement, and outcome is verified and tracked, ensuring complete transparency in the impact creation process."
    }
  ];

  const stats = [
    { number: "95%", label: "Vendor Satisfaction Rate" },
    { number: "87%", label: "Funding Success Rate" },
    { number: "120+", label: "Countries Reached" },
    { number: "4.8/5", label: "Platform Rating" }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About EmpowerLink
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building the world's most trusted platform for social impact investment, 
            connecting communities, organizations, and corporations to create lasting positive change.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gray-100 w-fit">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Driving Real Change Through Technology
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our AI-powered platform ensures every dollar invested creates measurable impact. 
                Through advanced image verification, trust scoring, and real-time tracking, 
                we're revolutionizing how social impact is created and measured.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">AI-powered verification system</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Real-time impact tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Transparent fund distribution</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Community-driven approach</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
