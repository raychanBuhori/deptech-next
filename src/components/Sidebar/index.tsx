import Link from "next/link";
import SidebarList from "./SidebarList.json";
import styles from "./Sidebar.module.css"; // Import CSS module for styling

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <nav>
        <ul>
          {SidebarList.map((item, index) => (
            <li key={index}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
