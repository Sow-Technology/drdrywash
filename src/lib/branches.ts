
export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

export let mockBranches: Branch[] = [
  {
    id: '1',
    name: 'Main Branch',
    address: '984 Wintergreen Rd, Tucker, GA 30084',
    phone: '712-336-2459',
  },
  {
    id: '2',
    name: 'Downtown Satellite',
    address: '456 Oak Avenue, Springfield, IL 62704',
    phone: '217-555-1234',
  },
];

export function addBranch(branch: Omit<Branch, 'id'>) {
    const newBranch = { ...branch, id: Date.now().toString() };
    mockBranches.unshift(newBranch);
}

export function removeBranch(branchId: string) {
    mockBranches = mockBranches.filter(branch => branch.id !== branchId);
}
