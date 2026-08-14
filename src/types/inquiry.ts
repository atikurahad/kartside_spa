export interface InquiryFormData {
  name: string;
  email: string;
  referredBy: string;
  message: string;
}

export interface InquiryFormErrors {
  name?: string;
  email?: string;
  referredBy?: string;
  message?: string;
}

export const emptyInquiryForm: InquiryFormData = {
  name: "",
  email: "",
  referredBy: "",
  message: "",
};
