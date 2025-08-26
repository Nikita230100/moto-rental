export type CardDataType = {
  title: string;
  description: string;
  price: number;
  url: string;
};

export type CardType = CardDataType & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
