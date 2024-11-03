import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  submitText?: string;
  forViewOnly?: boolean;
  children?: React.ReactNode;
}

const ModalDialog: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  forViewOnly = false,
  onSubmit,
  submitText,
  title,
  description,
  children
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="py-4">{children}</div>
        {!forViewOnly && (
          <DialogFooter>
            <Button type="submit" onClick={onSubmit}>
              {submitText || "Apply"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
