export type User = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: 'Administrator' | 'Staff';
};

export let mockUsers: User[] = [
  {
    id: '1',
    fullName: 'JOEL',
    username: 'JEBARAJ',
    email: 'joelfranklinmc@gmail.com',
    role: 'Administrator',
  },
  {
    id: '2',
    fullName: 'Super Admin',
    username: 'AT2205',
    email: 'superuser@example.com',
    role: 'Administrator',
  },
];

export function addUser(user: Omit<User, 'id'>) {
    const newUser = { ...user, id: Date.now().toString() };
    mockUsers.unshift(newUser);
}
