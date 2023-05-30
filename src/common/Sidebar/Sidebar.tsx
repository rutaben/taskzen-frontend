import { useState, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import styles from "./Sidebar.module.scss";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import { addResizeListener } from "../../helpers/resizeScreen";
import cx from "classnames";
import { NavLink } from "react-router-dom";

export type SidebarItem = {
  title: string;
  icon: JSX.Element;
  link: string;
};

const DESKTOP_BREAKPOINT = 840;

const SIDEBAR_ITEMS = [
  { title: "Email scheduler", icon: <SendIcon />, link: "/email-scheduler" },
];

const Sidebar = () => {
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= DESKTOP_BREAKPOINT
  );
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    addResizeListener(DESKTOP_BREAKPOINT, setIsDesktop);
  }, []);

  const handleClose = () => {
    setIsExpanded(false);
  };

  const hasFullSidebar =
    (isDesktop && !isExpanded) || (isExpanded && !isDesktop);

  return (
    <>
      {hasFullSidebar ? (
        <div
          className={cx(styles.sidebarContainer, {
            [styles.expanded]: isExpanded,
          })}
        >
          {isExpanded && (
            <IconButton onClick={handleClose} className={styles.closeButton}>
              <CloseIcon />
            </IconButton>
          )}
          <ul className={styles.sidebarItemList}>
            {SIDEBAR_ITEMS.map(({ title, icon, link }: SidebarItem) => (
              <li className={styles.sidebarItem} key={title}>
                <NavLink
                  to={link}
                  className={({ isActive }) =>
                    isActive ? styles.activeNavLink : styles.navLink
                  }
                >
                  <Button
                    onClick={handleClose}
                    startIcon={icon}
                    className={cx(styles.button, {
                      [styles.expanded]: isExpanded,
                    })}
                  >
                    {title}
                  </Button>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.iconButton}>
          <IconButton onClick={() => setIsExpanded(true)}>
            <ViewSidebarIcon />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default Sidebar;
