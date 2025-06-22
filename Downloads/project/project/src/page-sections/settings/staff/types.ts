export interface StaffMember {
  id: string;
  fullName: string;
  email: string;
  contactNumber: string;
  role: string;
  department: string;
  startDate: string;
  status: 'active' | 'inactive';
  profilePhoto?: string;
  permissions: string[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isActive: boolean;
  dateCreated: Date;
}

export interface Permission {
  module: string;
  actions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  timeRestrictions?: {
    startTime?: string;
    endTime?: string;
    days?: string[];
  };
}

export interface Module {
  id: string;
  name: string;
  description: string;
  permissions: ('view' | 'create' | 'edit' | 'delete')[];
}