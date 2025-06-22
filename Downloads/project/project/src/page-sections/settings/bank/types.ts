export interface BankDetailsData {
  organizationId: string;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  accountType: string;
  ifscCode: string;
  branchName: string;
  branchAddress: string;
  swiftCode?: string;
  upiId?: string;
}

export interface Organization {
  id: string;
  name: string;
}