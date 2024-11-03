"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/modules/users/store/currentUserSlice";
import styles from "./Nav.module.css";
import { FaUserCircle } from "react-icons/fa";
import { RootState } from "@/store/store";
import ModalEditProfile from "@/components/Nav/ModalEditProfile";

const Nav: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser.user);
  const username = currentUser?.initialName || "User"; // Placeholder name

  const [isOpen, setIsOpen] = useState(false);

  const handleView = () => {
    setIsOpen(true);
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <FaUserCircle size={30} className={styles.icon} />{" "}
        </div>

        <div className={styles.right}>
          <span className={styles.username} onClick={handleView}>
            {username}
          </span>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <ModalEditProfile isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />
    </>
  );
};

export default Nav;
