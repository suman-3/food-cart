import request, { gql } from "graphql-request";

const MASTER_URL =
  "https://api-ap-south-1.hygraph.com/v2/clve62mei00xf08v10tetp37m/master";

// Used to make getCategory Api Reguest
const GetCategory = async () => {
  const query = gql`
    query Assets {
      categories(first: 50) {
        id
        name
        slug
        icon {
          url
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const GetBusiness = async (category) => {
  const query =
    gql`
    query GetBusiness {
      resturants(where: { categories_some: { slug: "` +
    category +
    `" } }) {
        aboutUs
        address
        banner {
          url
        }
        categories {
          name
          slug
        }
        id
        name
        restroType
        slug
        workingHours
        reviews {
          star
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const GetBusinessDetail = async (businessSlug) => {
  const query =
    gql`
    query RestaurantDetail {
      resturant(where: { slug: "` +
    businessSlug +
    `" }) {
        aboutUs
        address
        banner {
          url
        }
        categories {
          name
          slug
        }
        id
        name
        restroType
        slug
        workingHours
        menu {
          ... on Menu {
            id
            category
            menuItem {
              ... on MenuItem {
                id
                name
                description
                price
                productImage {
                  url
                }
              }
            }
          }
        }
        reviews {
          star
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const AddToCart = async (data) => {
  const query = gql`
    mutation AddToCart {
      createUserCart(
        data: {
          email: "${data?.email}"
          productDescription: "${data?.description}"
          productImage: "${data?.productImage}"
          productName: "${data?.name}"
          resturant: { connect: { slug: "${data.resturantSlug}" } }
          price: ${data?.price}
       
        }
      ) {
        id
      }
      publishManyUserCarts(to: PUBLISHED) {
        count
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const GetUserCart = async (userEmail) => {
  const query =
    gql`
    query GetUserCart {
      userCarts(where: {email: "` +
    userEmail +
    `"}) {
        id
        price
        productDescription
        productImage
        productName
        resturant {
          name
          banner {
            url
          }
          slug
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const DisconnectRestroFromUserCartItem = async (id) => {
  const query =
    gql`
    mutation DiconnectRestroFromUserCartItem {
      updateUserCart(
        data: { resturant: { disconnect: true } }
        where: { id: "` +
    id +
    `" }
      )
      {
        id
      }
      publishManyUserCarts(to: PUBLISHED) {
        count
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const DeleteItemFromcart = async (id) => {
  const query =
    gql`
  mutation DeleteCartItem {
    deleteUserCart(where: {id: "` +
    id +
    `"}) {
      id
    }
  }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const AddNewReview = async (data) => {
  const query =
    gql`
    mutation AddNewReview {
      createReview(
        data: {
          email: "` +
    data.email +
    `"
          profileImage:  "` +
    data.profileImage +
    `"
          star: ` +
    data.star +
    `
          reviewText:  "` +
    data.reviewText +
    `"
          userName:  "` +
    data.userName +
    `"
          resturant: { connect: { slug: "` +
    data.RestroSlug +
    `"} }
        }
      ) {
        id
      }
      publishManyReviews(to: PUBLISHED) {
        count
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const GetRestaurentReviewes = async (slug) => {
  const query =
    gql`
  query RestaurentReviews {
    reviews(where: {resturant: {slug: "` +
    slug +
    `"}}, orderBy: publishedAt_DESC) {
      email
      id
      profileImage
      publishedAt
      userName
      star
      reviewText
    }
  }
  
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  GetCategory,
  GetBusiness,
  GetBusinessDetail,
  AddToCart,
  GetUserCart,
  DisconnectRestroFromUserCartItem,
  DeleteItemFromcart,
  AddNewReview,
  GetRestaurentReviewes,
};
