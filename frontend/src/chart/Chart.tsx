import { genres, languages } from "./groupdata";
import Navbar from "../components/Navbar";
import GroupGrid from "./components/GroupGrid";
import GroupChart from "./components/GroupChart";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import * as React from "react";

type tSelect = "Жанр" | "Язык";

function Chart() {
  const [group, setGroup] = React.useState<tSelect>("Жанр");
  const [groupData, setGroupData] = React.useState(genres);

  const handleChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value as tSelect);
    if (event.target.value === "Жанр") {
      setGroupData(genres);
    } else if (event.target.value === "Язык") {
      setGroupData(languages);
    }
  };

  return (
    <div>
      <Navbar active="3" />
      <Container maxWidth="lg">
        <Box sx={{ width: "200px", m: "20px auto" }}>
          <FormControl fullWidth>
            <InputLabel> Группировать по </InputLabel>
            <Select
              id="select-group"
              value={group}
              label="Группировать по"
              onChange={handleChange}
            >
              <MenuItem value="Жанр"> Жанру </MenuItem>
              <MenuItem value="Язык"> Языку </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <GroupChart data={groupData} />
        <GroupGrid data={groupData} />
      </Container>
    </div>
  );
}

export default Chart;
