export type ClaimStatus =
  | 'OPEN'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'CLOSED';

export interface MockClaim {
  id: string;
  claimNumber: string;
  customerName: string;
  status: ClaimStatus;
  assignedTo: string | null;
  createdDate: string;
  documentCount: number;
}

const statuses: ClaimStatus[] = [
  'OPEN',
  'IN_REVIEW',
  'APPROVED',
  'REJECTED',
  'CLOSED',
];

const firstNames = [
  'James',
  'Robert',
  'John',
  'Michael',
  'David',
  'William',
  'Richard',
  'Joseph',
  'Thomas',
  'Charles',
];

const lastNames = [
  'Smith',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Wilson',
  'Anderson',
];

const agents = [
  'Agent 1001',
  'Agent 1002',
  'Agent 1003',
  'Agent 1004',
  'Agent 1005',
];

const generateCustomerName = (index: number): string => {
  const firstName =
    firstNames[index % firstNames.length];

  const lastName =
    lastNames[
      Math.floor(index / firstNames.length) %
        lastNames.length
    ];

  return `${firstName} ${lastName}`;
};

const generateClaims = (count: number): MockClaim[] => {
  return Array.from({ length: count }, (_, index) => {
    const claimIndex = index + 1;

    return {
      id: `claim-${claimIndex}`,

      claimNumber: `CLM-${String(claimIndex).padStart(6, '0')}`,

      customerName: generateCustomerName(index),

      status: statuses[index % statuses.length],

      assignedTo:
        index % 5 === 0
          ? null
          : agents[index % agents.length],

      createdDate: new Date(
        Date.now() - index * 60 * 60 * 1000,
      ).toISOString(),

      documentCount: (index % 8) + 1,
    };
  });
};

export const claims: MockClaim[] =
  generateClaims(25000);