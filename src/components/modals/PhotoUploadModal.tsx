
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Upload, CheckCircle, AlertTriangle, X, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PhotoUploadModal = ({ isOpen, onClose }: PhotoUploadModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fraudDetectionResults, setFraudDetectionResults] = useState<any[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeImage = async (file: File) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Simulate AI fraud detection analysis
        const hasStorefront = Math.random() > 0.3; // 70% chance of detecting storefront
        const hasStoreName = Math.random() > 0.4; // 60% chance of detecting store name
        const isAuthentic = Math.random() > 0.2; // 80% chance of being authentic
        const locationConsistent = Math.random() > 0.25; // 75% chance of location consistency
        
        const confidence = Math.floor(Math.random() * 30) + 70; // 70-99% confidence
        
        const result = {
          fileName: file.name,
          hasStorefront,
          hasStoreName,
          isAuthentic,
          locationConsistent,
          confidence,
          fraudScore: hasStorefront && hasStoreName && isAuthentic && locationConsistent ? 
            Math.floor(Math.random() * 20) + 5 : // Low fraud score (5-24)
            Math.floor(Math.random() * 40) + 60, // High fraud score (60-99)
          detectedElements: [
            ...(hasStorefront ? ['Shop/Store Structure'] : []),
            ...(hasStoreName ? ['Visible Store Name/Signage'] : []),
            ...(isAuthentic ? ['Original Image Metadata'] : ['Possible Image Manipulation']),
            ...(locationConsistent ? ['Location Metadata Consistent'] : ['Location Mismatch'])
          ]
        };
        
        resolve(result);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      
      // Analyze each image for fraud detection
      setAnalyzing(true);
      const results = [];
      
      for (const file of selectedFiles) {
        const result = await analyzeImage(file);
        results.push(result);
      }
      
      setFraudDetectionResults(results);
      setAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if any images have high fraud scores
    const highFraudImages = fraudDetectionResults.filter(result => result.fraudScore > 50);
    
    if (highFraudImages.length > 0) {
      toast({
        title: "Fraud Detection Alert",
        description: `${highFraudImages.length} image(s) flagged for manual review. Submission will be reviewed by our team.`,
        variant: "destructive"
      });
    }
    
    setUploading(true);

    // Simulate upload process
    setTimeout(() => {
      const avgFraudScore = fraudDetectionResults.reduce((sum, result) => sum + result.fraudScore, 0) / fraudDetectionResults.length;
      
      toast({
        title: avgFraudScore <= 50 ? "Photos Uploaded Successfully" : "Photos Submitted for Review",
        description: avgFraudScore <= 50 ? 
          `${files.length} photos uploaded and verified. Your trust score may increase.` :
          `${files.length} photos submitted. Some images flagged for manual review.`,
      });
      setUploading(false);
      onClose();
      setFiles([]);
      setDescription('');
      setFraudDetectionResults([]);
    }, 2000);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newResults = fraudDetectionResults.filter((_, i) => i !== index);
    setFiles(newFiles);
    setFraudDetectionResults(newResults);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Upload Progress Photos with AI Verification
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="photos">Select Photos</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                id="photos"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="photos" className="cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG up to 10MB each
                </p>
              </label>
            </div>
          </div>

          {analyzing && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Analyzing images with AI fraud detection...</p>
            </div>
          )}

          {fraudDetectionResults.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">AI Fraud Detection Results</h4>
              {fraudDetectionResults.map((result, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  result.fraudScore <= 30 ? 'bg-green-50 border-green-200' :
                  result.fraudScore <= 50 ? 'bg-yellow-50 border-yellow-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">{result.fileName}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                        <div className={`flex items-center gap-1 ${result.hasStorefront ? 'text-green-600' : 'text-red-600'}`}>
                          {result.hasStorefront ? <CheckCircle className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          Storefront Detected
                        </div>
                        <div className={`flex items-center gap-1 ${result.hasStoreName ? 'text-green-600' : 'text-red-600'}`}>
                          {result.hasStoreName ? <CheckCircle className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          Store Name Visible
                        </div>
                        <div className={`flex items-center gap-1 ${result.isAuthentic ? 'text-green-600' : 'text-red-600'}`}>
                          {result.isAuthentic ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                          Image Authentic
                        </div>
                        <div className={`flex items-center gap-1 ${result.locationConsistent ? 'text-green-600' : 'text-red-600'}`}>
                          {result.locationConsistent ? <CheckCircle className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          Location Verified
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded ${
                          result.fraudScore <= 30 ? 'bg-green-100 text-green-800' :
                          result.fraudScore <= 50 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          Fraud Risk: {result.fraudScore}% | Confidence: {result.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the improvements shown in these photos..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>AI Fraud Detection:</strong> Photos are automatically analyzed for authenticity, store presence, and location consistency.
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={files.length === 0 || uploading || analyzing}>
              {uploading ? 'Uploading...' : analyzing ? 'Analyzing...' : 'Upload Photos'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoUploadModal;
