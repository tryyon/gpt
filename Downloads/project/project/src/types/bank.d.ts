export interface BankDetailsData {
  organizationId: string;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  accountType: 'Savings' | 'Current';
  ifscCode: string;
  branchName: string;
  branchAddress: string;
  swiftCode?: string;
  upiId?: string;
  isDefault?: boolean;
}

export interface Organization {
  id: string;
  name: string;
}