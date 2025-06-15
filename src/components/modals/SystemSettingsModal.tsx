
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Tables } from '@/integrations/supabase/types';

interface SystemSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PlatformSetting = Tables<'platform_settings'>;
type MaintenanceModeValue = {
  enabled: boolean;
  message: string;
};

const fetchSettings = async (): Promise<PlatformSetting[]> => {
  const { data, error } = await supabase.from('platform_settings').select('*');
  if (error) {
    console.error("Error fetching settings:", error);
    throw new Error('Could not fetch platform settings. You must be an admin to view this.');
  }
  return data;
};

const updateSetting = async ({ key, value }: { key: string; value: any }) => {
  const { error } = await supabase
    .from('platform_settings')
    .update({ value, updated_at: new Date().toISOString() })
    .eq('key', key);
  
  if (error) {
    console.error("Error updating setting:", error);
    throw new Error(`Failed to update setting: ${key}`);
  }
};

const SystemSettingsModal = ({ isOpen, onClose }: SystemSettingsModalProps) => {
  const queryClient = useQueryClient();
  
  const { data: settings, isLoading, error } = useQuery<PlatformSetting[]>({
    queryKey: ['platformSettings'],
    queryFn: fetchSettings,
    enabled: isOpen, // Only fetch when the modal is open
  });

  const mutation = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Setting updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['platformSettings'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const maintenanceSetting = settings?.find(s => s.key === 'maintenance_mode');
  
  const [maintenanceValue, setMaintenanceValue] = useState<MaintenanceModeValue | null>(null);

  useEffect(() => {
    if (maintenanceSetting?.value) {
        // Since value is Json, we need to cast it.
        const value = maintenanceSetting.value as unknown as MaintenanceModeValue;
        setMaintenanceValue(value);
    }
  }, [maintenanceSetting]);

  const handleSaveChanges = () => {
    if (maintenanceValue) {
      mutation.mutate({ 
        key: 'maintenance_mode', 
        value: maintenanceValue 
      });
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      );
    }

    if (error) {
      return <p className="text-red-500">{error.message}</p>;
    }
    
    if (!maintenanceSetting || !maintenanceValue) {
        return <p>Maintenance mode setting not found or you don't have permission to view it.</p>
    }

    return (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-lg">Maintenance Mode</h4>
          <p className="text-sm text-gray-500">{maintenanceSetting.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="maintenance-enabled"
            checked={maintenanceValue.enabled}
            onCheckedChange={(checked) => setMaintenanceValue(prev => prev ? { ...prev, enabled: checked } : null)}
          />
          <Label htmlFor="maintenance-enabled">Enable Maintenance Mode</Label>
        </div>
        <div>
          <Label htmlFor="maintenance-message">Maintenance Message</Label>
          <Input
            id="maintenance-message"
            value={maintenanceValue.message}
            onChange={(e) => setMaintenanceValue(prev => prev ? { ...prev, message: e.target.value } : null)}
            placeholder="E.g., Down for scheduled maintenance."
          />
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>System Settings</DialogTitle>
          <DialogDescription>
            Manage platform-wide settings here. Changes will apply globally.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {renderContent()}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSaveChanges} disabled={mutation.isPending || isLoading}>
            {mutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SystemSettingsModal;
