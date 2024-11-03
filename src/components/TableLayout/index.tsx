import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import moment from "moment";

interface TableLayoutProps {
  caption: string;
  header: {
    label: string;
    keyValue: string;
    type?: string;
  }[];
  onDeleteAction?: (id: number) => void;
  onEditAction?: (id: number) => void;
  onViewAction?: (id: number) => void;
  dataList: any[];
}

const TableLayout: React.FC<TableLayoutProps> = ({
  header,
  dataList,
  caption,
  onDeleteAction,
  onViewAction,
  onEditAction
}) => {
  const renderType = (type: string, value: any) => {
    switch (type) {
      case "date":
        return moment(value).format("DD MMMM YYYY");
      case "view":
        return <Button onClick={() => onViewAction?.(value)}>View</Button>;
      case "delete":
        return <Button onClick={() => onDeleteAction?.(value)}>Delete</Button>;
      case "edit":
        return <Button onClick={() => onEditAction?.(value)}>Edit</Button>;
      default:
        return value;
    }
  };

  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {header.map((item, index) => (
            <TableHead key={index}>{item.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataList.map((item, index) => {
          return (
            <TableRow key={index}>
              {header.map((headerItem, headerIndex) => (
                <TableCell key={headerIndex}>
                  {renderType(headerItem.type || "", item[headerItem.keyValue])}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TableLayout;
