
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mt-2 mb-8">{description}</p>
        <p className="text-gray-500 mt-8 text-sm italic mb-8">This feature is under construction. Check back soon!</p>
        <Button asChild>
            <Link to="/" className="inline-flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
            </Link>
        </Button>
      </div>
    </div>
  );
};

export default PlaceholderPage;
