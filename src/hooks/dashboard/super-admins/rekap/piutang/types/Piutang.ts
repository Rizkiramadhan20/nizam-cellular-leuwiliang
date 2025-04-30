export interface PiutangContent {
  id?: string;
  nama: string;
  price: string;
  date: string;
  status: "sudah_bayar" | "belum_bayar";
  createdAt?: Date;
  updatedAt?: Date;
}

export type PiutangFormData = Omit<
  PiutangContent,
  "id" | "createdAt" | "updatedAt"
>;

export const initialFormData: PiutangFormData = {
  nama: "",
  price: "",
  date: "",
  status: "belum_bayar",
};

export interface ContentModalProps {
  isEditing: boolean;
  formData: PiutangFormData;
  setFormData: (data: PiutangFormData) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}

export interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting?: boolean;
}
