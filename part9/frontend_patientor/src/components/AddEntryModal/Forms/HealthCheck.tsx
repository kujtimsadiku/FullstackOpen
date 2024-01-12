import { EntryWithoutID } from "../../../types";
import { BaseForm } from "./BaseForm";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutID) => void;
}

export const HealthCheckForm = (props: Props) => {
  return (
    <div>
      {/* <form></form> */}
      <BaseForm />
    </div>
  );
};
