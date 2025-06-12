
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Scale, Users, Shield } from "lucide-react";

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService = ({ onBack }: TermsOfServiceProps) => {
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
          <FileText className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Scale className="h-10 w-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="font-semibold">Fair Terms</h3>
          </div>
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Users className="h-10 w-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="font-semibold">Community</h3>
          </div>
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="font-semibold">Protection</h3>
          </div>
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="font-semibold">Compliance</h3>
          </div>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 dark:text-gray-300">
              By accessing and using EmpowerLink's platform, you accept and agree to be bound by the terms and provision of this agreement. 
              Our platform connects NGOs, corporations, and vendors to create transparent and verifiable social impact.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Platform Services</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              EmpowerLink provides a platform that facilitates:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Connections between NGOs and funding organizations</li>
              <li>Vendor services for social impact projects</li>
              <li>AI-powered impact prediction and verification</li>
              <li>Blockchain-based impact certificates</li>
              <li>VR tours of project sites</li>
              <li>Community engagement and gamification features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Provide accurate and truthful information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use the platform only for lawful purposes</li>
              <li>Respect the intellectual property rights of others</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Report any suspicious or fraudulent activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Financial Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              For funded projects and vendor services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>All financial transactions are processed securely</li>
              <li>Platform fees are clearly disclosed before transactions</li>
              <li>Refund policies apply as specified in project agreements</li>
              <li>Tax obligations remain with individual users and organizations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Intellectual Property</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Users retain ownership of their content while granting EmpowerLink necessary licenses to operate the platform. 
              Our platform technology, including AI algorithms and blockchain implementations, remains our intellectual property.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300">
              EmpowerLink serves as a platform facilitator and is not liable for the actions, decisions, or outcomes of projects 
              conducted through our platform. Users engage with each other at their own risk and discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Governing Law</h2>
            <p className="text-gray-700 dark:text-gray-300">
              These terms are governed by the laws of India. Any disputes will be resolved through arbitration in Mumbai, Maharashtra.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
            <p className="text-gray-700 dark:text-gray-300">
              For questions about these Terms of Service, contact us at{" "}
              <a href="mailto:legal@empowerlink.org" className="text-blue-600 dark:text-blue-400 hover:underline">
                legal@empowerlink.org
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
