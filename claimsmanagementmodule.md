# Claims Management Module - Technical Documentation

## 1. Overview

The Claims Management Module is a comprehensive healthcare billing system designed for educational service providers who need to submit insurance claims for student-related therapeutic services. The system manages the entire claim lifecycle from creation through payment, with specialized support for Medi-Cal and other insurance payers.

### Core Purpose
This module enables educational organizations to efficiently process, track, and manage insurance claims for special education services including speech therapy, occupational therapy, physical therapy, and psychological services provided to students.

### Key Components
- **Claims Dashboard**: Centralized view of all claims with tabbed navigation
- **Claim Detail Management**: Individual claim processing and tracking
- **Batch Processing**: Bulk claim submission and approval workflows
- **Status Tracking**: Real-time claim status monitoring with audit trails
- **Financial Reporting**: Claims aging and payment tracking capabilities

---

## 2. Functional Requirements

### 2.1 Claims Viewing and Navigation
- **Multi-Tab Interface**: Claims are organized into status-based tabs:
  - Not Paid (13 claims)
  - Paid (13 claims) 
  - Ready to Submit (13 claims)
  - Incomplete (13 claims)
  - Remittance Overview (7 claims)
- **Search Functionality**: Global search across claim numbers, student names, practitioners, and other key fields
- **Advanced Filtering**: Filter by claim status, date ranges, practitioners, and districts
- **Sortable Columns**: All table columns support ascending/descending sort

### 2.2 Claim Status Management
- **Status Transitions**: Claims progress through defined states:
  - INCOMPLETE → NEEDS APPROVAL → APPROVED → SUBMITTED → PAID/REJECTED
- **Batch Operations**: Select multiple claims for bulk approval and submission
- **Individual Claim Actions**: Edit, review, approve, or reject individual claims
- **Status History**: Complete audit trail of claim status changes with timestamps and user actions

### 2.3 Claim Submission Workflow
- **Approval Process**: Multi-step approval workflow with supervisor oversight
- **Submission Confirmation**: Dedicated confirmation page before final submission
- **Batch Submission**: Group approved claims into batches for efficient processing
- **Post-Submission Tracking**: Monitor submitted claims through payer processing

### 2.4 Data Display and Reporting
- **Comprehensive Tables**: Display key claim information including:
  - Claim numbers and batch numbers
  - Service dates and billed amounts
  - Practitioner and student information
  - District and SSID tracking
- **Responsive Design**: Mobile-friendly interface with horizontal scrolling for large datasets
- **Export Capabilities**: Claims data can be exported for external reporting

---

## 3. Business Rules

### 3.1 Claim Status Rules
- **Sequential Processing**: Claims must follow the defined status progression
- **Approval Authority**: Only authorized supervisors can approve claims for submission
- **Rejection Handling**: Rejected claims require manual review and correction before resubmission
- **Batch Integrity**: All claims in a batch must be approved before submission

### 3.2 Data Validation Rules
- **Required Fields**: All claims must have complete service information:
  - Service date and location
  - Practitioner NPI and rendering provider information
  - Student SSID and insurance information
  - Billing codes and quantities
- **Insurance Verification**: Medi-Cal eligibility and benefits must be verified
- **Consent Requirements**: Both parental consent to treat and consent to bill must be documented

### 3.3 Billing Rules
- **Service Code Compliance**: All services must use approved billing codes (e.g., H2027 for behavioral intervention)
- **Quantity Validation**: Service quantities must match actual services provided
- **Frequency Limits**: Services must comply with insurance frequency limitations
- **Documentation Requirements**: All claims must have supporting service documentation

### 3.4 Workflow Rules
- **Practitioner Assignment**: Claims can only be submitted by authorized practitioners
- **District Validation**: Claims must be associated with valid school districts
- **Batch Processing**: Claims are processed in batches with unique batch numbers
- **Resubmission Logic**: Rejected claims require status reset before reprocessing

---

## 4. Data Requirements

### 4.1 Claim Core Data
```typescript
interface ClaimData {
  claimNumber: string;          // Unique claim identifier
  batchNumber: string;          // Batch grouping identifier
  status: ClaimStatus;          // Current claim status
  serviceDate: string;          // Date service was provided
  billedAmount: string;         // Amount billed to insurance
  paidAmount?: string;          // Amount paid by insurance (if applicable)
  finalizedDate?: string;       // Date claim was finalized
}
```

### 4.2 Service Information
```typescript
interface ServiceInfo {
  serviceCode: string;          // Billing code (e.g., H2027)
  serviceDescription: string;   // Service description
  quantity: string;             // Number of units provided
  quantityType: string;         // Unit type (e.g., "UN - Unit")
  location: string;             // Service location (e.g., "03 - School")
  frequencyType: string;        // Service frequency
}
```

### 4.3 Provider Information
```typescript
interface ProviderInfo {
  renderingProvider: string;    // Provider name
  renderingProviderNPI: string; // Provider NPI number
  referringProvider: string;    // Referring provider name
  referringProviderNPI: string; // Referring provider NPI
  district: string;             // School district
}
```

### 4.4 Student Information
```typescript
interface StudentInfo {
  ssid: string;                 // Student State ID
  studentName: string;          // Student full name
  dob: string;                  // Date of birth
  insuranceType: string;        // Insurance type (e.g., "Primary")
  insuranceCarrier: string;     // Insurance carrier (e.g., "Medi-cal")
  medicaidEligible: boolean;    // Medicaid eligibility status
  carelonId: string;            // Carelon ID for processing
  parentalConsentToTreat: boolean;
  parentalConsentToBill: boolean;
}
```

### 4.5 Audit Trail Data
```typescript
interface ClaimActivity {
  date: string;                 // Activity date
  status: string;               // Status at time of activity
  action: string;               // Action taken
  comment: string;              // Additional comments
  userId?: string;              // User who performed action
}
```

---

## 5. Key Features

### 5.1 Dashboard Interface
- **Tabbed Navigation**: Intuitive tab-based organization of claims by status
- **Real-time Counts**: Dynamic claim counts displayed in tab headers
- **Search and Filter**: Advanced search capabilities with multi-criteria filtering
- **Responsive Tables**: Mobile-optimized data tables with horizontal scrolling

### 5.2 Claim Processing Features
- **Bulk Operations**: 
  - Select multiple claims using checkboxes
  - Bulk approval workflow for efficient processing
  - Batch submission to insurance payers
- **Status Tracking**:
  - Visual status badges with color coding
  - Comprehensive status history and audit trails
  - Automated status transitions based on business rules

### 5.3 Data Management
- **Sorting and Filtering**:
  - Multi-column sorting with visual indicators
  - Advanced filtering by status, date, practitioner, district
  - Persistent filter states across sessions
- **Search Capabilities**:
  - Global search across all claim fields
  - Quick filtering by claim number, student name, practitioner
  - Real-time search results with highlighting

### 5.4 Workflow Management
- **Approval Workflow**:
  - Multi-step approval process with supervisor oversight
  - Submission confirmation with detailed claim review
  - Rejection handling with reason codes and comments
- **Batch Processing**:
  - Automated batch number generation
  - Batch-level tracking and reporting
  - Efficient submission to multiple payers

### 5.5 Integration Features
- **Cross-Module Navigation**:
  - Links to practitioner management (`/manage-users/[id]`)
  - Links to student management (`/manage-students/[id]`)
  - Integration with service logging and scheduling
- **Data Persistence**:
  - Local storage for temporary workflow data
  - Session state management for multi-step processes
  - Automatic data recovery for interrupted workflows

### 5.6 Reporting and Analytics
- **Claims Aging**: Track claim processing times and identify bottlenecks
- **Financial Impact**: Monitor claim values, approval rates, and payment status
- **Performance Metrics**: Track practitioner performance and processing efficiency
- **Volume Analysis**: Analyze claim volumes by service type and time period

### 5.7 User Experience Features
- **Loading States**: Proper loading indicators for asynchronous operations
- **Error Handling**: Comprehensive error messages and recovery options
- **Success Feedback**: Clear confirmation messages for completed actions
- **Accessibility**: Screen reader support and keyboard navigation
- **Mobile Optimization**: Responsive design for tablet and mobile devices

---

## Technical Implementation Notes

### Architecture
- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **State Management**: React hooks with localStorage for persistence
- **UI Components**: Shadcn/ui component library for consistent design
- **Navigation**: Next.js App Router with dynamic routing for claim details

### Performance Considerations
- **Data Pagination**: Large datasets are paginated for optimal performance
- **Lazy Loading**: Claim details loaded on-demand to reduce initial load time
- **Caching**: Strategic use of localStorage for frequently accessed data
- **Optimistic Updates**: UI updates immediately with server reconciliation

### Security Features
- **Role-Based Access**: Different permission levels for practitioners vs. supervisors
- **Data Validation**: Client and server-side validation for all inputs
- **Audit Logging**: Complete audit trail of all claim modifications
- **Secure Navigation**: Protected routes with authentication guards 