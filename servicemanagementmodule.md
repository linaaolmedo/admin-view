# Service Management Module - Technical Documentation

## 1. Overview

The Service Management Module is a comprehensive system designed to handle student service scheduling, delivery, and tracking within the EDUClaim platform. This module serves as the central hub for managing therapeutic and educational services provided to students with special needs, ensuring proper documentation, billing compliance, and service quality oversight.

The module supports multiple user types including practitioners, supervisors, and administrators, each with role-specific access to functionality. It provides a complete workflow from service scheduling through delivery, documentation, and supervisor approval.

### Primary Purpose
- Manage student service appointments and scheduling
- Track service delivery and completion status
- Provide documentation tools for case notes and service logs
- Enable supervisor oversight and approval workflows
- Support both individual and group service delivery models
- Maintain comprehensive service history and reporting

## 2. Functional Requirements

### 2.1 Service Scheduling
- **Schedule Individual Services**: Practitioners can schedule one-on-one appointments with students
- **Schedule Group Services**: Support for group therapy sessions with multiple students
- **Calendar Management**: Visual calendar interface for viewing and managing appointments
- **Time Slot Management**: Available time slot selection with conflict prevention
- **Service Type Selection**: Choose from various service types (Speech Therapy, Health Behavior Intervention, etc.)
- **Location Assignment**: Specify service delivery location (School, Home, Clinic, Community)
- **Duration Configuration**: Set appointment duration (15, 30, 45, 60, 90 minutes)

### 2.2 Service Delivery Management
- **Service Status Tracking**: Track services through lifecycle (Upcoming → In Progress → Completed/Cancelled)
- **Real-time Status Updates**: Automatic status calculation based on completion criteria
- **Service Modifications**: Ability to modify scheduled appointments
- **Cancellation Management**: Mark services as cancelled with proper documentation
- **End Time Recording**: Track actual service completion times

### 2.3 Documentation and Logging
- **Case Notes**: Comprehensive case note entry for each service session
- **Service Logs**: Detailed logging of service delivery activities
- **Appointment Notes**: Pre-service notes and preparation information
- **Historical Records**: Maintain complete service history for each student
- **Supervision Documentation**: Special logging for supervisor oversight

### 2.4 Service Viewing and Reporting
- **All Services View**: Comprehensive list of all services with filtering and sorting
- **Service Details**: Detailed view of individual service records
- **Search and Filter**: Advanced search capabilities across all service data
- **Status-based Filtering**: Filter services by completion status
- **Student-specific Views**: View all services for a specific student

### 2.5 Supervisor Oversight
- **Supervision Logs**: Specialized interface for supervisor review and approval
- **Approval Workflow**: Multi-step approval process for supervised services
- **Practitioner Caseload Review**: Overview of practitioner assignments and performance
- **Student Assignment Management**: View and manage student-practitioner assignments

## 3. Business Rules

### 3.1 Service Status Determination
- **Upcoming**: Services scheduled for future dates
- **Incomplete**: Services that have occurred but lack required documentation (case notes AND end time)
- **Complete**: Services with both case notes and actual end time recorded
- **Cancelled**: Services that were scheduled but did not occur

### 3.2 Service Completion Criteria
- A service is only considered "Complete" when BOTH conditions are met:
  - Case notes have been entered and saved
  - Actual end time has been recorded
- Missing either requirement results in "Incomplete" status

### 3.3 Role-Based Access Control
- **Practitioners**: Can schedule, modify, and document their own services
- **Supervisors**: Can view and approve services for their assigned practitioners
- **Administrators**: Full access to all service management functions

### 3.4 Service Scheduling Rules
- Services cannot be scheduled for past dates
- Time slots must not conflict with existing appointments
- Service duration must be specified before scheduling
- Student assignment is mandatory for all services

### 3.5 Documentation Requirements
- Case notes are required for all completed services
- Service type and location must be specified
- Actual service duration must be recorded
- Supervisor approval required for supervised practitioners

### 3.6 Group Service Management
- Group services require group name assignment
- Individual student status tracking within group sessions
- Separate documentation for each student in group services
- Group service completion requires all students to be documented

## 4. Data Requirements

### 4.1 Service Entity
```typescript
interface Service {
  id: number;
  studentId: string;
  practitionerId: string;
  serviceDate: string;
  serviceTime: string;
  endTime?: string;
  duration: string;
  serviceType: string;
  location: string;
  status: 'upcoming' | 'incomplete' | 'complete' | 'cancelled';
  caseNotes?: string;
  appointmentNotes?: string;
  isGroupService: boolean;
  groupName?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.2 Student Information
```typescript
interface Student {
  ssid: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  district: string;
  school: string;
  primaryDisability: string;
  statusIndicator: string;
}
```

### 4.3 Service Types
- Health behavior intervention
- Licensed Speech & Language Pathologist
- Occupational Therapy
- Physical Therapy
- Individual counseling
- Group therapy
- Assessment and evaluation
- Crisis intervention
- Family consultation

### 4.4 Service Locations
- 01 - Home
- 02 - Community  
- 03 - School
- 04 - Clinic
- 05 - Hospital
- 06 - Other

### 4.5 Group Service Data
```typescript
interface GroupService {
  groupName: string;
  students: {
    ssid: string;
    name: string;
    status: 'NOT STARTED' | 'COMPLETED';
  }[];
  serviceType: string;
  duration: string;
}
```

## 5. Key Features

### 5.1 Interactive Calendar Interface
- **Visual Calendar View**: Monthly calendar display with appointment indicators
- **Color-coded Status**: Different colors for service statuses (Green: Complete, Yellow: Incomplete, Red: Cancelled, Teal: Upcoming)
- **Click-to-View Details**: Direct access to service details from calendar
- **Navigation Controls**: Month-by-month navigation with appointment density indicators

### 5.2 Comprehensive Service Management
- **All Services Dashboard**: Sortable and filterable view of all services
- **Advanced Search**: Full-text search across all service fields
- **Status-based Sorting**: Priority-based sorting (Incomplete → Upcoming → Complete → Cancelled)
- **Service Details Modal**: Detailed view with full service information and editing capabilities

### 5.3 Flexible Scheduling System
- **Multi-tab Interface**: Separate tabs for individual and group scheduling
- **Visual Time Selection**: Interactive time slot selection with availability indication
- **Student Assignment**: Dropdown selection from assigned student caseload
- **Service Configuration**: Comprehensive service type and location selection

### 5.4 Documentation Tools
- **Rich Text Entry**: Comprehensive case note and appointment note fields
- **Auto-save Functionality**: Automatic saving of documentation in progress
- **Historical Context**: Access to past service history for reference
- **Validation Rules**: Required field validation for service completion

### 5.5 Supervisor Oversight Tools
- **Practitioner Caseload View**: Overview of all practitioners and their student assignments
- **Bulk Approval Interface**: Select multiple services for batch approval
- **Approval Workflow**: Multi-step approval process with comments and date tracking
- **Performance Monitoring**: Track service completion rates and documentation quality

### 5.6 Service Modification System
- **Appointment Editing**: Modify scheduled appointments with full field editing
- **Status Management**: Change service status with proper workflow validation
- **Cancellation Process**: Structured cancellation with reason tracking
- **Reschedule Functionality**: Move appointments to different dates/times

### 5.7 Mobile-Responsive Design
- **Adaptive Layout**: Responsive design for tablet and mobile access
- **Touch-friendly Interface**: Optimized for touchscreen interactions
- **Offline Capability**: Service documentation available in limited connectivity scenarios

### 5.8 Integration Capabilities
- **Student Management Integration**: Direct links to student records and management
- **Claims Management Integration**: Service data feeds into billing and claims processing
- **Reporting Integration**: Service data available for comprehensive reporting and analytics
- **User Management Integration**: Role-based access control tied to user management system

### 5.9 Quality Assurance Features
- **Completion Validation**: Automatic validation of service completion requirements
- **Missing Documentation Alerts**: Proactive identification of incomplete services
- **Supervisor Review Queue**: Organized queue for supervisor review and approval
- **Audit Trail**: Complete history of service modifications and approvals

This Service Management Module provides a comprehensive solution for educational service delivery, ensuring compliance with regulatory requirements while supporting efficient workflows for practitioners, supervisors, and administrators. 