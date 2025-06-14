
import { supabase } from '@/integrations/supabase/client';
import { TablesInsert } from '@/integrations/supabase/types';

export const seedCorporateData = async (userId: string) => {
  const campaigns: TablesInsert<'campaigns'>[] = [
    {
      name: 'Clean Water Initiative - India',
      corporate_id: userId,
      funding_goal: 500000,
      amount_raised: 350000,
      status: 'active',
      description: 'Providing clean and safe drinking water to rural communities in South Asia.',
      sector: 'Health',
      projected_sroi: 4.5,
      lives_impacted: 15000,
      communities_reached: 25,
      region: 'South Asia',
      impact_score: 88,
      target_audience: 'Rural villages',
    },
    {
      name: 'Education for All - Kenya',
      corporate_id: userId,
      funding_goal: 750000,
      amount_raised: 750000,
      status: 'completed',
      description: 'Building schools and providing educational materials for children in underserved areas of Kenya.',
      sector: 'Education',
      projected_sroi: 5.2,
      lives_impacted: 5000,
      communities_reached: 10,
      region: 'Sub-Saharan Africa',
      impact_score: 92,
      target_audience: 'Primary school children',
    },
    {
      name: 'Reforestation Project - Brazil',
      corporate_id: userId,
      funding_goal: 200000,
      amount_raised: 120000,
      status: 'active',
      description: 'Planting native trees to restore ecosystems in the Amazon rainforest.',
      sector: 'Environment',
      projected_sroi: 3.8,
      lives_impacted: 500,
      communities_reached: 5,
      region: 'Latin America',
      impact_score: 85,
      target_audience: 'Local communities',
    },
  ];

  const { error: campaignError } = await supabase.from('campaigns').insert(campaigns);
  if (campaignError) throw campaignError;

  const complianceItems: TablesInsert<'compliance_items'>[] = [
    {
      user_id: userId,
      title: 'Annual CSR Report Submission 2024',
      status: 'Met',
      details: 'Submitted on Jan 15, 2025.',
    },
    {
      user_id: userId,
      title: 'CSR Committee Establishment',
      status: 'Met',
      details: 'Committee formed and minutes from first meeting filed.',
    },
    {
      user_id: userId,
      title: 'Disclosure of CSR Policy',
      status: 'Pending',
      details: 'Policy to be published on the corporate website by end of Q2 2025.',
    },
  ];

  const { error: complianceError } = await supabase.from('compliance_items').insert(complianceItems);
  if (complianceError) throw complianceError;
};
