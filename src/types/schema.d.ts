type StatusType = "pending" | "cancelled" | "done";

type Comment = {
  id: string;
  authorEmail: string;
  authorName: string;
  message: string;
  date: Date;
  reply: Comment[];
};

type PaintType = {
  id: string;
  title: string;
  year: number;
  category: string;
  url: string;
  width: string;
  height: string;
  price: number; // Euro
  stock: number; // available quantity
  comment: Comment[];
};

type TransactionType = {
  id: string;
  Paints: PaintType[];
  total: number;
  stripeId: string; // TODO: Replace with correct type
  status: StatusType;
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    country: string;
    phone: string;
  };
};

type EventType = {
  id: string;
  title: string;
  date: Date;
  location?: string;
  description?: string;
  link?: string;
};
