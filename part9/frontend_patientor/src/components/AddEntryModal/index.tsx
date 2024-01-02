import { Dialog, DialogTitle } from "@mui/material";
import { EntryWithoutID } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutID) => void;
  error?: string;
}

// Adding entry to a correct patient !!REMEMBER TO CHECK!!

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>New entry {type}</DialogTitle>
    </Dialog>
  );
};

export default AddEntryModal;
