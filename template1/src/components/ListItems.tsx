import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { NavLink } from "react-router-dom";

export const mainListItems = (
   <React.Fragment>
      <ListItemButton>
         <ListItemIcon>
            <DashboardIcon />
         </ListItemIcon>
         {/* <ListItemText primary="Dashboard" /> */}
         <NavLink to="/">Dashboard</NavLink>
      </ListItemButton>
      <ListItemButton>
         <ListItemIcon>
            <ShoppingCartIcon />
         </ListItemIcon>
         {/* <ListItemText primary="Orders" /> */}
         <NavLink to="/Chart">Chart</NavLink>
      </ListItemButton>
      <ListItemButton>
         <ListItemIcon>
            <PeopleIcon />
         </ListItemIcon>
         {/* <ListItemText primary="Customers" /> */}
         <NavLink to="/Editor">Editor</NavLink>
      </ListItemButton>
      <ListItemButton>
         <ListItemIcon>
            <BarChartIcon />
         </ListItemIcon>
         {/* <ListItemText primary="Reports" /> */}
         <NavLink to="/DataGrid">DataGrid</NavLink>
      </ListItemButton>
      <ListItemButton>
         <ListItemIcon>
            <LayersIcon />
         </ListItemIcon>
         {/* <ListItemText primary="Integrations" /> */}
         <NavLink to="/SUB4">SUB4</NavLink>
      </ListItemButton>
   </React.Fragment>
);

export const secondaryListItems = (
   <React.Fragment>
      <ListSubheader
         component="div"
         inset
      >
         두번째 탭
      </ListSubheader>
      <ListItemButton>
         <ListItemIcon>
            <AssignmentIcon />
         </ListItemIcon>
         {/* <ListItemText primary="Current month" /> */}
         <NavLink to="/SUB5">SUB5</NavLink>
      </ListItemButton>
      <ListItemButton>
         <ListItemIcon>
            <AssignmentIcon />
         </ListItemIcon>
         {/* <ListItemText primary="Last quarter" /> */}
         <NavLink to="/1231231231234515213213">오류 페이지</NavLink>
      </ListItemButton>
   </React.Fragment>
);
