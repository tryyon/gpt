import { Control, FieldErrors } from "react-hook-form";

interface AddressFieldsProps {
  type: string;
  control: Control<any>;
  errors: FieldErrors<any>;
}

export function AddressFields({ type, control, errors }: AddressFieldsProps) {
  // TODO: Implement address fields UI
  return null;
}