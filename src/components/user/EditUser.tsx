import { Box, Typography, Container, Tab } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import EditInfo from "./EditInfo";
import ChangePassword from "./ChangePassword";

export default function EditUser() {
  const [value, setValue] = useState("1");

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography component="h1" variant="h4" fontWeight={700} mb={2}>
        Edit User
      </Typography>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Edit User Information" value="1" />
            <Tab label="Change Password" value="2" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <EditInfo />
        </TabPanel>

        <TabPanel value="2">
          <ChangePassword />
        </TabPanel>
      </TabContext>
    </Container>
  );
}
