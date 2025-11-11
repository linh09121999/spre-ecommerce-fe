import { Product } from "./responseData/interfaceStorefront";

export interface PaginationMeta {
    count: number;
    total_count: number;
    total_pages: number;
}

interface PaginationMetaProduct_OptionType_OptionValue {
    id: number;
    name: string;
    presentation: string;
    position: number;
}

export interface PaginationMetaProduct_OptionType {
    id: number;
    name: string;
    presentation: string;
    option_values: PaginationMetaProduct_OptionType_OptionValue[];
}

export interface PaginationLinks {
    self: string;
    next: string;
    prev: string;
    last: string;
    first: string;
}

export interface Type {
    id: string;
    type: string;
}

export interface Included {
    abbr: string;
    name: string;
}

export interface Time_Attributes {
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Pages {
    id: number;
    title: string;
    path: string
}

interface Option {
    name: string;
    value: string;
    presentation: string;
}

interface VariantAttributes {
    sku: string;
    barcode: string | null;
    weight: string;
    height: number | null;
    width: number | null;
    depth: number | null;
    is_master: boolean;
    options_text: string;
    options: Option[];
    public_metadata: Record<string, unknown>;
    purchasable: boolean;
    in_stock: boolean;
    backorderable: boolean;
    currency: string;
    price: string | null;
    display_price: string | null;
    compare_at_price: string | null;
    display_compare_at_price: string | null;
}

interface RelationshipData {
    id: string;
    type: string;
}

interface Relationships {
    metafields: { data: unknown[] };
    product?: { data: RelationshipData };
    images: { data: RelationshipData[] };
    option_values?: { data: RelationshipData[] };
    parent?: { data: RelationshipData | null };
    taxonomy?: { data: RelationshipData };
    children?: { data: RelationshipData[] };
    image?: { data: RelationshipData | null };
}

export interface IncludedVariant extends Type {
    type: string;
    attributes: VariantAttributes;
    relationships: Relationships;
}

interface OptionTypeAttributes {
    name: string;
    presentation: string;
    position: number;
    public_metadata: Record<string, unknown>;
}

export interface IncludedOptionType extends Type {
    type: string;
    attributes: OptionTypeAttributes;
    relationships: Relationships;
}

interface TaxonAttributes {
    name: string;
    pretty_name: string;
    permalink: string;
    seo_title: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string | null;
    left: number;
    right: number;
    position: number;
    depth: number;
    updated_at: string;
    public_metadata: Record<string, unknown>;
    description: string;
    has_products: boolean;
    header_url: string | null;
    is_root: boolean;
    is_child: boolean;
    is_leaf: boolean;
    localized_slugs: Record<string, string>;
}

export interface IncludedTaxon extends Type {
    type: string;
    attributes: TaxonAttributes;
    relationships: Relationships;
}

interface ImageStyle {
    url: string;
    size: string;
    width: number;
    height: number;
}

interface ImageAttributes {
    transformed_url: string | null;
    styles: ImageStyle[];
    position: number;
    alt: string | null;
    original_url: string;
}

export interface IncludedImage extends Type {
    attributes: ImageAttributes;
}

interface ProductPropertyAttributes {
    value: string;
    filter_param: string;
    show_property: boolean;
    position: number;
    name: string;
    description: string
}

export interface IncludedProductProperty extends Type {
    attributes: ProductPropertyAttributes
}

export type IncludedItem = IncludedVariant | IncludedOptionType | IncludedTaxon | IncludedImage | IncludedProductProperty;

export interface PriceInfo {
    price: number;
    comparePrice: number | null;
    discount: number;
}

export interface ColorOption {
    color: string;
    colorPresentation: string;
    variants: IncludedVariant[];
}

export interface ProductCardProps {
    products: Product[];
    included: IncludedItem[]
}

export interface FilterProduct {
    id: number;
    title: string
}

export interface FilterProductColor extends FilterProduct {
    color: string
}