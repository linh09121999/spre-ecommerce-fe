import { create } from 'zustand'
import {
    ResAccount,
    ResAccountAddress_ListAll,
    ResAccountAddress,
    ResAccountCreditCard_ListAll,
    ResAccountCreditCard_Retrieve,
    ResAccountOrder_ListAll,
    ResAccountOrder_Retrieve,
    ResAdyen, ResCart,
    ResCartOther_List,
    ResCheckoutShipments, ResCountries_ListAll,
    ResCountries_Retrieve, ResCountryDefault,
    ResOrderStatus, ResPolicies_ListAll,
    ResPolicies_Retrieve, ResPostCategories_ListAll,
    ResPostCategories_Retrieve, ResPosts_ListAll,
    ResPosts_Retrieve, ResProduct_ListAll, ResProduct_Retrieve,
    ResStore, ResStripe, ResStripe_CreateSetupIntent,
    ResTaxons_ListAll, ResTaxons_Retrieve,
    ResVendors_ListAll, ResVendors_Retrieve, ResWishlists,
    ResWishlistsWishedItems, ResWishlists_ListAll,
    ResCartOther,
    ResCheckoutPayments_ListAll,
    ResCheckoutPayments
} from '@/interface/responseData/interfaceStorefront'

// Account
interface State_ResAccount {
    resAccount: ResAccount | undefined;
    setResAccount: (data: ResAccount) => void;
}

export const useState_ResAccount = create<State_ResAccount>((set) => ({
    resAccount: undefined,
    setResAccount: (data) => set({ resAccount: data })
}))

// Account / Address
interface State_ResAccountAddress {
    resAccountAddress_All: ResAccountAddress_ListAll | undefined;
    setResAccountAddress_All: (data: ResAccountAddress_ListAll) => void;
    resAccountAddress: ResAccountAddress | undefined;
    setResAccountAddress: (data: ResAccountAddress) => void;
}

export const useState_ResAccountAddress = create<State_ResAccountAddress>((set) => ({
    resAccountAddress_All: undefined,
    setResAccountAddress_All: (data) => set({ resAccountAddress_All: data }),
    resAccountAddress: undefined,
    setResAccountAddress: (data) => set({ resAccountAddress: data })
}))

// Account / Credit Cards
interface State_ResAccountCreditCard {
    resAccountCreditCard_All: ResAccountCreditCard_ListAll | undefined;
    setResAccountCreditCard_All: (data: ResAccountCreditCard_ListAll) => void;
    resAccountCreditCard_Retrieve: ResAccountCreditCard_Retrieve | undefined;
    setResAccountCreditCard_Retrieve: (data: ResAccountCreditCard_Retrieve) => void;
}

export const useState_ResAccountCreditCard = create<State_ResAccountCreditCard>((set) => ({
    resAccountCreditCard_All: undefined,
    setResAccountCreditCard_All: (data) => set({ resAccountCreditCard_All: data }),
    resAccountCreditCard_Retrieve: undefined,
    setResAccountCreditCard_Retrieve: (data) => set({ resAccountCreditCard_Retrieve: data })
}))

// Account / Orders
interface State_ResAccountOrder {
    resAccountOrder_All: ResAccountOrder_ListAll | undefined;
    setResAccountOrder_All: (data: ResAccountOrder_ListAll) => void;
    resAccountOrder_Retrieve: ResAccountOrder_Retrieve | undefined;
    setResAccountOrder_Retrieve: (data: ResAccountOrder_Retrieve) => void;
}

export const useState_ResAccountOrder = create<State_ResAccountOrder>((set) => ({
    resAccountOrder_All: undefined,
    setResAccountOrder_All: (data) => set({ resAccountOrder_All: data }),
    resAccountOrder_Retrieve: undefined,
    setResAccountOrder_Retrieve: (data) => set({ resAccountOrder_Retrieve: data })
}))

// Order Status
interface State_ResOrderStatus {
    resOrderStatus: ResOrderStatus | undefined;
    setResOrderStatus: (data: ResOrderStatus) => void;
}

export const useState_ResOrderStatus = create<State_ResOrderStatus>((set) => ({
    resOrderStatus: undefined,
    setResOrderStatus: (data) => set({ resOrderStatus: data })
}))

// Cart
interface State_ResCart {
    resCart: ResCart | undefined;
    setResCart: (data: ResCart) => void;
}

export const useState_ResCart = create<State_ResCart>((set) => ({
    resCart: undefined,
    setResCart: (data) => set({ resCart: data })
}))

// Cart / Other
interface State_ResCartOther {
    resCartOther_List: ResCartOther_List | undefined;
    setResCartOther_List: (data: ResCartOther_List) => void;
    resCartOther: ResCartOther | undefined;
    setResCartOther: (data: ResCartOther) => void;
}

export const useState_ResCartOther = create<State_ResCartOther>((set) => ({
    resCartOther_List: undefined,
    setResCartOther_List: (data) => set({ resCartOther_List: data }),
    resCartOther: undefined,
    setResCartOther: (data) => set({ resCartOther: data })
}))

// Checkout / Shipments
interface State_ResCheckoutShipments {
    resCheckoutShipments: ResCheckoutShipments;
    setResCheckoutShipments: (data: ResCheckoutShipments) => void;
}

export const useState_ResCheckoutShipments = create<State_ResCheckoutShipments>((set) => ({
    resCheckoutShipments: {
        data: [],
        included: []
    },
    setResCheckoutShipments: (data) => set({ resCheckoutShipments: data })
}))

// Checkout / Payments
interface State_ResCheckoutPayments {
    resCheckoutPayments_List: ResCheckoutPayments_ListAll;
    setResCheckoutPayments_List: (data: ResCheckoutPayments_ListAll) => void;
    resCheckoutPayments: ResCheckoutPayments | undefined;
    setResCheckoutPayments: (data: ResCheckoutPayments) => void;
}

export const useState_ResCheckoutPayments = create<State_ResCheckoutPayments>((set) => ({
    resCheckoutPayments_List: {
        data: []
    },
    setResCheckoutPayments_List: (data) => set({ resCheckoutPayments_List: data }),
    resCheckoutPayments: undefined,
    setResCheckoutPayments: (data) => set({ resCheckoutPayments: data })
}))

// Stripe
interface State_ResStripe {
    resStripe: ResStripe | undefined;
    setResStripe: (data: ResStripe) => void;
    resStripe_CreateSetupIntent: ResStripe_CreateSetupIntent | undefined;
    setResStripe_CreateSetupIntent: (data: ResStripe_CreateSetupIntent) => void;
}

export const useState_ResStripe = create<State_ResStripe>((set) => ({
    resStripe: undefined,
    setResStripe: (data) => set({ resStripe: data }),
    resStripe_CreateSetupIntent: undefined,
    setResStripe_CreateSetupIntent: (data) => set({ resStripe_CreateSetupIntent: data })
}))

// Adyen
interface State_ResAdyen {
    resAdyen: ResAdyen | undefined;
    setResAdyen: (data: ResAdyen) => void;
}

export const useState_ResAdyen = create<State_ResAdyen>((set) => ({
    resAdyen: undefined,
    setResAdyen: (data) => set({ resAdyen: data })
}))

// Products
interface State_ResProducts {
    resProducts_List: ResProduct_ListAll | undefined;
    setResProducts_List: (data: ResProduct_ListAll) => void;
    resProduct_Retrieve: ResProduct_Retrieve | undefined;
    setResProduct_Retrieve: (data: ResProduct_Retrieve) => void;
    // sale
    resProducts_SaleList: ResProduct_ListAll | undefined;
    setResProducts_SaleList: (data: ResProduct_ListAll) => void;
    // new arrivals
    resProducts_NewList: ResProduct_ListAll | undefined;
    setResProducts_NewList: (data: ResProduct_ListAll) => void;
}

export const useState_ResProducts = create<State_ResProducts>((set) => ({
    resProducts_List: undefined,
    setResProducts_List: (data) => set({ resProducts_List: data }),
    resProduct_Retrieve: undefined,
    setResProduct_Retrieve: (data) => set({ resProduct_Retrieve: data }),
    // sale
    resProducts_SaleList: undefined,
    setResProducts_SaleList: (data) => set({ resProducts_SaleList: data }),
    // new
    resProducts_NewList: undefined,
    setResProducts_NewList: (data) => set({ resProducts_NewList: data }),
}))

// Vendors
interface State_ResVendors {
    resVendors_List: ResVendors_ListAll | undefined;
    setResVendors_List: (data: ResVendors_ListAll) => void;
    resVendors_Retrieve: ResVendors_Retrieve | undefined;
    setResVendors_Retrieve: (data: ResVendors_Retrieve) => void;
}

export const useState_ResVendors = create<State_ResVendors>((set) => ({
    resVendors_List: undefined,
    setResVendors_List: (data) => set({ resVendors_List: data }),
    resVendors_Retrieve: undefined,
    setResVendors_Retrieve: (data) => set({ resVendors_Retrieve: data })
}))

// Stores
interface State_ResStores {
    resStores: ResStore | undefined;
    setResStores: (data: ResStore) => void;
}

export const useState_ResStores = create<State_ResStores>((set) => ({
    resStores: undefined,
    setResStores: (data) => set({ resStores: data }),
}))

// Policies
interface State_ResPolicies {
    resPolicies_List: ResPolicies_ListAll | undefined;
    setResPolicies_List: (data: ResPolicies_ListAll) => void;
    resPolicies_Retrieve: ResPolicies_Retrieve | undefined;
    setResPolicies_Retrieve: (data: ResPolicies_Retrieve) => void;
}

export const useState_ResPolicies = create<State_ResPolicies>((set) => ({
    resPolicies_List: undefined,
    setResPolicies_List: (data) => set({ resPolicies_List: data }),
    resPolicies_Retrieve: undefined,
    setResPolicies_Retrieve: (data) => set({ resPolicies_Retrieve: data })
}))

// posts
interface State_ResPosts {
    resPosts_List: ResPosts_ListAll | undefined;
    setResPosts_List: (data: ResPosts_ListAll) => void;
    resPosts_Retrieve: ResPosts_Retrieve | undefined;
    setResPosts_Retrieve: (data: ResPosts_Retrieve) => void;
}

export const useState_ResPosts = create<State_ResPosts>((set) => ({
    resPosts_List: undefined,
    setResPosts_List: (data) => set({ resPosts_List: data }),
    resPosts_Retrieve: undefined,
    setResPosts_Retrieve: (data) => set({ resPosts_Retrieve: data })
}))

// Post Categories
interface State_ResPostCategories {
    resPostCategories_List: ResPostCategories_ListAll | undefined;
    setResPostCategories_List: (data: ResPostCategories_ListAll) => void;
    resPostCategories_Retrieve: ResPostCategories_Retrieve | undefined;
    setResPostCategories_Retrieve: (data: ResPostCategories_Retrieve) => void;
}

export const useState_ResPostCategories = create<State_ResPostCategories>((set) => ({
    resPostCategories_List: undefined,
    setResPostCategories_List: (data) => set({ resPostCategories_List: data }),
    resPostCategories_Retrieve: undefined,
    setResPostCategories_Retrieve: (data) => set({ resPostCategories_Retrieve: data })
}))

// Taxons
interface State_ResTaxons {
    resTaxons_List: ResTaxons_ListAll | undefined;
    setResTaxons_List: (data: ResTaxons_ListAll) => void;
    resTaxons_Retrieve: ResTaxons_Retrieve | undefined;
    setResTaxons_Retrieve: (data: ResTaxons_Retrieve) => void;
}

export const useState_ResTaxons = create<State_ResTaxons>((set) => ({
    resTaxons_List: undefined,
    setResTaxons_List: (data) => set({ resTaxons_List: data }),
    resTaxons_Retrieve: undefined,
    setResTaxons_Retrieve: (data) => set({ resTaxons_Retrieve: data })
}))

// Countries
interface State_ResCountries {
    resCountries_List: ResCountries_ListAll | undefined;
    setResCountries_List: (data: ResCountries_ListAll) => void;
    resCountries_Retrieve: ResCountries_Retrieve | undefined;
    setResCountries_Retrieve: (data: ResCountries_Retrieve) => void;
    resCountryDefault: ResCountryDefault | undefined;
    setResCountryDefault: (data: ResCountryDefault) => void
}

export const useState_ResCountries = create<State_ResCountries>((set) => ({
    resCountries_List: undefined,
    setResCountries_List: (data) => set({ resCountries_List: data }),
    resCountries_Retrieve: undefined,
    setResCountries_Retrieve: (data) => set({ resCountries_Retrieve: data }),
    resCountryDefault: undefined,
    setResCountryDefault: (data) => set({ resCountryDefault: data }),
}))

// Wishlists
interface State_ResWishlists {
    resWishlists_List: ResWishlists_ListAll | undefined;
    setResWishlists_List: (data: ResWishlists_ListAll) => void;
    resWishlists: ResWishlists | undefined;
    setResWishlists: (data: ResWishlists) => void;
}

export const useState_ResWishlists = create<State_ResWishlists>((set) => ({
    resWishlists_List: undefined,
    setResWishlists_List: (data) => set({ resWishlists_List: data }),
    resWishlists: undefined,
    setResWishlists: (data) => set({ resWishlists: data })
}))

// Wishlists / Wished Items
interface State_ResWishlistsWishedItems {
    resWishlistsWishedItems: ResWishlistsWishedItems | undefined;
    setResWishlistsWishedItems: (data: ResWishlistsWishedItems) => void;
}

export const useState_ResWishlistsWishedItems = create<State_ResWishlistsWishedItems>((set) => ({
    resWishlistsWishedItems: undefined,
    setResWishlistsWishedItems: (data) => set({ resWishlistsWishedItems: data }),
}))