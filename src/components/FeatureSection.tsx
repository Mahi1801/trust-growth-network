
import { Brain, Shield, Headset, Trophy, BookOpen, ArrowRight, Star, Zap, Play, Users, Quote, Award, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const FeatureSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const uniqueFeatures = [
    {
      icon: Brain,
      title: "AI Impact Predictor",
      description: "Machine learning algorithms predict project success rates and social impact before funding with 98.7% accuracy",
      color: "from-purple-600 to-blue-600",
      metrics: { accuracy: "98.7%", projects: "1,250+", dataPoints: "50+" },
      status: "Live",
      benefits: ["Predict long-term impact", "Risk assessment", "Data-driven decisions"]
    },
    {
      icon: Shield,
      title: "Blockchain Impact Certificates",
      description: "NFT-based certificates create a tradeable impact economy with immutable proof of social achievements",
      color: "from-emerald-600 to-blue-600",
      metrics: { marketValue: "₹2.3M", certificates: "156", verification: "98.7%" },
      status: "Live",
      benefits: ["Immutable proof", "Tradeable credits", "Corporate portfolios"]
    },
    {
      icon: Headset,
      title: "Virtual Reality Impact Tours",
      description: "Immersive VR experiences showing before/after transformations with 360° documentation for remote visits",
      color: "from-cyan-600 to-blue-600",
      metrics: { tours: "24", views: "3,400+", funding: "+67%" },
      status: "Live",
      benefits: ["Immersive visits", "360° documentation", "Remote engagement"]
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "CSR Director, TechCorp India",
      company: "Fortune 500 Company",
      content: "EmpowerLink's AI predictions helped us allocate ₹50 lakhs more effectively. We saw 3x better outcomes compared to traditional funding.",
      image: "/placeholder.svg",
      impact: "₹50L+ Optimized",
      rating: 5
    },
    {
      name: "Rahul Mehta",
      role: "Founder & CEO",
      company: "GreenEarth NGO",
      content: "The blockchain certificates transformed our credibility. We now have verifiable proof of impact that corporations trust completely.",
      image: "/placeholder.svg",
      impact: "300% Trust Increase",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Social Entrepreneur",
      company: "Rural Development Ventures",
      content: "VR tours revolutionized our funding presentations. Investors can now 'visit' our rural projects without leaving Mumbai.",
      image: "/placeholder.svg",
      impact: "150% Faster Funding",
      rating: 5
    }
  ];

  const scrollToUniqueFeatures = () => {
    // In a real app, this would navigate to the unique features dashboard
    alert("🚀 Unique Features Dashboard would open here! This showcases all 5 revolutionary features in detail with live demos and interactions.");
  };

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50/80 to-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-purple-100/90 text-purple-700 px-4 py-2 backdrop-blur-sm">
            <Star className="h-4 w-4 mr-2" />
            Revolutionary Technology
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 drop-shadow-md">
            Core Features That
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-extrabold">
              {" "}Change Everything
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Experience the world's first platform combining AI prediction, blockchain verification, 
            and VR experiences for transparent social impact.
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {uniqueFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className={`relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group card-hover animate-fade-in animate-delay-${index * 100}`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <Badge className="bg-green-100/90 text-green-700 backdrop-blur-sm">
                      <Zap className="h-3 w-3 mr-1" />
                      {feature.status}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl mb-2 text-gray-900 font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.entries(feature.metrics).map(([key, value], i) => (
                      <div key={i} className="text-center bg-gray-50/80 backdrop-blur-sm p-2 rounded-lg border border-gray-200/50">
                        <div className="font-bold text-sm text-gray-900">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      </div>
                    ))}
                  </div>

                  {/* Benefits - Always visible */}
                  <div className="animate-fade-in">
                    <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                      <Play className="h-3 w-3 text-purple-600" />
                      Key Benefits:
                    </h4>
                    <div className="space-y-1">
                      {feature.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              </Card>
            );
          })}
        </div>

        {/* Success Stories & Testimonials Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-100/90 text-emerald-700 px-4 py-2 backdrop-blur-sm">
              <Users className="h-4 w-4 mr-2" />
              Real Impact Stories
            </Badge>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 drop-shadow-md">
              Transforming Lives Across
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent font-extrabold">
                {" "}India
              </span>
            </h3>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
              See how organizations are achieving unprecedented impact with our revolutionary platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative bg-white/90 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-bl-3xl flex items-center justify-center">
                  <Quote className="h-8 w-8 text-white" />
                </div>
                
                <CardHeader className="pb-4 pt-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-blue-600 font-semibold">{testimonial.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-3 rounded-lg border border-emerald-200/50">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-emerald-600" />
                      <span className="font-semibold text-emerald-700 text-sm">Impact Achieved:</span>
                    </div>
                    <p className="text-emerald-800 font-bold">{testimonial.impact}</p>
                  </div>
                </CardContent>

                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 rounded-3xl p-12 text-white shadow-2xl animate-scale-in">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">
            Join the Impact Revolution
          </h3>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto text-lg font-medium">
            Experience the future of social impact with AI predictions, blockchain verification, 
            and immersive VR tours that transform how we measure and achieve change.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button 
              size="lg"
              onClick={scrollToUniqueFeatures}
              className="bg-white text-purple-600 hover:bg-purple-50 px-10 py-4 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Play className="mr-2 h-5 w-5" />
              Explore All Features
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/80 text-white hover:bg-white/20 hover:border-white bg-white/10 px-8 py-4 text-lg backdrop-blur-sm font-semibold transform hover:scale-105 transition-all shadow-lg"
            >
              Watch Success Stories
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-purple-200">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium">Free to start exploring</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium">Live demos available</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium">Join 1000+ organizations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
