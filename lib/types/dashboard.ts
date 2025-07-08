export interface ClaimsProcessingData {
  month: string;
  totalClaims: number;
  pendingClaims: number;
  approvedClaims: number;
  rejectedClaims: number;
  readyToSubmitClaims: number;
  paidClaims: number;
  avgProcessingTime: number;
  completionRate: number;
  processingVelocity: number;
}

export interface ClaimsVolumeData {
  month: string;
  totalClaims: number;
  speechTherapy: number;
  occupationalTherapy: number;
  physicalTherapy: number;
  psychology: number;
  other: number;
  growthRate: number;
}

export interface PractitionerPerformanceData {
  practitionerId: string;
  name: string;
  claimsCompleted: number;
  approvalRate: number;
  avgProcessingSpeed: number;
  qualityScore: number;
  totalValue: number;
  servicesProvided: number;
}

export interface FinancialImpactData {
  month: string;
  totalClaimValue: number;
  approvedValue: number;
  rejectedValue: number;
  pendingValue: number;
  paidValue: number;
  revenueRealized: number;
  averageClaimValue: number;
}

export interface ClaimsAgingData {
  status: string;
  days0to7: number;
  days8to14: number;
  days15to30: number;
  days31plus: number;
  overdue: number;
  total: number;
}

export interface TimeRange {
  label: string;
  value: string;
  months: number;
}

export interface ChartFilters {
  timeRange: string;
  practitioner?: string;
  claimType?: string;
  status?: string;
  organization?: string;
} 