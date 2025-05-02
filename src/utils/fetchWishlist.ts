import axios from "../Service/axios";

export const fetchWishlist = async (userId: string) => {
  const response = await axios.get(`/user/${userId}`);
  response.data.wishlist;
  console.log(response.data.wishlist);
  return;
};
