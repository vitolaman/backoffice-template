import { FieldError } from "react-hook-form";

export interface ValidationErrorProps {
  error?: FieldError;
}

const ValidationError = ({ error }: ValidationErrorProps) => {
  return error ? (
    <div className="text-red-400 italic text-sm text-right">
      {error.message}
    </div>
  ) : null;
};

export default ValidationError;
