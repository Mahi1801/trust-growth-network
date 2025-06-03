
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Wand2, Globe, Share2, Download, Languages } from 'lucide-react';

interface GeneratedStory {
  title: string;
  content: string;
  language: string;
  metrics: {
    readability: number;
    engagement: number;
    impact: number;
  };
  tags: string[];
}

const AIStoryGenerator = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedTone, setSelectedTone] = useState('inspiring');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null);

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'हिंदी' },
    { value: 'spanish', label: 'Español' },
    { value: 'french', label: 'Français' },
    { value: 'arabic', label: 'العربية' }
  ];

  const tones = [
    { value: 'inspiring', label: 'Inspiring' },
    { value: 'professional', label: 'Professional' },
    { value: 'emotional', label: 'Emotional' },
    { value: 'data-driven', label: 'Data-Driven' }
  ];

  const mockStories = {
    english: {
      title: "From Darkness to Light: The Transformation of Riverside Village",
      content: `In the heart of rural Maharashtra, where the sun sets behind endless fields of sugarcane, lies Riverside Village—a community that has witnessed an extraordinary transformation. 

Just eighteen months ago, families here relied on kerosene lamps and candles after sunset. Children struggled to complete homework in dim light, while local businesses closed their doors as darkness fell. The story of how this changed is one of collaboration, innovation, and the power of sustainable impact.

The Spark of Change

When EmpowerLink partner organization SolarTech Solutions first visited Riverside Village, they found a community eager for change but lacking the resources to achieve it. Through our AI-powered impact prediction system, we identified this village as having a 92% probability of successful solar energy adoption—one of the highest scores in our database.

The project brought together three key stakeholders: SolarTech Solutions provided technical expertise, GreenFuture NGO handled community engagement, and TechCorp India funded the initiative through our platform. This collaboration installed solar panels across 45 households, a community center, and the local school.

Measurable Impact

Today, the numbers tell a powerful story:
• 180 people now have access to clean, reliable electricity
• School enrollment increased by 34% as evening study became possible
• 12 new small businesses have opened, extending operating hours
• CO2 emissions reduced by 15 tons annually
• Average household savings: ₹2,400 per year

But beyond the statistics lies something more profound. As village elder Ramesh Patil shares, "When the lights first came on, my granddaughter could finally read her favorite books after dinner. That moment, I knew our village would never be the same."

The Ripple Effect

The success at Riverside Village has created a ripple effect across the region. Three neighboring villages have initiated similar projects, and our blockchain-verified impact certificates have attracted additional corporate partners seeking authentic sustainability investments.

This story represents more than just infrastructure development—it's proof that when technology, expertise, and funding align through EmpowerLink's platform, transformational change becomes not just possible, but inevitable.

Today, as solar panels glisten in the morning sun across Riverside Village, they stand as monuments to what can be achieved when communities, organizations, and corporations unite for a common purpose. The village that once went dark at sunset now shines as a beacon of sustainable development for the entire region.`,
      language: 'English',
      metrics: {
        readability: 8.5,
        engagement: 9.2,
        impact: 9.7
      },
      tags: ['Solar Energy', 'Rural Development', 'Education', 'Sustainability', 'Community Impact']
    },
    hindi: {
      title: "अंधेरे से उजाले तक: रिवरसाइड गांव का बदलाव",
      content: `महाराष्ट्र के ग्रामीण इलाके में, जहां सूरज गन्ने के अंतहीन खेतों के पीछे डूबता है, रिवरसाइड गांव है—एक ऐसा समुदाय जिसने एक असाधारण बदलाव देखा है।

केवल अठारह महीने पहले, यहां के परिवार सूर्यास्त के बाद मिट्टी के तेल के दीयों और मोमबत्तियों पर निर्भर थे। बच्चे मंद रोशनी में होमवर्क करने के लिए संघर्ष करते थे, जबकि स्थानीय व्यवसाय अंधेरा होते ही अपने दरवाजे बंद कर देते थे।

परिवर्तन की चिंगारी

जब EmpowerLink के पार्टनर संगठन SolarTech Solutions ने पहली बार रिवरसाइड गांव का दौरा किया, तो उन्होंने बदलाव के लिए उत्सुक लेकिन संसाधनों की कमी वाला एक समुदाय पाया। हमारे AI-पावर्ड इम्पैक्ट प्रेडिक्शन सिस्टम के माध्यम से, हमने इस गांव को सौर ऊर्जा अपनाने की 92% संभावना के साथ पहचाना।

आज के आंकड़े एक शक्तिशाली कहानी कहते हैं:
• 180 लोगों को अब स्वच्छ, विश्वसनीय बिजली की पहुंच है
• स्कूल में दाखिला 34% बढ़ा है
• 12 नए छोटे व्यवसाय खुले हैं
• CO2 उत्सर्जन में 15 टन की वार्षिक कमी
• औसत घरेलू बचत: ₹2,400 प्रति वर्ष

आज, रिवरसाइड गांव भर में सुबह की धूप में चमकते सौर पैनल इस बात के स्मारक के रूप में खड़े हैं कि जब समुदाय, संगठन और निगम एक साझा उद्देश्य के लिए एकजुट होते हैं तो क्या हासिल किया जा सकता है।`,
      language: 'Hindi',
      metrics: {
        readability: 8.2,
        engagement: 9.0,
        impact: 9.5
      },
      tags: ['सौर ऊर्जा', 'ग्रामीण विकास', 'शिक्षा', 'स्थिरता', 'सामुदायिक प्रभाव']
    }
  };

  const generateStory = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation process
    setTimeout(() => {
      const story = mockStories[selectedLanguage as keyof typeof mockStories] || mockStories.english;
      setGeneratedStory(story);
      setIsGenerating(false);
    }, 3000);
  };

  const shareStory = () => {
    if (generatedStory) {
      navigator.clipboard.writeText(generatedStory.content);
      alert('Story copied to clipboard!');
    }
  };

  const downloadStory = () => {
    if (generatedStory) {
      const element = document.createElement('a');
      const file = new Blob([generatedStory.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `impact-story-${selectedLanguage}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <BookOpen className="h-8 w-8" />
            AI-Generated Impact Stories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-emerald-100 mb-4">
            Automatically transform data into compelling narratives that showcase real impact. 
            Generate personalized stories in multiple languages for different stakeholders.
          </p>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-emerald-200">Languages</div>
            </div>
            <div>
              <div className="text-2xl font-bold">2,400+</div>
              <div className="text-sm text-emerald-200">Stories Generated</div>
            </div>
            <div>
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm text-emerald-200">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold">4.8★</div>
              <div className="text-sm text-emerald-200">User Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Story Generation Interface */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Story Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Project Data Source</label>
              <Select defaultValue="riverside-solar">
                <SelectTrigger>
                  <SelectValue placeholder="Select a project..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="riverside-solar">Riverside Village Solar Project</SelectItem>
                  <SelectItem value="education-digital">Digital Education Initiative</SelectItem>
                  <SelectItem value="water-purification">Clean Water Program</SelectItem>
                  <SelectItem value="healthcare-mobile">Mobile Healthcare Units</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Target Language</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      <div className="flex items-center gap-2">
                        <Languages className="h-4 w-4" />
                        {lang.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Story Tone</label>
              <Select value={selectedTone} onValueChange={setSelectedTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((tone) => (
                    <SelectItem key={tone.value} value={tone.value}>
                      {tone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Target Audience</label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">Corporate Funders</Button>
                <Button variant="outline" size="sm">Community Members</Button>
                <Button variant="outline" size="sm">Media & Press</Button>
                <Button variant="outline" size="sm">Government Officials</Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Story Length</label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (500 words)</SelectItem>
                  <SelectItem value="medium">Medium (1000 words)</SelectItem>
                  <SelectItem value="long">Long (2000 words)</SelectItem>
                  <SelectItem value="detailed">Detailed Report (3000+ words)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={generateStory}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Story...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate AI Story
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Story Preview */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated Story Preview</span>
              {generatedStory && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={shareStory}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadStory}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="text-center py-8">
                <Wand2 className="h-12 w-12 mx-auto mb-4 animate-spin text-blue-600" />
                <p className="text-gray-600">AI is crafting your impact story...</p>
                <div className="mt-4 space-y-2">
                  <div className="bg-gray-200 h-4 rounded animate-pulse"></div>
                  <div className="bg-gray-200 h-4 rounded animate-pulse w-3/4"></div>
                  <div className="bg-gray-200 h-4 rounded animate-pulse w-1/2"></div>
                </div>
              </div>
            ) : generatedStory ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">{generatedStory.title}</h3>
                  <div className="flex gap-2 mb-3">
                    <Badge variant="outline">
                      <Globe className="h-3 w-3 mr-1" />
                      {generatedStory.language}
                    </Badge>
                    {generatedStory.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="max-h-64 overflow-y-auto text-sm leading-relaxed text-gray-700 border-l-4 border-blue-500 pl-4">
                  {generatedStory.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-3">{paragraph}</p>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{generatedStory.metrics.readability}/10</div>
                    <div className="text-xs text-gray-600">Readability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{generatedStory.metrics.engagement}/10</div>
                    <div className="text-xs text-gray-600">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{generatedStory.metrics.impact}/10</div>
                    <div className="text-xs text-gray-600">Impact Score</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="h-12 w-12 mx-auto mb-4" />
                <p>Configure your story settings and click "Generate AI Story" to begin</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Feature Showcase */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="text-center p-6">
            <Languages className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Multi-Language Support</h3>
            <p className="text-sm text-gray-600">Generate stories in 50+ languages with cultural context and local terminology</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="text-center p-6">
            <Wand2 className="h-12 w-12 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Smart Personalization</h3>
            <p className="text-sm text-gray-600">AI adapts tone, length, and focus based on target audience and stakeholder type</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="text-center p-6">
            <Globe className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Global Reach</h3>
            <p className="text-sm text-gray-600">Stories optimized for different cultures, making impact accessible worldwide</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIStoryGenerator;
