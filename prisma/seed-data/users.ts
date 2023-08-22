import { User } from '@prisma/client'

export const users: {
  name: User['name']
  email: User['email']
  role: User['role']
  hashedPassword: User['hashedPassword']
}[] = [
  {
    name: 'Sales User',
    email: 'sales@maxseen.com',
    role: 'SALES',
    hashedPassword: '$2b$12$0ecCDagR3U3hhCnKu8Tk0.Ntk1hlzysRO4.FBlt8Pt5khcFUN0XaK',
    //admin123
  },
  {
    name: 'Admin User',
    email: 'admin@maxseen.com',
    role: 'ADMIN',
    hashedPassword: '$2b$12$0ecCDagR3U3hhCnKu8Tk0.Ntk1hlzysRO4.FBlt8Pt5khcFUN0XaK',
  },
]
