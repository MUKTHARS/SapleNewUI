// components/bot-creation/types/bot-types.ts - UPDATED
export interface BotFormData {
  name: string;
  media_type: string;
  color: string;
  font: string;
  font_style: string;
  font_size: string;
  default_model: string;
  prompt: string;
  welcome_message: string;
  calendly_enabled: boolean;
  calendly_link: string;
}

export interface Bot {
  id: string;
  name: string;
  media_type: string;
  color: string;
  font: string;
  font_style: string;
  font_size: string;
  default_model: string;
  prompt: string;
  welcome_message: string;
  calendly_enabled: boolean;
  calendly_link: string;
  container_name: string;
  training_status: string;
  created_at: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  s3_key: string;
  size: number;
  uploaded_at: string;
  type: string;
}

export interface StepProps {
  formData: BotFormData;
  setFormData: (data: BotFormData) => void;
  createdBot: Bot | null;
  setCreatedBot: (bot: Bot | null) => void;
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
  uploadedFiles: UploadedFile[];
  setUploadedFiles: (files: UploadedFile[]) => void;
  bucketName: string;
  setBucketName: (name: string) => void;
  trainingStatus: string;
  setTrainingStatus: (status: string) => void;
  error: string;
  setError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  currentStep: number;
  editMode?: boolean; // Make sure this is here
}
