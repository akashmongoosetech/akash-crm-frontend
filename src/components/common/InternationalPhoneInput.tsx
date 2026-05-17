import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

export interface InternationalPhoneInputProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export function InternationalPhoneInput({
  value,
  onChange,
  label,
  placeholder,
  error,
  required,
  className,
}: InternationalPhoneInputProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <PhoneInput
        international
        defaultCountry="IN"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors",
          "focus-within:outline-none focus-within:ring-1 focus-within:ring-ring",
          error && "border-destructive focus-within:ring-destructive",
          "[&_.PhoneInputCountry]:h-full [&_.PhoneInputCountry]:flex [&_.PhoneInputCountry]:items-center",
          "[&_.PhoneInputCountryIcon]:w-6 [&_.PhoneInputCountryIcon]:h-4",
          "[&_.PhoneInputCountryIconImg]:max-h-full [&_.PhoneInputCountryIconImg]:w-auto",
          "[&_.PhoneInputCountrySelectArrow]:ml-0.5",
        )}
      />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}

export function validatePhoneNumber(phoneNumber: string): boolean {
  if (!phoneNumber || phoneNumber.length < 5) return false;
  return /^\+[\d\s\-()]+$/.test(phoneNumber);
}
