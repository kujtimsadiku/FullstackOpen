import { EntryWithoutID } from "../../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutID) => void;
}

export const HealthCareForm = (props: Props) => {
  return (
    <div>
      <form></form>
    </div>
  );
};
