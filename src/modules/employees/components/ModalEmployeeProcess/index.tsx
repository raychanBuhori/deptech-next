import { useState, useEffect } from "react";
import ModalDialog from "@/components/ModalDialog";
import { Employee } from "../../services/employeesApiSlice";
import { Input } from "@/components/ui/input";
import GenderSwitch from "@/components/GenderSwitch";
import AddEmployeeLeave from "../AddEmployeeLeave";
import {
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
  useAddEmployeeMutation
} from "../../services/employeesApiSlice";
import { toast } from "react-toastify";
import InputText from "@/components/InputText";

interface ModalProps {
  forViewOnly?: boolean;
  isOpen: boolean;
  onClose: () => void;
  dataId?: number;
}

const employeeDefault: Employee = {
  initialName: "",
  lastName: "",
  email: "",
  gender: "MALE",
  mobilePhoneNumber: "",
  address: ""
};

const ModalEmployeeProcess = ({
  forViewOnly = false,
  isOpen,
  onClose,
  dataId
}: ModalProps) => {
  const [employeeForm, setEmployeeForm] = useState<Employee>(employeeDefault);

  const { data: employee } = useGetEmployeeByIdQuery(dataId as number);

  const [addEmployee, { isError: addError }] = useAddEmployeeMutation();
  const [updateEmployee, { isError: updateError }] =
    useUpdateEmployeeMutation();

  const toggleGender = () => {
    setEmployeeForm({
      ...employeeForm,
      gender: employeeForm.gender.toUpperCase() === "MALE" ? "FEMALE" : "MALE"
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeForm({
      ...employeeForm,
      [e.target.name as string]: e.target.value
    });
  };

  const submitUser = async () => {
    if (employee?.email) {
      await updateEmployee({ id: dataId as number, employee: employeeForm });
    } else {
      await addEmployee(employeeForm);
    }
    onClose();
  };

  useEffect(() => {
    if (employee) {
      setEmployeeForm(employee);
    }

    return () => {
      setEmployeeForm(employeeDefault);
    };
  }, [employee]);

  useEffect(() => {
    if (addError) {
      toast.error("Failed to create employee");
    }
    if (updateError) {
      toast.error("Failed to update employee");
    }
  }, [addError, updateError]);

  return (
    <ModalDialog
      isOpen={isOpen}
      onClose={onClose}
      forViewOnly={forViewOnly}
      title="Employee Process"
      description="This is a modal dialog for Employee process."
      onSubmit={submitUser}
      submitText={employee?.email ? "Update" : "Create"}
    >
      <div className="grid grid-cols-2 gap-4">
        <InputText
          label="Initial Name"
          placeholder="Initial Name"
          name="initialName"
          onChange={handleChange}
          value={employeeForm?.initialName}
        />
        <InputText
          label="Last Name"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          value={employeeForm?.lastName}
        />
        <InputText
          label="Email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={employeeForm?.email}
        />
        <InputText
          label="Phone Number"
          placeholder="Phone Number"
          name="mobilePhoneNumber"
          onChange={handleChange}
          value={employeeForm?.mobilePhoneNumber}
        />
        <InputText
          label="Address"
          placeholder="Address"
          name="address"
          onChange={handleChange}
          value={employeeForm?.address}
        />
        <GenderSwitch
          isChecked={employeeForm?.gender?.toUpperCase() === "FEMALE"}
          toggle={toggleGender}
        />
      </div>
      <AddEmployeeLeave
        employeeId={dataId as number}
        paidLeaveList={employee?.employeeLeaves || []}
      />
    </ModalDialog>
  );
};

export default ModalEmployeeProcess;
