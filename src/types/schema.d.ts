type StatusType = 'pending' | 'cancelled' | 'done';

type Comment = {
  id: string;
  authorName: string;
  message: string;
  date: Date;
};

type PaintType = {
  id: string;
  title: string;
  year: number;
  category: string;
  url: string;
  width: number;
  height: number;
  price: number; // Euro
  stock: number; // available quantity
  comment?: Comment[];
};

type FirebaseDate = {
  nanoseconds: number;
  seconds: number;
};

type UserAdress = {
  city: string;
  country: string;
  line1: string;
  line2: string | null;
  postal_code: string;
  state: string;
};

type UserDetail = {
  name: string;
  email: string;
  address: UserAdress | null;
  phone: string | null;
};

type TransactionType = {
  id: string;
  paints: PaintType[];
  total: number;
  status: StatusType;
  userInfo: UserDetail | null;
  pdf?: string;
  date: Date | FirebaseDate;
};

type NewsType = {
  id: string;
  title: string;
  date: Date;
  location?: string;
  message?: string;
};

type DataPayload = Record<string, string | number | Date | Comment | StatusType | PaintType[]>;
