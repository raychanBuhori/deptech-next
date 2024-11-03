import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputTextProps extends InputProps {
  label: string;
}

const InputText = (props: InputTextProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>{props.label}</Label>
      <Input {...props} />
    </div>
  );
};

export default InputText;
