import { CheckCircle, AlertCircle } from "lucide-react";

interface FormStatusProps {
  success: boolean | undefined;
  text: string;
}

const FormStatus: React.FC<FormStatusProps> = ({ success, text }) => {
  if (!text) return null; // Don’t render anything if text is empty

  const colorClass = success
    ? "bg-green-50 text-green-700 border-green-200"
    : "bg-red-50 text-red-700 border-red-200";

  const Icon = success ? CheckCircle : AlertCircle;

  return (
    <div
      className={`flex items-center gap-3 border p-3 rounded-xl mb-4 transition-all duration-300 ${colorClass}`}
    >
      <div className="flex-shrink-0">
        <Icon
          size={20}
          className={success ? "text-green-500" : "text-red-500"}
        />
      </div>
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
};

export default FormStatus;