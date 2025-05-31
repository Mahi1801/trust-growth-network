
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Upload, Search, DollarSign, TrendingUp } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      icon: <Upload className="h-8 w-8 text-blue-600" />,
      title: "Vendors Submit Requests",
      description: "Local vendors upload improvement requests with before photos, receipts, and detailed business plans for growth.",
      color: "bg-blue-50 border-blue-200"
    },
    {
      step: "02",
      icon: <Search className="h-8 w-8 text-green-600" />,
      title: "NGOs Review & Verify",
      description: "Partner NGOs review applications, verify vendor credentials, and assess improvement feasibility using our AI tools.",
      color: "bg-green-50 border-green-200"
    },
    {
      step: "03",
      icon: <DollarSign className="h-8 w-8 text-purple-600" />,
      title: "Corporations Fund Projects",
      description: "Corporate partners browse verified projects and fund improvements that align with their social impact goals.",
      color: "bg-purple-50 border-purple-200"
    },
    {
      step: "04",
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      title: "AI Verifies Impact",
      description: "Our AI system analyzes after photos, tracks progress, and calculates trust scores to verify real improvements.",
      color: "bg-orange-50 border-orange-200"
    }
  ];

  const userJourneys = [
    {
      type: "Vendors",
      icon: "🏪",
      journey: [
        "Create vendor profile with business details",
        "Submit improvement requests with documentation",
        "Receive funding and implement improvements",
        "Upload progress photos and receipts",
        "Build trust score and access more opportunities"
      ]
    },
    {
      type: "NGOs",
      icon: "🤝",
      journey: [
        "Register organization and set focus areas",
        "Review and approve vendor applications",
        "Distribute funds to verified vendors",
        "Monitor progress and provide support",
        "Generate impact reports for stakeholders"
      ]
    },
    {
      type: "Corporations",
      icon: "🏢",
      journey: [
        "Set up corporate impact dashboard",
        "Browse verified improvement projects",
        "Fund projects aligned with CSR goals",
        "Track ROI and impact metrics",
        "Share success stories and outcomes"
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How EmpowerLink Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process connects vendors with funding through verified NGO partnerships, 
            ensuring transparent and measurable social impact.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className={`border-2 ${step.color} hover:shadow-lg transition-all duration-300`}>
                <CardHeader className="text-center">
                  <div className="text-2xl font-bold text-gray-400 mb-2">{step.step}</div>
                  <div className="mx-auto mb-4 p-3 rounded-full bg-white shadow-md">
                    {step.icon}
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* User Journeys */}
        <div className="bg-gray-50 rounded-3xl p-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Tailored Experiences for Every User
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {userJourneys.map((journey, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-3">{journey.icon}</div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    For {journey.type}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {journey.journey.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                          {stepIndex + 1}
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
