type Reviews = {
  name: string;
  picture: string;
  message: string;
};

type BookType = {
  title: string;
  author: string;
  genre: string;
  publication: string;
  reviews?: Reviews;
  //   Rating?: number;
};

// ["searchTerm", "title", "author", "genre", "publicaiton"];
type BookFilterType = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
  publication?: string;
};



export { BookType, BookFilterType };
