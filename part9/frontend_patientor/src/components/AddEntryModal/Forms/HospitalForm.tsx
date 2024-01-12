import { EntryWithoutID } from "../../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutID) => void;
}

export const HospitalForm = (props: Props) => {
  return (
    <div>
      <form></form>
    </div>
  );
};
