import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import ContactsList from "./pages/ContactsList";
import { getContacts } from "./api";

const contactsLoader = async () => {
  return getContacts();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/contacts" replace={true} />,
      },
      {
        path: "*",
        element: <Navigate to="/contacts" replace={true} />,
      },
      {
        path: "contacts",
        element: <ContactsList />,
        loader: contactsLoader,
      },
    ],
  },
]);

export default router;
