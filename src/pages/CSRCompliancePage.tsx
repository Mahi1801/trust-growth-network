
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Clock, Shield } from 'lucide-react';

const complianceItems = [
    { title: 'Annual CSR spending commitment (2% of net profit)', status: 'Met', details: '₹1.2Cr spent in FY 2024-25' },
    { title: 'Formation of CSR Committee', status: 'Met', details: 'Committee formed on April 5, 2024' },
    { title: 'Annual Report on CSR Activities', status: 'Pending', details: 'Due by March 31, 2026' },
    { title: 'Impact Assessment for projects > ₹1Cr', status: 'Met', details: 'Assessment for "Clean Water Initiative" complete' },
    { title: 'Disclosure in Board\'s Report', status: 'Pending', details: 'To be included in next annual report' },
];


const CSRCompliancePage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">CSR Compliance</h1>
            <p className="text-gray-600 mb-8">Track your compliance with national and international CSR regulations.</p>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center"><Shield className="mr-2 h-5 w-5 text-green-600"/>Compliance Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center">
                        <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
                        <div>
                            <p className="font-bold text-xl">Fully Compliant</p>
                            <p className="text-gray-600">All mandatory requirements for FY 2024-25 have been met.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Compliance Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                    {complianceItems.map((item, index) => (
                        <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                            <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-gray-500">{item.details}</p>
                            </div>
                             <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${item.status === 'Met' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {item.status === 'Met' ? <CheckCircle className="h-4 w-4 mr-1"/> : <Clock className="h-4 w-4 mr-1"/>}
                                {item.status}
                            </div>
                        </div>
                    ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
};

export default CSRCompliancePage;
