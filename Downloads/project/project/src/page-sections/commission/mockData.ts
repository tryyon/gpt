// Mock data for commissions
export const mockCommissions = [
  {
    id: 'COM001',
    userId: 'USR001',
    userName: 'Emma Johnson',
    email: 'emma@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    userType: 'Influencer',
    amount: 12500,
    status: 'pending',
    createdDate: '2024-03-15T10:30:00',
    lastUpdated: '2024-03-15T10:30:00',
    lastPaymentDate: null,
    totalEarnings: 45000,
    commissionRate: 10,
    joinDate: '2023-06-15T00:00:00',
    description: 'Commission for March 2024 campaigns',
    paymentDetails: {
      accountName: 'Emma Johnson',
      accountNumber: '1234567890',
      bankName: 'HDFC Bank',
      ifscCode: 'HDFC0001234',
      upiId: 'emma@upi'
    },
    taxDetails: {
      status: 'Individual',
      tdsApplicable: true,
      tdsPercentage: 10,
      panNumber: 'ABCDE1234F',
      gstNumber: null
    },
    relatedOrders: [
      {
        id: 'ORD1001',
        date: '2024-03-10T14:30:00',
        customer: 'John Smith',
        amount: 75000,
        commission: 7500,
        status: 'completed'
      },
      {
        id: 'ORD1002',
        date: '2024-03-12T11:45:00',
        customer: 'Sarah Williams',
        amount: 50000,
        commission: 5000,
        status: 'completed'
      }
    ],
    auditLog: [
      {
        timestamp: '2024-03-15T10:30:00',
        action: 'created',
        user: 'System',
        details: 'Commission automatically generated',
        ipAddress: '192.168.1.1'
      }
    ],
    history: [
      {
        id: 'HIST001',
        date: '2024-03-15T10:30:00',
        action: 'Created',
        amount: 12500,
        status: 'pending',
        by: 'System',
        notes: 'Automatically generated based on sales'
      }
    ]
  },
  {
    id: 'COM002',
    userId: 'USR002',
    userName: 'Alex Rivera',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    userType: 'Influencer',
    amount: 18750,
    status: 'approved',
    createdDate: '2024-03-14T15:45:00',
    lastUpdated: '2024-03-15T09:20:00',
    lastPaymentDate: null,
    totalEarnings: 67500,
    commissionRate: 15,
    joinDate: '2023-04-10T00:00:00',
    description: 'Commission for tech product promotions',
    paymentDetails: {
      accountName: 'Alex Rivera',
      accountNumber: '0987654321',
      bankName: 'ICICI Bank',
      ifscCode: 'ICIC0001234',
      upiId: 'alex@upi'
    },
    taxDetails: {
      status: 'Individual',
      tdsApplicable: true,
      tdsPercentage: 10,
      panNumber: 'FGHIJ5678K',
      gstNumber: null
    },
    relatedOrders: [
      {
        id: 'ORD1003',
        date: '2024-03-08T16:20:00',
        customer: 'Michael Brown',
        amount: 125000,
        commission: 18750,
        status: 'completed'
      }
    ],
    auditLog: [
      {
        timestamp: '2024-03-14T15:45:00',
        action: 'created',
        user: 'System',
        details: 'Commission automatically generated',
        ipAddress: '192.168.1.1'
      },
      {
        timestamp: '2024-03-15T09:20:00',
        action: 'approved',
        user: 'Admin User',
        details: 'Commission approved after verification',
        ipAddress: '192.168.1.2'
      }
    ],
    history: [
      {
        id: 'HIST002',
        date: '2024-03-14T15:45:00',
        action: 'Created',
        amount: 18750,
        status: 'pending',
        by: 'System',
        notes: 'Automatically generated based on sales'
      },
      {
        id: 'HIST003',
        date: '2024-03-15T09:20:00',
        action: 'Approved',
        amount: 18750,
        status: 'approved',
        by: 'Admin User',
        notes: 'Verified and approved for payment'
      }
    ]
  },
  {
    id: 'COM003',
    userId: 'USR003',
    userName: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    userType: 'Influencer',
    amount: 9500,
    status: 'paid',
    createdDate: '2024-03-10T09:15:00',
    lastUpdated: '2024-03-12T14:30:00',
    lastPaymentDate: '2024-03-12T14:30:00',
    totalEarnings: 42500,
    commissionRate: 10,
    joinDate: '2023-07-22T00:00:00',
    description: 'Commission for fitness product promotions',
    paymentDetails: {
      accountName: 'Sarah Chen',
      accountNumber: '5678901234',
      bankName: 'Axis Bank',
      ifscCode: 'AXIS0001234',
      upiId: 'sarah@upi'
    },
    taxDetails: {
      status: 'Individual',
      tdsApplicable: true,
      tdsPercentage: 10,
      panNumber: 'KLMNO9012P',
      gstNumber: null
    },
    relatedOrders: [
      {
        id: 'ORD1004',
        date: '2024-03-05T10:15:00',
        customer: 'Jennifer Lee',
        amount: 45000,
        commission: 4500,
        status: 'completed'
      },
      {
        id: 'ORD1005',
        date: '2024-03-07T13:40:00',
        customer: 'David Wilson',
        amount: 50000,
        commission: 5000,
        status: 'completed'
      }
    ],
    auditLog: [
      {
        timestamp: '2024-03-10T09:15:00',
        action: 'created',
        user: 'System',
        details: 'Commission automatically generated',
        ipAddress: '192.168.1.1'
      },
      {
        timestamp: '2024-03-11T11:30:00',
        action: 'approved',
        user: 'Admin User',
        details: 'Commission approved after verification',
        ipAddress: '192.168.1.2'
      },
      {
        timestamp: '2024-03-12T14:30:00',
        action: 'paid',
        user: 'Finance Team',
        details: 'Payment processed via bank transfer',
        ipAddress: '192.168.1.3'
      }
    ],
    history: [
      {
        id: 'HIST004',
        date: '2024-03-10T09:15:00',
        action: 'Created',
        amount: 9500,
        status: 'pending',
        by: 'System',
        notes: 'Automatically generated based on sales'
      },
      {
        id: 'HIST005',
        date: '2024-03-11T11:30:00',
        action: 'Approved',
        amount: 9500,
        status: 'approved',
        by: 'Admin User',
        notes: 'Verified and approved for payment'
      },
      {
        id: 'HIST006',
        date: '2024-03-12T14:30:00',
        action: 'Paid',
        amount: 9500,
        status: 'paid',
        by: 'Finance Team',
        notes: 'Payment processed via bank transfer'
      }
    ],
    paymentHistory: [
      {
        date: '2024-03-12T14:30:00',
        amount: 9500,
        method: 'Bank Transfer',
        reference: 'TRF123456789',
        status: 'completed'
      }
    ]
  },
  {
    id: 'COM004',
    userId: 'USR004',
    userName: 'Raj Patel',
    email: 'raj@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    userType: 'Reseller',
    amount: 25000,
    status: 'pending',
    createdDate: '2024-03-13T16:20:00',
    lastUpdated: '2024-03-13T16:20:00',
    lastPaymentDate: '2024-02-15T11:45:00',
    totalEarnings: 175000,
    commissionRate: 20,
    joinDate: '2023-01-05T00:00:00',
    description: 'Commission for March 2024 sales',
    paymentDetails: {
      accountName: 'Raj Patel',
      accountNumber: '1357924680',
      bankName: 'SBI',
      ifscCode: 'SBIN0001234',
      upiId: 'raj@upi'
    },
    taxDetails: {
      status: 'Business',
      tdsApplicable: true,
      tdsPercentage: 5,
      panNumber: 'QRSTU3456V',
      gstNumber: '27AADCB2230M1Z3'
    },
    relatedOrders: [
      {
        id: 'ORD1006',
        date: '2024-03-01T09:30:00',
        customer: 'Priya Sharma',
        amount: 35000,
        commission: 7000,
        status: 'completed'
      },
      {
        id: 'ORD1007',
        date: '2024-03-05T14:15:00',
        customer: 'Vikram Singh',
        amount: 40000,
        commission: 8000,
        status: 'completed'
      },
      {
        id: 'ORD1008',
        date: '2024-03-10T11:20:00',
        customer: 'Ananya Gupta',
        amount: 50000,
        commission: 10000,
        status: 'completed'
      }
    ],
    auditLog: [
      {
        timestamp: '2024-03-13T16:20:00',
        action: 'created',
        user: 'System',
        details: 'Commission automatically generated',
        ipAddress: '192.168.1.1'
      }
    ],
    history: [
      {
        id: 'HIST007',
        date: '2024-03-13T16:20:00',
        action: 'Created',
        amount: 25000,
        status: 'pending',
        by: 'System',
        notes: 'Automatically generated based on sales'
      }
    ],
    paymentHistory: [
      {
        date: '2024-02-15T11:45:00',
        amount: 22000,
        method: 'Bank Transfer',
        reference: 'TRF987654321',
        status: 'completed'
      },
      {
        date: '2024-01-14T10:30:00',
        amount: 18000,
        method: 'Bank Transfer',
        reference: 'TRF876543210',
        status: 'completed'
      }
    ]
  },
  {
    id: 'COM005',
    userId: 'USR005',
    userName: 'Maria Garcia',
    email: 'maria@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    userType: 'Reseller',
    amount: 15000,
    status: 'rejected',
    createdDate: '2024-03-12T13:10:00',
    lastUpdated: '2024-03-13T10:45:00',
    lastPaymentDate: '2024-02-10T09:30:00',
    totalEarnings: 85000,
    commissionRate: 15,
    joinDate: '2023-03-18T00:00:00',
    description: 'Commission for product sales',
    paymentDetails: {
      accountName: 'Maria Garcia',
      accountNumber: '2468013579',
      bankName: 'HDFC Bank',
      ifscCode: 'HDFC0002345',
      upiId: 'maria@upi'
    },
    taxDetails: {
      status: 'Individual',
      tdsApplicable: true,
      tdsPercentage: 10,
      panNumber: 'VWXYZ7890A',
      gstNumber: null
    },
    relatedOrders: [
      {
        id: 'ORD1009',
        date: '2024-03-02T15:40:00',
        customer: 'Carlos Rodriguez',
        amount: 100000,
        commission: 15000,
        status: 'completed'
      }
    ],
    auditLog: [
      {
        timestamp: '2024-03-12T13:10:00',
        action: 'created',
        user: 'System',
        details: 'Commission automatically generated',
        ipAddress: '192.168.1.1'
      },
      {
        timestamp: '2024-03-13T10:45:00',
        action: 'rejected',
        user: 'Admin User',
        details: 'Commission rejected due to policy violation',
        ipAddress: '192.168.1.2'
      }
    ],
    history: [
      {
        id: 'HIST008',
        date: '2024-03-12T13:10:00',
        action: 'Created',
        amount: 15000,
        status: 'pending',
        by: 'System',
        notes: 'Automatically generated based on sales'
      },
      {
        id: 'HIST009',
        date: '2024-03-13T10:45:00',
        action: 'Rejected',
        amount: 15000,
        status: 'rejected',
        by: 'Admin User',
        notes: 'Order verification failed - potential policy violation'
      }
    ],
    paymentHistory: [
      {
        date: '2024-02-10T09:30:00',
        amount: 12000,
        method: 'Bank Transfer',
        reference: 'TRF765432109',
        status: 'completed'
      }
    ]
  },
  {
    id: 'COM006',
    userId: 'USR006',
    userName: 'James Wilson',
    email: 'james@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    userType: 'Reseller',
    amount: 32000,
    status: 'approved',
    createdDate: '2024-03-11T08:45:00',
    lastUpdated: '2024-03-12T11:30:00',
    lastPaymentDate: '2024-02-12T14:20:00',
    totalEarnings: 210000,
    commissionRate: 20,
    joinDate: '2022-11-20T00:00:00',
    description: 'Commission for electronics sales',
    paymentDetails: {
      accountName: 'James Wilson',
      accountNumber: '3692581470',
      bankName: 'Axis Bank',
      ifscCode: 'UTIB0003456',
      upiId: 'james@upi'
    },
    taxDetails: {
      status: 'Business',
      tdsApplicable: true,
      tdsPercentage: 5,
      panNumber: 'BCDEF2345G',
      gstNumber: '29AADCB2230M1Z3'
    },
    relatedOrders: [
      {
        id: 'ORD1010',
        date: '2024-03-01T10:15:00',
        customer: 'Robert Taylor',
        amount: 80000,
        commission: 16000,
        status: 'completed'
      },
      {
        id: 'ORD1011',
        date: '2024-03-05T16:30:00',
        customer: 'Elizabeth Clark',
        amount: 80000,
        commission: 16000,
        status: 'completed'
      }
    ],
    auditLog: [
      {
        timestamp: '2024-03-11T08:45:00',
        action: 'created',
        user: 'System',
        details: 'Commission automatically generated',
        ipAddress: '192.168.1.1'
      },
      {
        timestamp: '2024-03-12T11:30:00',
        action: 'approved',
        user: 'Admin User',
        details: 'Commission approved after verification',
        ipAddress: '192.168.1.2'
      }
    ],
    history: [
      {
        id: 'HIST010',
        date: '2024-03-11T08:45:00',
        action: 'Created',
        amount: 32000,
        status: 'pending',
        by: 'System',
        notes: 'Automatically generated based on sales'
      },
      {
        id: 'HIST011',
        date: '2024-03-12T11:30:00',
        action: 'Approved',
        amount: 32000,
        status: 'approved',
        by: 'Admin User',
        notes: 'Verified and approved for payment'
      }
    ],
    paymentHistory: [
      {
        date: '2024-02-12T14:20:00',
        amount: 28000,
        method: 'Bank Transfer',
        reference: 'TRF654321098',
        status: 'completed'
      },
      {
        date: '2024-01-10T09:15:00',
        amount: 24000,
        method: 'Bank Transfer',
        reference: 'TRF543210987',
        status: 'completed'
      }
    ]
  },
  {
    id: 'COM007',
    userId: 'USR007',
    userName: 'Aisha Khan',
    email: 'aisha@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    userType: 'Influencer',
    amount: 8500,
    status: 'paid',
    createdDate: '2024-03-08T14:20:00',
    lastUpdated: '2024-03-10T16:45:00',
    lastPaymentDate: '2024-03-10T16:45:00',
    totalEarnings: 35000,
    commissionRate: 10,
    joinDate: '2023-08-05T00:00:00',
    description: 'Commission for beauty product promotions',
    paymentDetails: {
      accountName: 'Aisha Khan',
      accountNumber: '9876543210',
      bankName: 'ICICI Bank',
      ifscCode: 'ICIC0004567',
      upiId: 'aisha@upi'
    },
    taxDetails: {
      status: 'Individual',
      tdsApplicable: true,
      tdsPercentage: 10,
      panNumber: 'GHIJK6789L',
      gstNumber: null
    },
    relatedOrders: [
      {
        id: 'ORD1012',
        date: '2024-03-01T11:30:00',
        customer: 'Samira Ahmed',
        amount: 45000,
        commission: 4500,
        status: 'completed'
      },
      {
        id: 'ORD1013',
        date: '2024-03-03T13:45:00',
        customer: 'Fatima Ali',
        amount: 40000,
        commission: 4000,
        status: 'completed'
      }
    ],
    auditLog: [
      {
        timestamp: '2024-03-08T14:20:00',
        action: 'created',
        user: 'System',
        details: 'Commission automatically generated',
        ipAddress: '192.168.1.1'
      },
      {
        timestamp: '2024-03-09T10:15:00',
        action: 'approved',
        user: 'Admin User',
        details: 'Commission approved after verification',
        ipAddress: '192.168.1.2'
      },
      {
        timestamp: '2024-03-10T16:45:00',
        action: 'paid',
        user: 'Finance Team',
        details: 'Payment processed via bank transfer',
        ipAddress: '192.168.1.3'
      }
    ],
    history: [
      {
        id: 'HIST012',
        date: '2024-03-08T14:20:00',
        action: 'Created',
        amount: 8500,
        status: 'pending',
        by: 'System',
        notes: 'Automatically generated based on sales'
      },
      {
        id: 'HIST013',
        date: '2024-03-09T10:15:00',
        action: 'Approved',
        amount: 8500,
        status: 'approved',
        by: 'Admin User',
        notes: 'Verified and approved for payment'
      },
      {
        id: 'HIST014',
        date: '2024-03-10T16:45:00',
        action: 'Paid',
        amount: 8500,
        status: 'paid',
        by: 'Finance Team',
        notes: 'Payment processed via bank transfer'
      }
    ],
    paymentHistory: [
      {
        date: '2024-03-10T16:45:00',
        amount: 8500,
        method: 'Bank Transfer',
        reference: 'TRF432109876',
        status: 'completed'
      }
    ]
  },
  {
    id: 'COM008',
    userId: 'USR008',
    userName: 'Daniel Kim',
    email: 'daniel@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    userType: 'Reseller',
    amount: 19500,
    status: 'pending',
    createdDate: '2024-03-14T09:30:00',
    lastUpdated: '2024-03-14T09:30:00',
    lastPaymentDate: '2024-02-14T13:20:00',
    totalEarnings: 120000,
    commissionRate: 15,
    joinDate: '2023-02-28T00:00:00',
    description: 'Commission for tech gadget sales',
    paymentDetails: {
      accountName: 'Daniel Kim',
      accountNumber: '1472583690',
      bankName: 'Kotak Bank',
      ifscCode: 'KKBK0005678',
      upiId: 'daniel@upi'
    },
    taxDetails: {
      status: 'Individual',
      tdsApplicable: true,
      tdsPercentage: 10,
      panNumber: 'MNOPQ0123R',
      gstNumber: null
    },
    relatedOrders: [
      {
        id: 'ORD1014',
        date: '2024-03-07T14:25:00',
        customer: 'Jason Park',
        amount: 65000,
        commission: 9750,
        status: 'completed'
      },
      {
        id: 'ORD1015',
        date: '2024-03-09T16:40:00',
        customer: 'Michelle Lee',
        amount: 65000,
        commission: 9750,
        status: 'completed'
      }
    ],
    auditLog: [
      {
        timestamp: '2024-03-14T09:30:00',
        action: 'created',
        user: 'System',
        details: 'Commission automatically generated',
        ipAddress: '192.168.1.1'
      }
    ],
    history: [
      {
        id: 'HIST015',
        date: '2024-03-14T09:30:00',
        action: 'Created',
        amount: 19500,
        status: 'pending',
        by: 'System',
        notes: 'Automatically generated based on sales'
      }
    ],
    paymentHistory: [
      {
        date: '2024-02-14T13:20:00',
        amount: 16500,
        method: 'Bank Transfer',
        reference: 'TRF321098765',
        status: 'completed'
      }
    ]
  }
];