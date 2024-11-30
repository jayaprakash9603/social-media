import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import top100Films from "./top100Films";

const Check = () => {
  return (
    <div>
      <Autocomplete
        // disablePortal
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
    </div>
  );
};

export default Check;
