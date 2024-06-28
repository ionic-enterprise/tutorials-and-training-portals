const titles: string[] = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "Marketing Specialist",
  "Sales Representative",
  "Human Resources Manager",
  "Business Analyst",
  "Customer Support Specialist",
  "Project Manager",
  "Network Administrator",
  "Database Administrator",
  "Quality Assurance Engineer",
  "DevOps Engineer",
  "Mobile App Developer",
  "Content Strategist",
  "Graphic Designer",
  "IT Support Specialist",
  "Security Analyst",
  "Technical Writer",
  "SEO Specialist",
  "Financial Analyst",
  "Operations Manager",
  "Research Scientist",
  "Social Media Manager",
  "Web Developer",
  "Electrical Engineer",
  "Mechanical Engineer",
  "Civil Engineer",
  "Digital Marketing Manager",
];

interface Location {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
  postcode: string;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface Contact {
  name: {
    first: string;
    last: string;
  };
  email: string;
  location: Location;
  phone: string;
  cell: string;
  picture: Picture;
  id: {
    value: string;
  };
  title: string;
}

export const getContacts = async (): Promise<Contact[]> => {
  try {
    const url = "https://randomuser.me/api/?results=30&seed=jobsync&nat=us";
    const res = await fetch(url);
    const { results } = await res.json();
    results
      .sort((a: Contact, b: Contact) => a.name.last.localeCompare(b.name.last))
      .map((c: Contact, idx: number) => (c.title = titles[idx]));
    return results as Contact[];
  } catch (error) {
    return [];
  }
};
