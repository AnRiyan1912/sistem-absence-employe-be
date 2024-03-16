export interface ForgotPassword {
  id: string;
  email: string;
  verificationCode: string;
  userId: number;
  verifyStatus: boolean;
  createdAt: Date;
  updatedAt: Date;
}
