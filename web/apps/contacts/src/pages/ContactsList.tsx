import { Layout } from "@jobsync/ui";
import { publishNavigateBackMessage } from "@jobsync/portals";
import { useLoaderData } from "react-router-dom";
import { Contact } from "../api";
import { List, Sheet } from "@mui/joy";
import { ContactCard } from "../components";
import { useState } from "react";

const ContactsList: React.FC = () => {
  const initialContacts = useLoaderData() as Contact[];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [contacts] = useState(initialContacts);

  /*
  const filter = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim().toLowerCase();
    if (!query.length) {
      setContacts(initialContacts);
    } else {
      const filtered = initialContacts.filter(({ name }) =>
        `${name.first} ${name.last}`.toLowerCase().includes(query)
      );
      setContacts(filtered);
    }
  };
  */

  return (
    <Layout>
      {/* <Layout.Header endBar={<Searchbar onChange={filter} />}> */}
      <Layout.Header>
        <Layout.BackButton onClick={publishNavigateBackMessage} />
        <Layout.Title title="Contacts" />
      </Layout.Header>
      <Layout.Content>
        <Sheet variant="outlined" sx={{ borderRadius: 8 }}>
          <List sx={{ px: 2, backgroundColor: "white" }}>
            {contacts.map((contact, idx) => (
              <ContactCard
                key={idx}
                contact={contact}
                isLast={idx === contacts.length - 1}
              />
            ))}
          </List>
        </Sheet>
      </Layout.Content>
    </Layout>
  );
};
export default ContactsList;
