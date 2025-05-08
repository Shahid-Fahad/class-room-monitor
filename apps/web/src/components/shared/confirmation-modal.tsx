import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface ConfirmationModalProps {
  isOpen: boolean;
  question: string;
  onResponse: (response: boolean) => void;
  onOpenChange?: (open: boolean) => void;
}

export default function ConfirmationModal({
  isOpen,
  question,
  onResponse,
  onOpenChange,
}: ConfirmationModalProps) {
  function handleResponse(response: boolean) {
    onResponse(response);
    if (onOpenChange) {
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">{question}</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => handleResponse(false)}>
            No
          </Button>
          <Button onClick={() => handleResponse(true)}>Yes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
