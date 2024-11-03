import { useEffect, useState } from "react";
import Page from "@/components/Page";
import {
  useFetchEmployeesQuery,
  useDeleteEmployeeMutation
} from "../../services/employeesApiSlice";
import TableLayout from "@/components/TableLayout";
import ModalEmployeeProcess from "../../components/ModalEmployeeProcess";

const EmployeePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataId, setDataId] = useState<number | undefined>();
  const { data: employees } = useFetchEmployeesQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const handleDelete = (valueId: number) => {
    deleteEmployee(valueId);
  };

  const handleView = (valueId: number) => {
    setDataId(Number(valueId));
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setDataId(undefined);
    }
  }, [isOpen]);

  return (
    <Page
      headerText="Employees"
      onHeaderButtonClick={() => setIsOpen(true)}
      showHeaderButton
      headerButtonText="Add"
    >
      <TableLayout
        caption="Employee"
        dataList={employees || []}
        header={[
          { label: "View", keyValue: "id", type: "view" },
          { label: "Initial Name", keyValue: "initialName" },
          { label: "Last Name", keyValue: "lastName" },
          { label: "Email", keyValue: "email" },
          { label: "Gender", keyValue: "gender" },
          { label: "Address", keyValue: "address" },
          { label: "Phone Number", keyValue: "mobilePhoneNumber" },
          { label: "Delete", keyValue: "id", type: "delete" }
        ]}
        onViewAction={handleView}
        onDeleteAction={handleDelete}
      />
      {isOpen && (
        <ModalEmployeeProcess
          isOpen={isOpen}
          onClose={() => setIsOpen(!isOpen)}
          dataId={dataId}
        />
      )}
    </Page>
  );
};

export default EmployeePage;
