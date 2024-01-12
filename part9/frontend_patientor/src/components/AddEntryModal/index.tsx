import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { Diagnosis, EntryWithoutID } from "../../types";
import AddEntryForm from "./EntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutID) => void;
  error?: string;
  diagnosis: Diagnosis[];
}

// Adding entry to a correct patient !!REMEMBER TO CHECK!!

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  diagnosis,
}: Props) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>New entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <AddEntryForm
          onSubmit={onSubmit}
          onCancel={onClose}
          diagnosis={diagnosis}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
