// import { fetchAllProducts } from '../api/productsApi';
// import { fetchCupDessertsExampleImageUrls, fetchProfileImageUrl } from '../api/imagesApi';

export const CAKES = 'cakes';
export const CUP_DESSERTS_BOX_SETS = 'cupDessertsBoxSets';
export const CUP_DESSERTS = 'cupDesserts';
export const CUP_DESSERTS_EXAMPLE_IMAGES = 'cupDessertsExampleImages';
export const PROFILE_IMAGE = 'profileImage';

const keyFns = {
    // [CAKES]: async () => await fetchAllProducts('cake'),
    // [CUP_DESSERTS_BOX_SETS]: async () => await fetchAllProducts('cupDessertsBoxSet'),
    // [CUP_DESSERTS]: async () => await fetchAllProducts('cupDessert'),
    // [CUP_DESSERTS_EXAMPLE_IMAGES]: fetchCupDessertsExampleImageUrls,
    // [PROFILE_IMAGE]: fetchProfileImageUrl,
};

export const defaultQueryFn = async key => {
    return await keyFns[key]();
};
