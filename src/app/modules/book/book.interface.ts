type Reviews = {
  name: string;
  picture: string;
  message: string;
};

type BookType = {
  title: string;
  author: string;
  genre: string;
  publication: Date;
  reviews?: Reviews;
  //   Rating?: number;
};


export {
    BookType
}