import { Box, Input } from "@mui/joy";
import { ChangeEvent } from "react";

type Props = { onChange: (event: ChangeEvent<HTMLInputElement>) => void };

export const Searchbar = (props: Props) => {
  const handleChange = props.onChange;

  return (
    <Box sx={{ p: 1 }}>
      <Input
        placeholder="Search..."
        fullWidth
        onChange={handleChange}
        sx={{ backgroundColor: "white" }}
      />
    </Box>
  );
};
