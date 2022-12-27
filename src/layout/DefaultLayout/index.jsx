import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  closeActionList,
  closeSideBar,
} from "../../redux/features/DrawerSlice/drawerSlice";
import { BsArrowUpCircleFill } from "react-icons/bs";

function DefaultLayout({ children }) {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const isOpenSideBar = useSelector((state) => state.drawer.isOpenSideBar);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeSideBar());
    dispatch(closeActionList());
  }, [children]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showTopBtn && (
        <button
          className="fixed-button"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <div>
            <BsArrowUpCircleFill />
            <p>Đầu Trang</p>
          </div>
        </button>
      )}
      {isOpenSideBar && <SideBar />}
      <div className="page-container">
        <Header />
        <div className="content">{children}</div>
        <Footer />
      </div>
    </>
  );
}

export default DefaultLayout;
