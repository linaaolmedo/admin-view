# Caseload Management Module - Technical Documentation

## 1. Overview

The Caseload Management Module is a comprehensive system designed to manage student-practitioner assignments, group formations, and service scheduling within the EduClaim platform. This module serves as the central hub for practitioners to view, organize, and manage their assigned students while facilitating group therapy sessions and service coordination.

### 1.1 Module Purpose
The caseload management system enables:
- **Student Assignment Management**: Track and manage students assigned to specific practitioners
- **Group Formation**: Create and manage therapy groups for efficient service delivery
- **Service Integration**: Seamless integration with service scheduling and documentation
- **Workload Distribution**: Monitor and balance practitioner caseloads across districts
- **Administrative Oversight**: Provide supervisors and administrators visibility into caseload distribution

### 1.2 System Architecture
- **Frontend Framework**: Next.js 14 with App Router
- **UI Components**: Shadcn/UI component library with Tailwind CSS
- **State Management**: React hooks for local state management
- **Data Flow**: Client-side filtering with prepared API integration points
- **Navigation**: Tab-based interface with deep linking support

---

## 2. Functional Requirements

### 2.1 Caseload Display and Management

#### 2.1.1 Student Caseload View
- **Tabular Display**: Comprehensive table showing all assigned students with key demographics
- **Search Functionality**: Real-time search across student names, SSID, and practitioner assignments
- **Filtering System**: Advanced filtering by district, status, and practitioner
- **Multi-Selection**: Bulk selection of students for group operations
- **Status Tracking**: Visual indicators for active/inactive student status

#### 2.1.2 Student Information Display
- **Core Demographics**: SSID, first name, last name, birthdate, gender
- **Assignment Data**: Practitioner assignments and district associations
- **Status Management**: Active/inactive status tracking with visual badges
- **Action Menu**: Contextual actions for individual student management

#### 2.1.3 Caseload Navigation
- **Direct Student Access**: Clickable student names linking to detailed profiles
- **Service Scheduling**: Direct access to service scheduling from caseload view
- **Student Management**: Integration with student management system
- **Action Workflows**: Streamlined workflows for common caseload operations

### 2.2 Group Management System

#### 2.2.1 Group Creation and Organization
- **Group Formation**: Create named groups from selected students
- **Multi-Source Selection**: Add students from current caseload or available database
- **Group Visualization**: Collapsible group cards with student membership details
- **Bulk Operations**: Efficient group creation with multiple student selection

#### 2.2.2 Group Display and Management
- **Expandable Groups**: Collapsible group interface for organized viewing
- **Student Membership**: Clear display of group participants with student details
- **Group Actions**: Edit, modify, and dissolve groups as needed
- **Service Integration**: Direct group service scheduling capabilities

### 2.3 Student Addition and Management

#### 2.3.1 Caseload Addition Workflow
- **Database Integration**: Search and add students from EduClaim database
- **District Filtering**: Filter available students by district association
- **Duplicate Prevention**: Prevent duplicate student assignments
- **Confirmation Process**: Confirmation dialogs for student additions

#### 2.3.2 Caseload Maintenance
- **Student Removal**: Remove students from caseload with proper documentation
- **Status Updates**: Update student status within caseload context
- **Assignment Tracking**: Monitor and update practitioner assignments
- **Audit Trail**: Track all caseload modifications with timestamps

### 2.4 Service Integration

#### 2.4.1 Service Scheduling Integration
- **Direct Scheduling**: Schedule services directly from caseload interface
- **Student Selection**: Pre-populate service forms with selected students
- **Group Scheduling**: Schedule group services with multiple participants
- **Calendar Integration**: Integration with practitioner calendar system

#### 2.4.2 Service Management
- **Service History**: Access to student service history from caseload
- **Upcoming Services**: Display upcoming scheduled services
- **Service Status**: Track service completion and documentation status
- **Billing Integration**: Connection to claims and billing systems

---

## 3. Business Rules

### 3.1 Student Assignment Rules

#### 3.1.1 Practitioner Assignment Rules
- **Single Primary Assignment**: Each student has one primary practitioner assignment
- **District Association**: Students can only be assigned to practitioners within their district
- **Qualification Matching**: Practitioner qualifications must match student service requirements
- **Workload Limits**: Maximum caseload sizes enforced per practitioner role
- **Supervisor Approval**: Supervisor approval required for caseload modifications

#### 3.1.2 Student Eligibility Rules
- **Active Status Requirement**: Only active students can be assigned to caseloads
- **IEP Requirements**: Students must have current IEP documentation
- **Service Authorization**: Valid service authorizations required for assignment
- **Consent Requirements**: Parental consent must be documented before assignment
- **Age Restrictions**: Age-appropriate practitioner assignments based on specialization

### 3.2 Group Formation Rules

#### 3.2.1 Group Composition Rules
- **Minimum Size**: Groups must contain at least 2 students
- **Maximum Size**: Group size limits based on service type and regulations
- **Age Grouping**: Students must be within appropriate age ranges for group services
- **Compatibility Assessment**: Students must be compatible for group therapy sessions
- **Service Alignment**: All group members must require similar service types

#### 3.2.2 Group Management Rules
- **Practitioner Assignment**: Groups must be assigned to qualified practitioners
- **Service Scheduling**: Group services must be scheduled for all participants
- **Documentation Requirements**: Individual documentation required for each group member
- **Attendance Tracking**: Individual attendance tracking within group sessions
- **Progress Monitoring**: Individual progress monitoring despite group delivery

### 3.3 Access Control Rules

#### 3.3.1 Role-Based Access
- **Practitioner Access**: Practitioners can only view and manage their assigned caseloads
- **Supervisor Access**: Supervisors can view and manage all practitioner caseloads in their district
- **Administrator Access**: Administrators have full access to all caseloads system-wide
- **Read-Only Access**: Some roles have view-only access to caseload information
- **Audit Access**: All caseload modifications are logged for audit purposes

#### 3.3.2 Data Privacy Rules
- **Student Privacy**: Student information access limited to assigned practitioners
- **HIPAA Compliance**: All caseload data handling must comply with HIPAA regulations
- **Consent Verification**: Access to student data requires verified consent
- **Data Retention**: Caseload data retained according to regulatory requirements
- **Secure Access**: All caseload access must be through secure, authenticated sessions

### 3.4 Service Coordination Rules

#### 3.4.1 Scheduling Rules
- **Practitioner Availability**: Services can only be scheduled during practitioner available hours
- **Student Availability**: Multiple services cannot be scheduled simultaneously for same student
- **Location Requirements**: Service locations must be appropriate for student and service type
- **Duration Standards**: Service duration must meet regulatory and IEP requirements
- **Cancellation Policies**: Service cancellations must follow established procedures

#### 3.4.2 Documentation Rules
- **Service Documentation**: All scheduled services must be documented upon completion
- **Progress Notes**: Progress notes required for all service sessions
- **Billing Documentation**: Service documentation must support billing requirements
- **Supervisor Review**: Supervisor review required for certain service types
- **Quality Assurance**: Regular quality assurance reviews of service documentation

---

## 4. Data Requirements

### 4.1 Caseload Student Data

#### 4.1.1 Core Student Information
```typescript
interface CaseloadStudent {
  id: number;
  ssid: string;              // State Student ID (unique identifier)
  firstName: string;         // Required
  lastName: string;          // Required
  birthdate: string;         // Format: MM/DD/YYYY
  gender: 'Male' | 'Female' | 'Other';
  status: 'Active' | 'Inactive';
  district: string;          // School district association
  practitioner: string;      // Assigned practitioner name
  practitionerId: number;    // Practitioner ID reference
  assignmentDate: string;    // Date of practitioner assignment
  lastModified: string;      // Last modification timestamp
}
```

#### 4.1.2 Extended Student Information
```typescript
interface ExtendedStudentInfo {
  studentId: number;
  school: string;            // Current school assignment
  grade: string;             // Current grade level
  primaryDisability: string; // Primary disability classification
  iepDate: string;           // Current IEP date
  nextReviewDate: string;    // Next IEP review date
  servicesRequired: string[]; // Required services array
  parentalConsent: boolean;  // Parental consent status
  transportationNeeds: string; // Transportation requirements
  emergencyContact: string;   // Emergency contact information
}
```

### 4.2 Group Management Data

#### 4.2.1 Group Structure
```typescript
interface CaseloadGroup {
  id: number;
  name: string;              // Group name (required)
  description?: string;      // Optional group description
  createdDate: string;       // Group creation date
  createdBy: number;         // Creator user ID
  practitionerId: number;    // Assigned practitioner
  status: 'Active' | 'Inactive' | 'Completed';
  serviceType: string;       // Primary service type for group
  meetingFrequency: string;  // Meeting frequency (e.g., "2x/week")
  duration: string;          // Session duration (e.g., "45 minutes")
  location: string;          // Meeting location
}
```

#### 4.2.2 Group Membership
```typescript
interface GroupMembership {
  id: number;
  groupId: number;           // Reference to group
  studentId: number;         // Reference to student
  ssid: string;              // Student SSID
  studentName: string;       // Student display name
  district: string;          // Student district
  joinDate: string;          // Date added to group
  status: 'Active' | 'Inactive'; // Membership status
  exitDate?: string;         // Date removed from group (if applicable)
  exitReason?: string;       // Reason for removal (if applicable)
}
```

### 4.3 Service Integration Data

#### 4.3.1 Service Scheduling
```typescript
interface CaseloadService {
  id: number;
  studentId: number;
  groupId?: number;          // Optional group ID for group services
  serviceDate: string;       // Scheduled service date
  serviceTime: string;       // Scheduled service time
  duration: string;          // Service duration
  serviceType: string;       // Type of service
  location: string;          // Service location
  practitionerId: number;    // Assigned practitioner
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No Show';
  notes?: string;            // Service notes
}
```

#### 4.3.2 Service History
```typescript
interface ServiceHistory {
  id: number;
  studentId: number;
  serviceId: number;
  completedDate: string;
  actualDuration: string;
  serviceNotes: string;
  progressNotes: string;
  outcomes: string;
  nextSteps: string;
  practitionerId: number;
  supervisorReview: boolean;
  billingStatus: 'Pending' | 'Approved' | 'Submitted' | 'Paid';
}
```

### 4.4 Search and Filter Data

#### 4.4.1 Search Criteria
```typescript
interface SearchCriteria {
  searchTerm: string;        // Free text search
  district?: string;         // District filter
  practitioner?: string;     // Practitioner filter
  status?: 'Active' | 'Inactive' | 'All';
  grade?: string;            // Grade level filter
  serviceType?: string;      // Service type filter
  lastServiceDate?: string;  // Last service date filter
}
```

#### 4.4.2 Filter Options
```typescript
interface FilterOptions {
  districts: string[];       // Available districts
  practitioners: string[];  // Available practitioners
  statuses: string[];       // Available statuses
  grades: string[];         // Available grades
  serviceTypes: string[];   // Available service types
  sortOptions: {
    field: string;
    direction: 'asc' | 'desc';
  };
}
```

---

## 5. Key Features

### 5.1 Comprehensive Caseload Interface

#### 5.1.1 Tabbed Navigation System
- **Dual-Tab Interface**: Separate tabs for individual caseload and group management
- **Deep Linking**: URL-based tab state management for bookmarking and sharing
- **State Persistence**: Tab state maintained across page refreshes
- **Keyboard Navigation**: Full keyboard accessibility for tab switching
- **Mobile Responsive**: Optimized tab layout for mobile devices

#### 5.1.2 Advanced Table Management
- **Sortable Columns**: Click-to-sort functionality for all major columns
- **Multi-Select Interface**: Checkbox-based selection for bulk operations
- **Select All Functionality**: Efficient selection of all visible students
- **Responsive Design**: Table adapts to different screen sizes
- **Action Menus**: Contextual dropdown menus for individual student actions

### 5.2 Intelligent Search and Filtering

#### 5.2.1 Real-Time Search
- **Multi-Field Search**: Search across student names, SSID, and practitioner assignments
- **Instant Results**: Real-time filtering as user types
- **Search Highlighting**: Visual highlighting of matching search terms
- **Search History**: Recently used search terms for quick access
- **Clear Search**: One-click search clearing with reset functionality

#### 5.2.2 Advanced Filtering System
- **District Filtering**: Filter students by school district association
- **Status Filtering**: Filter by active/inactive status
- **Practitioner Filtering**: Filter by assigned practitioner
- **Combined Filters**: Multiple filters can be applied simultaneously
- **Filter Persistence**: Filter state maintained during session

### 5.3 Dynamic Group Management

#### 5.3.1 Interactive Group Creation
- **Modal Dialog Interface**: Intuitive popup dialog for group creation
- **Group Name Validation**: Real-time validation of group names
- **Student Selection**: Multi-source student selection from caseload and database
- **Visual Selection**: Checkbox-based selection with visual feedback
- **Pre-Population**: Selected students automatically added to new groups

#### 5.3.2 Group Visualization and Management
- **Collapsible Group Cards**: Expandable group interfaces with student details
- **Group Status Indicators**: Visual indicators for group status and activity
- **Student Membership Display**: Clear display of group participants
- **Group Actions**: Edit, modify, and dissolve groups with confirmation
- **Service Integration**: Direct group service scheduling from group interface

### 5.4 Seamless Service Integration

#### 5.4.1 Service Scheduling Integration
- **Direct Scheduling**: Schedule services directly from caseload interface
- **Student Pre-Population**: Selected students automatically populate service forms
- **Group Service Scheduling**: Schedule group services with multiple participants
- **Calendar Integration**: Real-time integration with practitioner calendars
- **Service History**: Access to complete service history from caseload view

#### 5.4.2 Student Database Integration
- **Database Search**: Search and add students from comprehensive database
- **District Filtering**: Filter available students by district association
- **Duplicate Prevention**: Automatic detection and prevention of duplicate assignments
- **Confirmation Workflows**: Multi-step confirmation for student additions
- **Audit Logging**: Complete audit trail of all caseload modifications

### 5.5 User Experience Enhancements

#### 5.5.1 Responsive Design
- **Mobile-First Approach**: Optimized for mobile devices and tablets
- **Adaptive Layout**: Layout adjusts to screen size and orientation
- **Touch-Friendly Interface**: Large touch targets and gesture support
- **Consistent Navigation**: Uniform navigation patterns across all interfaces
- **Accessibility Compliance**: Full WCAG 2.1 AA compliance

#### 5.5.2 Performance Optimizations
- **Client-Side Filtering**: Fast filtering without server round-trips
- **Lazy Loading**: Efficient loading of large datasets
- **Caching Strategy**: Intelligent caching of frequently accessed data
- **Optimistic Updates**: Immediate UI updates with background synchronization
- **Error Handling**: Comprehensive error handling with user-friendly messages

### 5.6 Notification and Feedback System

#### 5.6.1 Success Notifications
- **Toast Notifications**: Non-intrusive success messages for completed actions
- **Action Confirmation**: Visual confirmation of successful operations
- **Dismissible Alerts**: User-controlled dismissal of notification messages
- **Progress Indicators**: Visual progress indicators for long-running operations
- **Status Updates**: Real-time status updates for ongoing operations

#### 5.6.2 Error Handling and Recovery
- **Graceful Error Handling**: User-friendly error messages with recovery options
- **Retry Mechanisms**: Automatic retry for transient failures
- **Offline Support**: Basic offline functionality with sync when reconnected
- **Data Validation**: Client-side validation with immediate feedback
- **Help Integration**: Contextual help and documentation links

---

## 6. Technical Implementation Notes

### 6.1 Frontend Architecture
- **Framework**: Next.js 14 with App Router for modern React development
- **TypeScript**: Full type safety with comprehensive interface definitions
- **UI Components**: Shadcn/UI component library for consistent design
- **Styling**: Tailwind CSS for responsive and maintainable styling
- **State Management**: React hooks for efficient local state management

### 6.2 Component Structure
- **Page Component**: Main caseload page with tabbed interface
- **Reusable Components**: Modular components for tables, dialogs, and forms
- **Custom Hooks**: Specialized hooks for search, filtering, and state management
- **Type Definitions**: Comprehensive TypeScript interfaces for all data structures
- **Error Boundaries**: Error boundaries for graceful error handling

### 6.3 Data Management
- **Mock Data**: Comprehensive mock data for development and testing
- **Client-Side Operations**: Efficient client-side filtering and sorting
- **API Integration Points**: Prepared endpoints for backend integration
- **Data Validation**: Client-side validation with server-side verification
- **Caching Strategy**: Intelligent caching for performance optimization

### 6.4 Security and Compliance
- **Authentication**: Secure authentication required for all operations
- **Authorization**: Role-based access control for all caseload operations
- **Data Privacy**: HIPAA-compliant data handling and storage
- **Audit Logging**: Comprehensive audit trail for all caseload modifications
- **Secure Communication**: HTTPS-only communication with backend services

---

## 7. Integration Points

### 7.1 Student Management System
- **Student Database**: Integration with comprehensive student database
- **Student Profiles**: Direct links to detailed student profiles
- **Demographic Data**: Real-time access to student demographic information
- **Status Updates**: Bi-directional status synchronization
- **Search Integration**: Unified search across student management system

### 7.2 Service Management System
- **Service Scheduling**: Direct integration with service scheduling interface
- **Service History**: Access to complete service history and documentation
- **Calendar Integration**: Real-time calendar synchronization
- **Progress Tracking**: Integration with progress monitoring systems
- **Billing Integration**: Connection to billing and claims systems

### 7.3 User Management System
- **Practitioner Profiles**: Integration with practitioner management system
- **Supervisor Oversight**: Supervisor access to team caseloads
- **Permission Management**: Role-based permission enforcement
- **Audit Integration**: User action logging and audit trail
- **Notification System**: User notification and alert system

### 7.4 Reporting and Analytics
- **Caseload Reports**: Generate comprehensive caseload reports
- **Performance Metrics**: Track caseload management performance
- **Compliance Reporting**: Generate compliance and audit reports
- **Data Export**: Export caseload data for external analysis
- **Dashboard Integration**: Integration with administrative dashboards 