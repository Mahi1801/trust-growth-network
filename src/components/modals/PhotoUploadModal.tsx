
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Upload, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PhotoUploadModal = ({ isOpen, onClose }: PhotoUploadModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    // Simulate upload process
    setTimeout(() => {
      toast({
        title: "Photos Uploaded Successfully",
        description: `${files.length} photos uploaded and verified. Your trust score may increase.`,
      });
      setUploading(false);
      onClose();
      setFiles([]);
      setDescription('');
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Upload Progress Photos
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
            {files.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  {files.length} files selected
                </p>
              </div>
            )}
          </div>

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
              <strong>AI Fraud Detection:</strong> Your photos will be automatically verified for authenticity and location consistency.
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={files.length === 0 || uploading}>
              {uploading ? 'Uploading...' : 'Upload Photos'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoUploadModal;
