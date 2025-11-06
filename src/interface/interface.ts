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