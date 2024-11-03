import { useState } from "react";
import Page from "@/components/Page";
import {
  useGetUsersQuery,
  useDeleteUserMutation
} from "../../services/usersApiSlice";
import TableLayout from "@/components/TableLayout";
import ModalUserProcess from "../../components/ModalUserProcess";

const UsersPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataId, setDataId] = useState<number | undefined>();
  const { data: users } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = (valueId: number) => {
    deleteUser(valueId);
  };

  const handleView = (valueId: number) => {
    setDataId(Number(valueId));
    setIsOpen(true);
  };

  return (
    <>
      <Page
        headerText="Users"
        onHeaderButtonClick={() => setIsOpen(true)}
        showHeaderButton
        headerButtonText="Add"
      >
        <TableLayout
          caption="Users"
          header={[
            { label: "View", keyValue: "id", type: "view" },
            { label: "Initial Name", keyValue: "initialName" },
            { label: "Initial Name", keyValue: "lastName" },
            { label: "Email", keyValue: "email" },
            { label: "Birth Date", keyValue: "birthDate", type: "date" },
            { label: "Gender", keyValue: "gender" },
            { label: "Delete", keyValue: "id", type: "delete" }
          ]}
          dataList={users || []}
          onViewAction={handleView}
          onDeleteAction={handleDelete}
        />
      </Page>
      <ModalUserProcess
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        dataId={dataId}
      />
    </>
  );
};

export default UsersPage;
