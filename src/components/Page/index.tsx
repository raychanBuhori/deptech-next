import styles from "./Page.module.css";
import { Button } from "../ui/button";

interface PageProps {
  headerText: string;
  showHeaderButton?: boolean;
  headerButtonText?: string;
  onHeaderButtonClick?: () => void;
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({
  headerText,
  showHeaderButton = false,
  headerButtonText = "Add",
  onHeaderButtonClick,
  children
}) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.headerText}>{headerText}</h1>
        {showHeaderButton && onHeaderButtonClick && (
          <Button onClick={onHeaderButtonClick}>{headerButtonText}</Button>
        )}
      </div>
      {children}
    </div>
  );
};

export default Page;
