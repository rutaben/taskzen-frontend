import { ReactNode } from "react";
import styles from "./Layout.module.scss";
import Navigation from "../Navigation/Navigation";
import Sidebar from "../Sidebar/Sidebar";

export type Props = {
  isAuthenticated: boolean;
  children: ReactNode;
};

const Layout = ({ isAuthenticated, children }: Props) => {
  const getLayoutByAuthStatus = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
      return (
        <header className={styles.layoutContainer}>
          <Navigation />
          <Sidebar />
          <div className={styles.content}>{children}</div>
        </header>
      );
    }

    return null;
  };

  return getLayoutByAuthStatus(isAuthenticated);
};

export default Layout;
