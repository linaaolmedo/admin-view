import { 
  ClaimsProcessingData, 
  ClaimsVolumeData, 
  PractitionerPerformanceData, 
  FinancialImpactData, 
  ClaimsAgingData 
} from '../types/dashboard';

const months = [
  'Jan 2023', 'Feb 2023', 'Mar 2023', 'Apr 2023', 'May 2023', 'Jun 2023',
  'Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023',
  'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024',
  'Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024'
];

export const generateClaimsProcessingData = (): ClaimsProcessingData[] => {
  return months.map((month, index) => {
    const totalClaims = 80 + Math.floor(Math.random() * 60) + (index % 12 < 6 ? 0 : 20); // Seasonal variation
    const pendingClaims = Math.floor(totalClaims * (0.15 + Math.random() * 0.2));
    const rejectedClaims = Math.floor(totalClaims * (0.05 + Math.random() * 0.1));
    const readyToSubmitClaims = Math.floor(totalClaims * (0.2 + Math.random() * 0.15));
    const paidClaims = Math.floor(totalClaims * (0.4 + Math.random() * 0.2));
    const approvedClaims = totalClaims - pendingClaims - rejectedClaims;
    
    return {
      month,
      totalClaims,
      pendingClaims,
      approvedClaims,
      rejectedClaims,
      readyToSubmitClaims,
      paidClaims,
      avgProcessingTime: 8 + Math.random() * 12, // 8-20 days
      completionRate: 85 + Math.random() * 10, // 85-95%
      processingVelocity: 15 + Math.random() * 10 // claims per day
    };
  });
};

export const generateClaimsVolumeData = (): ClaimsVolumeData[] => {
  return months.map((month, index) => {
    const speechTherapy = 25 + Math.floor(Math.random() * 20);
    const occupationalTherapy = 20 + Math.floor(Math.random() * 15);
    const physicalTherapy = 15 + Math.floor(Math.random() * 12);
    const psychology = 18 + Math.floor(Math.random() * 10);
    const other = 8 + Math.floor(Math.random() * 8);
    const totalClaims = speechTherapy + occupationalTherapy + physicalTherapy + psychology + other;
    
    return {
      month,
      totalClaims,
      speechTherapy,
      occupationalTherapy,
      physicalTherapy,
      psychology,
      other,
      growthRate: index === 0 ? 0 : (-5 + Math.random() * 15) // -5% to +10% growth
    };
  });
};

export const generatePractitionerPerformanceData = (): PractitionerPerformanceData[] => {
  const practitioners = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Michael Davis' },
    { id: '3', name: 'Emma Wilson' },
    { id: '4', name: 'Carlos Martinez' },
    { id: '5', name: 'Lisa Chen' },
    { id: '6', name: 'David Rodriguez' },
    { id: '7', name: 'Jennifer Taylor' },
    { id: '8', name: 'Robert Anderson' },
    { id: '9', name: 'Michelle Thompson' },
    { id: '10', name: 'James Wilson' }
  ];

  return practitioners.map((practitioner) => ({
    practitionerId: practitioner.id,
    name: practitioner.name,
    claimsCompleted: 45 + Math.floor(Math.random() * 85), // 45-130 claims
    approvalRate: 88 + Math.random() * 10, // 88-98%
    avgProcessingSpeed: 6 + Math.random() * 8, // 6-14 days
    qualityScore: 82 + Math.random() * 16, // 82-98%
    totalValue: 25000 + Math.random() * 75000, // $25k-$100k
    servicesProvided: 120 + Math.floor(Math.random() * 280) // 120-400 services
  }));
};

export const generateFinancialImpactData = (): FinancialImpactData[] => {
  return months.map((month) => {
    const totalClaimValue = 180000 + Math.random() * 120000; // $180k-$300k
    const approvedValue = totalClaimValue * (0.7 + Math.random() * 0.2); // 70-90% approved
    const rejectedValue = totalClaimValue * (0.05 + Math.random() * 0.1); // 5-15% rejected
    const pendingValue = totalClaimValue - approvedValue - rejectedValue;
    const paidValue = approvedValue * (0.6 + Math.random() * 0.3); // 60-90% of approved paid
    const revenueRealized = paidValue * (0.85 + Math.random() * 0.1); // 85-95% revenue realized
    
    return {
      month,
      totalClaimValue,
      approvedValue,
      rejectedValue,
      pendingValue,
      paidValue,
      revenueRealized,
      averageClaimValue: totalClaimValue / (80 + Math.random() * 60)
    };
  });
};

export const generateClaimsAgingData = (): ClaimsAgingData[] => {
  const statuses = ['Pending', 'Ready to Submit', 'Under Review', 'Approved', 'Rejected'];
  
  return statuses.map((status) => {
    const days0to7 = Math.floor(Math.random() * 30) + 10;
    const days8to14 = Math.floor(Math.random() * 25) + 5;
    const days15to30 = Math.floor(Math.random() * 20) + 3;
    const days31plus = Math.floor(Math.random() * 15) + 1;
    const overdue = Math.floor(Math.random() * 8);
    const total = days0to7 + days8to14 + days15to30 + days31plus + overdue;
    
    return {
      status,
      days0to7,
      days8to14,
      days15to30,
      days31plus,
      overdue,
      total
    };
  });
};

export const timeRanges = [
  { label: 'Last 30 Days', value: '30d', months: 1 },
  { label: 'Last 3 Months', value: '3m', months: 3 },
  { label: 'Last 6 Months', value: '6m', months: 6 },
  { label: 'Last Year', value: '1y', months: 12 },
  { label: 'All Time', value: 'all', months: 24 }
];

export const claimTypes = [
  'Speech Therapy',
  'Occupational Therapy',
  'Physical Therapy',
  'Psychology',
  'Other'
];

export const claimStatuses = [
  'Pending',
  'Ready to Submit',
  'Under Review',
  'Approved',
  'Rejected',
  'Paid'
]; 