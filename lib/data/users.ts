export interface User {
  id: string;
  name: string;
  role: "Engineer" | "MD" | "ED";
  email: string;
  avatar?: string;
  department?: string;
}

export const users: User[] = [
  {
    id: "user-1",
    name: "Chloe Milagres",
    role: "Engineer",
    email: "chloe.milagres@ndphc.ng",
    department: "Operations",
  },
  {
    id: "user-2",
    name: "Jennifer Adighije",
    role: "MD",
    email: "jennifer.adighije@ndphc.ng",
    department: "Executive",
  },
  {
    id: "user-3",
    name: "Omoregie O.",
    role: "ED",
    email: "omoregie.o@ndphc.ng",
    department: "Operations",
  },
  {
    id: "user-4",
    name: "Steven Andzenge",
    role: "ED",
    email: "steven.andzenge@ndphc.ng",
    department: "Legal & Contracts",
  },
  {
    id: "user-5",
    name: "Babayo Bello",
    role: "ED",
    email: "babayo.bello@ndphc.ng",
    department: "Grid Operations",
  },
  {
    id: "user-6",
    name: "Abdullahi Kassim",
    role: "ED",
    email: "abdullahi.kassim@ndphc.ng",
    department: "O&M",
  },
  {
    id: "user-7",
    name: "Omololu Agoro",
    role: "ED",
    email: "omololu.agoro@ndphc.ng",
    department: "Finance",
  },
];

export const demoCredentials = {
  workId: "NDPHC001",
  password: "demo123",
};

export const getUserByRole = (role: User["role"]): User | undefined => {
  return users.find((u) => u.role === role);
};

export const plantStaff = [
  {
    id: "staff-1",
    name: "Akujiobi Chime",
    role: "Plant Director",
    avatar: null,
  },
  {
    id: "staff-2",
    name: "Austine Lawal",
    role: "COO",
    avatar: null,
  },
  {
    id: "staff-3",
    name: "Michelle Obi",
    role: "HOD Electricals",
    avatar: null,
  },
  {
    id: "staff-4",
    name: "Lura Silverman",
    role: "637 Points",
    avatar: null,
  },
];

export const departments = [
  { name: "Electrical", staffCount: 52, trend: "up" as const, rank: 1 },
  { name: "Mechanical", staffCount: 5, trend: "down" as const, rank: 2 },
  { name: "Sales", staffCount: 21, trend: "up" as const, rank: 3 },
  { name: "Driving", staffCount: 52, trend: "up" as const, rank: 4 },
];

