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

export default { GetCategory, GetBusiness };
