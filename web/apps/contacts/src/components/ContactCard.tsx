import {
  Box,
  IconButton,
  ListDivider,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import { Contact } from "../api";
import { AvatarWithStatus } from "./AvatarWithStatus";
import { CallOutlined, EmailOutlined } from "@mui/icons-material";

type Props = { contact: Contact; isLast: boolean };

export const ContactCard: React.FC<Props> = ({ contact, isLast }) => {
  const online = Math.random() > 0.5;

  return (
    <>
      <ListItem
        sx={{ p: 0, py: 1.5 }}
        endAction={
          <Box>
            <IconButton size="sm" href={`tel:${contact.cell}`}>
              <CallOutlined />
            </IconButton>
            <IconButton
              size="sm"
              color="primary"
              href={`mailto:${contact.email}`}
            >
              <EmailOutlined />
            </IconButton>
          </Box>
        }
      >
        <ListItemDecorator>
          <AvatarWithStatus online={online} src={contact.picture.thumbnail} />
        </ListItemDecorator>
        <ListItemContent sx={{ pl: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography level="title-md">
              {contact.name.first} {contact.name.last}
            </Typography>
            <Typography level="body-sm">{contact.title}</Typography>
          </Box>
        </ListItemContent>
      </ListItem>
      {!isLast && <ListDivider inset="startContent" />}
    </>
  );
};
