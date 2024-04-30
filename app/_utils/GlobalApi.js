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
          email: "`+data?.email+`"
          productDescription: "`+data?.description+`"
          productImage:"`+data?.productImage+`"
          productName: "`+data?.name+`"
          price: `+data?.price+`
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

export default { GetCategory, GetBusiness, GetBusinessDetail, AddToCart };
