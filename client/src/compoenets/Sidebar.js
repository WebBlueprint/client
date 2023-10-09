import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const Sidebar = () => {
  const menuItem = [
    {
      path: "/test0",
      name: "test0",
      icon: "",
    },
    {
      path: "/test1",
      name: "test1",
      icon: "",
    },
    {
      path: "/test2",
      name: "test2",
      icon: "",
    },
    {
      path: "/test3",
      name: "test3",
      icon: "",
    },
    {
      path: "/test4",
      name: "test4",
      icon: "",
    },
  ];

  return (
    <SideBar>
      <h1 style={{ color: "white" }}>SideBar</h1>
      <div>
        {menuItem.map((item, index) => {
          return (
            <Link to={item.path} key={index}>
              <p>
                <SidebarButton className="sidebar_buttons" variant="light">
                  {item.name}
                </SidebarButton>
              </p>
            </Link>
          );
        })}
      </div>
    </SideBar>
  );
};

export default Sidebar;

const SideBar = styled.div`
  height: 100vh;
  width: 10vw;
  background-color: black;
  float: left;
`;

const SidebarButton = styled.button`
  height: 4vh;
  width: 4vw;
  background-color: white;
  border: 1px solid white;
  &:hover {
    background-color: tomato;
  }
`;
