
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Eye, Lock, Database } from "lucide-react";

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy = ({ onBack }: PrivacyPolicyProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <Eye className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Transparency</h3>
              <p className="text-gray-600 dark:text-gray-400">We are transparent about data collection and usage</p>
            </div>
            <div className="text-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <Lock className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Security</h3>
              <p className="text-gray-600 dark:text-gray-400">Your data is protected with industry-standard encryption</p>
            </div>
            <div className="text-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <Database className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Control</h3>
              <p className="text-gray-600 dark:text-gray-400">You have full control over your personal information</p>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We collect information you provide directly to us, such as when you create an account, participate in projects, or contact us for support.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Name, email address, and contact information</li>
                <li>Organization details for NGOs, corporations, and vendors</li>
                <li>Project information and impact data</li>
                <li>Payment and transaction information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>To provide and maintain our platform services</li>
                <li>To verify user identity and prevent fraud</li>
                <li>To process transactions and payments</li>
                <li>To communicate with you about your account and projects</li>
                <li>To improve our services and develop new features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our platform uses blockchain technology to ensure transparency and immutability of impact data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Rights</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Under applicable data protection laws, including GDPR and Indian data protection regulations, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Delete your account and data</li>
                <li>Port your data to another service</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have any questions about this Privacy Policy or our data practices, please contact us at{" "}
                <a href="mailto:privacy@empowerlink.org" className="text-blue-600 dark:text-blue-400 hover:underline">
                  privacy@empowerlink.org
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
