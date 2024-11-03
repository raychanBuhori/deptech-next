import { useState, useEffect, use } from "react";
import ModalDialog from "@/components/ModalDialog";
import { User } from "../../services/usersApiSlice";
import { Label } from "@/components/ui/label";
import { PopDatePicker } from "@/components/PopDatePicker";
import GenderSwitch from "@/components/GenderSwitch";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserQuery
} from "../../services/usersApiSlice";
import { toast } from "react-toastify";
import moment from "moment";
import InputText from "@/components/InputText";

interface ModalProps {
  forViewOnly?: boolean;
  isOpen: boolean;
  onClose: () => void;
  dataId?: number;
}

const userDefault: User = {
  initialName: "",
  lastName: "",
  email: "",
  birthDate: new Date(),
  gender: "MALE",
  password: ""
};

const ModalUserProcess = ({
  forViewOnly = false,
  isOpen,
  onClose,
  dataId
}: ModalProps) => {
  const [userForm, setUserForm] = useState<User>(userDefault);

  const { data: user } = useGetUserQuery(dataId as number);

  const [createUser, { isError: createError, isSuccess: createSuccess }] =
    useCreateUserMutation();
  const [updateUser, { isError: updateError, isSuccess: updateSuccess }] =
    useUpdateUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({ ...userForm, [e.target.name as string]: e.target.value });
  };

  const toggleGender = () => {
    setUserForm({
      ...userForm,
      gender: userForm.gender.toUpperCase() === "MALE" ? "FEMALE" : "MALE"
    });
  };

  const applyDate = (date?: Date) => {
    if (date) {
      setUserForm({
        ...userForm,
        birthDate: moment(date).format("YYYY-MM-DD")
      });
    }
  };

  const submitUser = async () => {
    if (user?.email) {
      await updateUser(userForm);
    } else {
      await createUser(userForm);
    }
    onClose();
  };

  useEffect(() => {
    if (user) {
      setUserForm(user);
    }

    return () => {
      setUserForm(userDefault);
    };
  }, [user]);

  useEffect(() => {
    if (createError) {
      toast.error("Failed to create user");
    }

    if (updateError) {
      toast.error("Failed to update user");
    }
  }, [createError, updateError]);

  useEffect(() => {
    if (createSuccess) {
      toast.success("User created successfully");
    }

    if (updateSuccess) {
      toast.success("User updated successfully");
    }
  }, [createSuccess, updateSuccess]);

  return (
    <ModalDialog
      isOpen={isOpen}
      onClose={onClose}
      forViewOnly={forViewOnly}
      title="User Process"
      description="This is a modal dialog for user process."
      onSubmit={submitUser}
      submitText={user?.email ? "Update" : "Create"}
    >
      <div className="grid grid-cols-2 gap-4">
        <InputText
          label="Initial Name"
          placeholder="Initial Name"
          name="initialName"
          onChange={handleChange}
          value={userForm?.initialName}
        />
        <InputText
          label="Last Name"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          value={userForm?.lastName}
        />
        <InputText
          label="Email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={userForm?.email}
        />
        <div className="flex flex-col gap-2">
          <Label>Birth Date</Label>
          <PopDatePicker
            currentDate={userForm?.birthDate}
            applyDate={applyDate}
          />
        </div>

        <GenderSwitch
          isChecked={userForm?.gender?.toUpperCase() === "FEMALE"}
          toggle={toggleGender}
        />
        <InputText
          label="Password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={userForm?.password}
        />
      </div>
    </ModalDialog>
  );
};

export default ModalUserProcess;
