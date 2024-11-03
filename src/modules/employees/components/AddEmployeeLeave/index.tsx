import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { EmployeeLeave } from "../../services/employeeLeaveApiSlice";
import { PopDatePicker } from "@/components/PopDatePicker";
import { useCreateEmployeeLeaveMutation } from "../../services/employeeLeaveApiSlice";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import TableLayout from "@/components/TableLayout";
import { toast } from "react-toastify";
import InputText from "@/components/InputText";

const AddEmployeeLeave = ({
  employeeId,
  paidLeaveList
}: {
  employeeId: number;
  paidLeaveList: EmployeeLeave[];
}) => {
  const [leaveData, setLeaveData] = useState<EmployeeLeave>({
    userId: employeeId,
    leaveStartDate: moment().format("YYYY-MM-DD"),
    leaveEndDate: moment().format("YYYY-MM-DD"),
    reason: "",
    isActive: true
  });

  const [createEmployeeLeave, { isError, isSuccess }] =
    useCreateEmployeeLeaveMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLeaveData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createEmployeeLeave(leaveData).unwrap();
      toast.success("Leave added successfully");
      // Optionally, reset the form or update state here
      setLeaveData({
        userId: employeeId,
        leaveStartDate: moment().format("YYYY-MM-DD"),
        leaveEndDate: moment().format("YYYY-MM-DD"),
        reason: "",
        isActive: true
      });
    } catch (error) {
      // Handle the error based on your API response
      toast.error("Failed to add leave. Please try again.");
    }
  };

  const eligibleToAddLeave = useMemo(() => {
    const getLastList = paidLeaveList.slice(-1)[0];
    if (!getLastList) {
      return false;
    }
    const currentMonth = moment().format("MMMM");
    const dataMonth = moment(getLastList.leaveStartDate).format("MMMM");
    return currentMonth === dataMonth;
  }, [paidLeaveList]);

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong. Please try again.");
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Leave added successfully");
    }
  }, [isSuccess]);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Paid Leaves</h3>
      <TableLayout
        caption="Paid Leaves"
        dataList={paidLeaveList || []}
        header={[
          {
            label: "Leave Start Date",
            keyValue: "leaveStartDate",
            type: "date"
          },
          { label: "Leave End Date", keyValue: "leaveEndDate", type: "date" },
          { label: "Reason", keyValue: "reason" }
        ]}
      />
      <div className="grid gap-4 mt-4">
        <div className="flex flex-col gap-3">
          <Label>Start Date</Label>
          <PopDatePicker
            disabled={eligibleToAddLeave}
            currentDate={leaveData.leaveStartDate}
            applyDate={(date) =>
              setLeaveData((prevData) => ({
                ...prevData,
                leaveStartDate: moment(date).format("YYYY-MM-DD"),
                leaveEndDate: moment(date).add(1, "days").format("YYYY-MM-DD")
              }))
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label>End Date</Label>
          <PopDatePicker
            disabled
            currentDate={leaveData.leaveEndDate}
            applyDate={(date) =>
              setLeaveData((prevData) => ({
                ...prevData,
                leaveEndDate: moment(date).format("YYYY-MM-DD")
              }))
            }
          />
        </div>
        <InputText
          label="Reason"
          disabled={eligibleToAddLeave}
          type="text"
          name="reason"
          placeholder="Reason"
          value={leaveData.reason}
          onChange={handleChange}
        />
        <Button
          onClick={handleSubmit}
          disabled={eligibleToAddLeave}
          className="w-full"
        >
          Add New Leave
        </Button>
      </div>
    </div>
  );
};

export default AddEmployeeLeave;
