import React, { useState, useEffect, useRef } from "react";
import styles from "./Navigation.module.scss";
import cx from "classnames";
import { Avatar, IconButton, Menu, MenuItem, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SETTINGS = ["Logout"];

const Navigation = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [searchInputVisible, setSearchInputVisible] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleShowSearchInput = () => {
    setSearchInputVisible(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(target)
      ) {
        setSearchInputVisible(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.navigationContainer}>
      <div className={styles.navigation}>
        <div
          className={cx(styles.searchContainerMobile, {
            [styles.searchVisible]: searchInputVisible,
          })}
        >
          <IconButton
            onClick={handleShowSearchInput}
            className={styles.searchIconButton}
          >
            <SearchIcon />
          </IconButton>
          <InputBase
            ref={searchContainerRef}
            placeholder="Search…"
            className={cx(styles.searchInput, {
              [styles.searchVisible]: searchInputVisible,
            })}
          />
        </div>

        <div
          className={cx(styles.logoContainer, {
            [styles.searchVisible]: searchInputVisible,
          })}
        >
          <span className={styles.logoText}>taskzen</span>
        </div>

        <div className={styles.navigationItems}>
          <div className={styles.searchContainer}>
            <SearchIcon />
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.userBox}>
            <IconButton
              onClick={handleOpenUserMenu}
              className={styles.userIconButton}
            >
              <Avatar alt="" />
            </IconButton>
          </div>

          <Menu
            className={styles.userMenu}
            anchorEl={anchorElUser}
            keepMounted
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {SETTINGS.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                {setting}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
