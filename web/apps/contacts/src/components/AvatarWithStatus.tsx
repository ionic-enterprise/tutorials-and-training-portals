import { Avatar, AvatarProps, Badge } from "@mui/joy";

type AvatarWithStatusProps = AvatarProps & { online?: boolean };

export const AvatarWithStatus = (props: AvatarWithStatusProps) => {
  const { online = false, ...other } = props;

  return (
    <div>
      <Badge
        color={online ? "success" : "neutral"}
        variant={online ? "solid" : "soft"}
        size="sm"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeInset="4px 4px"
      >
        <Avatar size="lg" {...other} />
      </Badge>
    </div>
  );
};
