import api from "./api";
// import axios, { type AxiosResponse } from "axios";

// Cart and Checkout Using X-Spree-Order-Token header
// Account, Cart and Checkout For signed in users
// account-address
export const ListAccountAddress = () => api.get(`/api/v2/storefront/account/addresses`)
export const CreateAccountAddress = () => api.post(`/api/v2/storefront/account/addresses`)
export const RemoveAnAddress = (id: number) => api.delete(`/api/v2/storefront/account/addresses/${id}`)
export const UpdateAnAddress = (id: number) => api.patch(`/api/v2/storefront/account/addresses/${id}`)

// account-credit-cards
export const ListAllCreditCards = () => api.get(`/api/v2/storefront/account/credit_cards`)
export const RemoveACreditCard = (id: number) => api.delete(`/api/v2/storefront/account/credit_cards/${id}`)
export const RetrieveTheDefaultCreditCard = () => api.get(`/api/v2/storefront/account/credit_cards/default`)

// account-orders
export const ListAllOrders = () => api.get(`/api/v2/storefront/account/orders`)
export const RetriebeAnOrder = (order_number: number) => api.get(`/api/v2/storefront/account/orders/${order_number}`)

// account
export const CreateAnAccount = () => api.post(`/api/v2/storefront/account`)
export const RetrieveAnAccount = () => api.get(`/api/v2/storefront/account`)
export const UpdateAnAccount = () => api.patch(`/api/v2/storefront/account`)

// adyen
export const CreateAnAdyenPaymentSession = () => api.post(`/api/v2/storefront/adyen/payment_sessions`)
export const GetAdyenPaymentSession = (id: string) => api.get(`/api/v2/storefront/adyen/payment_sessions/${id}`)

// cart-coupons
export const ApplyACouponCode = () => api.patch(`/api/v2/storefront/cart/apply_coupon_code`)
export const RemoveACoupon = (coupon_code: number) => api.delete(`/api/v2/storefront/cart/remove_coupon_code/${coupon_code}`)
export const RemoveAllCoupon = () => api.delete(`/api/v2/storefront/cart/remove_coupon_code`)

// cart-line-items
export const AddAnItemToCart = () => api.post(`/api/v2/storefront/cart/add_item`)
export const RemoveAnItemToCart = (id: number) => api.delete(`/api/v2/storefront/cart/remove_line_item/${id}`)
export const SetLineItemQuantity = () => api.patch(`/api/v2/storefront/cart/set_quantity`)

// cart-other
export const AssociateACartWithAUser = () => api.patch(`/api/v2/storefront/cart/associate`)
export const ChangeCartCurrency = () => api.patch(`/api/v2/storefront/cart/change_currency`)
export const EmptyTheCart = () => api.patch(`/api/v2/storefront/cart/empty`)
export const ListEstimatedShippingRates = () => api.get(`/api/v2/storefront/cart/estimate_shipping_rates`)

// cart
export const CreateACart = () => api.post(`/api/v2/storefront/cart`)
export const DeleteACart = () => api.delete(`/api/v2/storefront/cart`)
export const RetrieveACart = () => api.get(`/api/v2/storefront/cart`)

// checkout-payments
export const CreateNewPayment = () => api.post(`/api/v2/storefront/checkout/create_payment`)
export const ListPaymentMethods = () => api.get(`/api/v2/storefront/checkout/payment_methods`)

// checkout-shipments
export const ListShippingRates = () => api.get(`/api/v2/storefront/checkout/shipping_rates`)
export const SelectShippingMethodForShipments = () => api.patch(`/api/v2/storefront/checkout/select_shipping_method`)

// checkout-state
export const AdvanceCheckout = () => api.patch(`/api/v2/storefront/checkout/advance`)
export const ComplateCheckout = () => api.patch(`/api/v2/storefront/checkout/complete`)
export const NextCheckoutStep = () => api.patch(`/api/v2/storefront/checkout/next`)

// checkout-store-credit
export const AddStoreCredit = () => api.post(`/api/v2/storefront/checkout/add_store_credit`)
export const RemoveStoreCredit = () => api.post(`/api/v2/storefront/checkout/remove_store_credit`)

// checkout
export const UpdateCheckOut = () => api.patch(`/api/v2/storefront/checkout`)
export const ValidateOrderPayment = () => api.post(`/api/v2/storefront/checkout/validate_order_for_payment`)

// countries
export const GetDefaultCountry = () => api.get(`/api/v2/storefront/countries/default`)
export const ListAllCountries = () => api.get(`/api/v2/storefront/countries`)
export const RetrieveAContry = (iso: number) => api.get(`/api/v2/storefront/countries/${iso}`)

// digital-downloads
export const DownloadADigitalAsset = (token: string) => api.get(`/api/v2/storefront/digitals/${token}`)

// order-status
export const RetrieveAnOrderStatus = (order_number: number) => api.get(`/api/v2/storefront/order_status/${order_number}`)

// policies
export const ListAllStorePolicies = () => api.get(`/api/v2/storefront/policies`)
export const RetrieveAPolicy = (policy_slug: string) => api.get(`/api/v2/storefront/policies/${policy_slug}`)

// post-categories
export const ListAllPostCategories = () => api.get(`/api/v2/storefront/post_categories`)
export const RetrieveAPostCategory = (id: number) => api.get(`/api/v2/storefront/post_categories/${id}`)

// posts
export const ListAllPost = () => api.get(`/api/v2/storefront/posts`)
export const RetrieveAPost = (id: number) => api.get(`/api/v2/storefront/posts/${id}`)

// products
export const ListAllProducts = () => api.get(`/api/v2/storefront/products`)
export const RetrieveAProduct = (product_slug: string) => api.get(`/api/v2/storefront/products/${product_slug}`)

// variants
export const ListAllProductVariants = (product_slug: string) => api.get(`/api/v2/storefront/products/${product_slug}/variants`)

// stores
export const ReturnTheCurrentStore = () => api.get(`/api/v2/storefront/store`)

// stripe
export const ReturnAStripePaymentIntent = (id: number) => api.get(`/api/v2/storefront/stripe/payment_intents/${id}`)
export const UpdatesStripePaymentIntent = (id: number) => api.patch(`/api/v2/storefront/stripe/payment_intents/${id}`)
export const CreateAStripePaymentIntent = () => api.post(`/api/v2/storefront/stripe/payment_intents`)
export const CreateAStripeSetupIntent = () => api.post(`/api/v2/storefront/stripe/setup_intents`)
export const MarkThePaymentIntentAsConfirmedAndMoveTheOrderToTheCompleteState = (id: number) => api.patch(`/api/v2/storefront/stripe/payment_intents/${id}/confirm`)

// taxons
export const ListAllTaxons = () => api.get(`/api/v2/storefront/taxons`)
export const RetrieveATaxon = (taxon_permalink: string) => api.get(`/api/v2/storefront/taxons/${taxon_permalink}`)

// vendors
export const ListAllVendors = () => api.get(`/api/v2/storefront/vendors`)
export const RetrieveAVendor = (vendor_slug: string) => api.get(`/api/v2/storefront/vendors/${vendor_slug}`)

// wishlists-wished-items
export const AddItemToWishlist = (token: string) => api.post(`/api/v2/storefront/wishlists/${token}/add_item`) //1
export const AddItemsToWishlist = (token: string) => api.post(`/api/v2/storefront/wishlists/{token}/add_items`) //all
export const DeleteItemFromWishlist = (token: string, item_id: number) => api.delete(`/api/v2/storefront/wishlists/${token}/remove_item/${item_id}`) //1
export const DeleteItemsFromWishlist = (token: string) => api.delete(`/api/v2/storefront/wishlists/${token}/remove_items`) //all
export const SetWishedItemQuantity = (token: string, item_id: number) => api.patch(`/api/v2/storefront/wishlists/${token}/set_item_quantity/${item_id}`)

// wishlists
export const CreateAWishlist = () => api.post(`/api/v2/storefront/wishlists`)
export const DeleteAWishlist = (token: string) => api.delete(`/api/v2/storefront/wishlists/${token}`)
export const ListAllWishlists = () => api.get(`/api/v2/storefront/wishlists`)
export const RetrieveAWishlist = (token: string) => api.get(`/api/v2/storefront/wishlists/${token}`)
export const RetrieveTheDefaultWishlist = () => api.get(`/api/v2/storefront/wishlists/default`)
export const UpdateAWishlist = (token: string) => api.patch(`/api/v2/storefront/wishlists/${token}`)


// export const ListProductPage = (page: number, per_page: number) => api.get(`/api/v2/storefront/products?page=${page}&per_page=${per_page}`)

// export const ListProductFilter = (
//     filter_price?: number,
//     filter_name?: string
// ) =>
//     api.get(`/api/v2/storefront/products?filter[price]=${filter_price}&filter[name]=${filter_name}`)

// export const ListProductFilterSkus = (product_slug: string) => api.get(`/api/v2/storefront/products?filter[skus]=${product_slug}`)

// export const ListFetchingMultipleResources = (product_slug: string, include: string) => api.get(`/api/v2/storefront/products/${product_slug}?include=${include}`)

// export const ListNestedResources = (product_slug: string) => api.get(`/api/v2/storefront/products/${product_slug}?include=variants.option_values`) //include=variants.option_values