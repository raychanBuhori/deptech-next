import { useState, useEffect } from "react";
import ModalDialog from "@/components/ModalDialog";
import { User } from "@/modules/users/services/usersApiSlice";
import { Input } from "@/components/ui/input";
import { PopDatePicker } from "@/components/PopDatePicker";
import GenderSwitch from "@/components/GenderSwitch";
import { useUpdateUserMutation } from "@/modules/users/services/usersApiSlice";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setUser } from "@/modules/users/store/currentUserSlice";

interface ModalProps {
  forViewOnly?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const userDefault: User = {
  initialName: "",
  lastName: "",
  email: "",
  birthDate: new Date(),
  gender: "MALE",
  password: ""
};

const ModalEditProfile = ({
  forViewOnly = false,
  isOpen,
  onClose
}: ModalProps) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser.user);
  const [userForm, setUserForm] = useState<User>(currentUser || userDefault);

  const [updateUser, { isSuccess }] = useUpdateUserMutation();

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
    await updateUser(userForm);
    onClose();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(userForm));
    }
  }, [isSuccess]);

  return (
    <ModalDialog
      isOpen={isOpen}
      onClose={onClose}
      forViewOnly={forViewOnly}
      title="Edit Profile"
      description="This is a modal dialog for user process."
      onSubmit={submitUser}
      submitText={"Update"}
    >
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Initial Name"
          name="initialName"
          onChange={handleChange}
          value={userForm?.initialName}
        />
        <Input
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          value={userForm?.lastName}
        />
        <Input
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={userForm?.email}
        />
        <PopDatePicker
          currentDate={userForm?.birthDate}
          applyDate={applyDate}
        />
        <GenderSwitch
          isChecked={userForm?.gender?.toUpperCase() === "FEMALE"}
          toggle={toggleGender}
        />
        <Input
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={userForm?.password}
        />
      </div>
    </ModalDialog>
  );
};

export default ModalEditProfile;
