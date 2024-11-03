"use client";

import AOS from "aos";
import { useEffect } from "react";
import Nav from "@/components/Nav";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { RootState } from "@/store/store";
import styles from "./Layout.module.css";
import { clearUser } from "@/modules/users/store/currentUserSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/global.css";
import "aos/dist/aos.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser.user);

  useEffect(() => {
    if (!currentUser) {
      dispatch(clearUser());
      router.push("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animation (ms)
      once: true // Whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <div>
      {currentUser && (
        <>
          <Nav />
          <Sidebar />
        </>
      )}
      <div className={`${currentUser ? styles.content : ""}`}>{children}</div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}
