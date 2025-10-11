const logo : string = '/assets/logo.svg'
const deals1 : string = '/assets/deals1.png'
const deals2 : string = '/assets/deals2.png'
const deals3 : string = '/assets/deals3.png'
const search : string = '/assets/Search.png'
const user : string = '/assets/user.png'
const googleLogo : string = '/assets/googleLogo.svg'


export interface IUser {
  _id: string;
  username: string;
  email: string;
  fullName: {
    firstname: string;
    lastname: string;
  };
  avatar: string;
  coverImage?: string;
  password: string;
  refreshToken?: string;
  watchHistory?: string[];
  role: "seller" | "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  _id: string;
  owner: string; // references IUser._id
  name: string;
  category: string;
  price: number;
  deals: boolean;
  brand?: string;
  description: string;
  images: string[];
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

/* ---------------- HELPERS ---------------- */
const randomId = () => crypto.randomUUID();

/* ---------------- USERS (owners) ---------------- */
export const users: IUser[] = [
  {
    _id: randomId(),
    username: "freshmart",
    email: "owner1@easymart.com",
    fullName: { firstname: "Emma", lastname: "Stone" },
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    coverImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    password: "hashed_password_1",
    role: "seller",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: randomId(),
    username: "greengrocer",
    email: "owner2@easymart.com",
    fullName: { firstname: "Liam", lastname: "Johnson" },
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    password: "hashed_password_2",
    role: "seller",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: randomId(),
    username: "dairyqueen",
    email: "owner3@easymart.com",
    fullName: { firstname: "Sophia", lastname: "Carter" },
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    coverImage: "https://images.unsplash.com/photo-1542831371-d531d36971e6",
    password: "hashed_password_3",
    role: "seller",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/* ---------------- PRODUCTS ---------------- */
export const products: IProduct[] = [
  {
    _id: randomId(),
    owner: users[0]._id,
    name: "Organic Bananas",
    category: "Fruits",
    price: 4.99,
    deals: true,
    brand: "NatureFresh",
    description: "Sweet, organic bananas sourced from local farms.",
    images: [
      "https://picsum.photos/id/1080/600/400",
      "https://picsum.photos/id/103/600/400",
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: randomId(),
    owner: users[1]._id,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 3.49,
    deals: false,
    brand: "GreenValley",
    description: "Juicy red tomatoes perfect for salads and sauces.",
    images: [
      "https://picsum.photos/id/292/600/400",
      "https://picsum.photos/id/247/600/400",
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: randomId(),
    owner: users[2]._id,
    name: "Cheddar Cheese Block",
    category: "Cheese",
    price: 6.99,
    deals: true,
    brand: "DairyPure",
    description: "Aged cheddar cheese with rich, creamy flavor.",
    images: [
      "https://picsum.photos/id/1084/600/400",
      "https://picsum.photos/id/1081/600/400",
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: randomId(),
    owner: users[1]._id,
    name: "Green Lettuce",
    category: "Vegetables",
    price: 2.99,
    deals: false,
    brand: "FarmFresh",
    description: "Crisp and healthy green lettuce, ideal for fresh salads.",
    images: [
      "https://picsum.photos/id/292/600/400",
      "https://picsum.photos/id/291/600/400",
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: randomId(),
    owner: users[0]._id,
    name: "Mango Juice Bottle",
    category: "Drinks",
    price: 5.49,
    deals: true,
    brand: "TropiFresh",
    description: "100% pure mango juice — refreshing and tropical.",
    images: [
      "https://picsum.photos/id/249/600/400",
      "https://picsum.photos/id/250/600/400",
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: randomId(),
    owner: users[2]._id,
    name: "Mozzarella Cheese",
    category: "Cheese",
    price: 7.29,
    deals: false,
    brand: "DairyPure",
    description: "Soft and stretchy mozzarella, perfect for pizzas.",
    images: [
      "https://picsum.photos/id/293/600/400",
      "https://picsum.photos/id/292/600/400",
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: randomId(),
    owner: users[0]._id,
    name: "Orange Juice Pack",
    category: "Drinks",
    price: 4.49,
    deals: false,
    brand: "Sunburst",
    description: "Freshly squeezed orange juice with no added sugar.",
    images: [
      "https://picsum.photos/id/255/600/400",
      "https://picsum.photos/id/254/600/400",
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: randomId(),
    owner: users[1]._id,
    name: "Organic Potatoes",
    category: "Vegetables",
    price: 3.99,
    deals: false,
    brand: "FarmFresh",
    description: "Farm-grown organic potatoes — perfect for fries or mashing.",
    images: [
      "https://picsum.photos/id/295/600/400",
      "https://picsum.photos/id/296/600/400",
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: randomId(),
    owner: users[2]._id,
    name: "Greek Yogurt Cup",
    category: "Drinks",
    price: 2.49,
    deals: false,
    brand: "DairyLand",
    description: "Thick, creamy Greek yogurt rich in protein.",
    images: [
      "https://picsum.photos/id/297/600/400",
      "https://picsum.photos/id/298/600/400",
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: randomId(),
    owner: users[1]._id,
    name: "Carrot Pack",
    category: "Vegetables",
    price: 2.99,
    deals: false,
    brand: "VeggieFarm",
    description: "Crunchy, fresh carrots packed with vitamins.",
    images: [
      "https://picsum.photos/id/299/600/400",
      "https://picsum.photos/id/300/600/400",
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default {logo , deals1 , deals2 , deals3 , search ,user, googleLogo}