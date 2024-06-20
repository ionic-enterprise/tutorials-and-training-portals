import { Box, BoxProps } from "@mui/joy";

type HeaderProps = BoxProps & { endBar?: JSX.Element };

export const Header = (props: HeaderProps) => {
  const { endBar, ...other } = props;

  return (
    <Box
      component="header"
      className="Header"
      sx={{
        p: 1,
        bgcolor: "background.surface",
        display: "flex",
        flexDirection: "column",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
        top: "env(safe-area-inset-top)",
        zIndex: 1100,
        "::before": {
          content: '""',
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "env(safe-area-inset-top)",
          backgroundColor: "background.surface",
          zIndex: 1099,
        },
        "::after": {
          content: '""',
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "env(safe-area-inset-bottom)",
          backgroundColor: "var(--joy-palette-background-body)",
          zIndex: 1099,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gridColumn: "1 / -1",
          gap: 1.5,
        }}
        {...other}
      />
      {endBar && <Box>{endBar}</Box>}
    </Box>
  );
};
