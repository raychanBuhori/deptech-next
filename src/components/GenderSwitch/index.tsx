import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SwitchProps {
  isChecked: boolean;
  toggle: () => void;
}

export default function GenderSwitch({ isChecked, toggle }: SwitchProps) {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="gender">Male</Label>
      <Switch id="gender" checked={isChecked} onCheckedChange={toggle} />
      <Label htmlFor="gender">Female</Label>
    </div>
  );
}
