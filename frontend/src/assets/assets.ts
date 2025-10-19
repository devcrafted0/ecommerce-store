const logo : string = '/assets/logo.svg'
const deals1 : string = '/assets/deals1.png'
const deals2 : string = '/assets/deals2.png'
const deals3 : string = '/assets/deals3.png'
const search : string = '/assets/Search.png'
const user : string = '/assets/user.png'
const googleLogo : string = '/assets/googleLogo.svg'
const noCoverImage : string = '/assets/noCoverImage.jpg'


export default {logo , deals1 , deals2 , deals3 , search ,user, googleLogo, noCoverImage}

export interface Product {
  _id: string;
  owner: string; // references IUser._id
  name: string;
  category: string;
  regularPrice: number;
  salePrice: number;
  hasSalePrice : boolean;
  taxable : boolean;
  sku : string;
  shortDescription : string;
  fullDescription : string;
  brand : string;
  images: {url : string ; public_id : string ; _id : string }[];
  inStock: boolean;
  stockUnit : string;
  weight : string;
  dimensions  : string;
  createdAt: string;
  updatedAt: string;
}