import { ColorOption, IncludedImage, IncludedItem, IncludedVariant, IncludedTaxon, PriceInfo, IncludedOptionType, IncludedProductProperty } from '@/interface/interface';
import { Product, ResProduct_Retrieve } from '@/interface/responseData/interfaceStorefront';
import { IconButton } from '@mui/material';
import type { SxProps, Theme } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { FaArrowLeft, FaBox, FaCaretSquareLeft, FaCheckCircle, FaExclamationCircle, FaRegHeart, FaShieldAlt, FaShippingFast, FaTag, FaUndo } from 'react-icons/fa';
import { FaShield } from 'react-icons/fa6';
import { MdOutlineShoppingCart } from 'react-icons/md';

const fly1 = keyframes`
  from { transform: translateY(0.1em); }
  to   { transform: translateY(-0.1em); }
`;

interface SelectedOptions {
    [key: string]: string;
}

const ProductDetailCompoment: React.FC<ResProduct_Retrieve> = ({ data, included }) => {
    const router = useRouter();
    const sxButton: SxProps<Theme> = {
        color: 'var(--color-green-500)',
        borderRadius: '100%',
        fontWeight: '600',
        fontSize: 'var(--text-xl)',
        position: "relative",
        overflow: "hidden",
        textTransform: "none",
        "&:active": { transform: "scale(0.95)" },
        "& span": {
            display: 'block',
            transition: 'all 0.3s ease-in-out'
        },
        "& svg": {
            display: 'block',
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease-in-out',
        },
        "&:hover .svgWrapper": {
            animation: `${fly1} 0.6s ease-in-out infinite alternate`,
            color: 'black'
        },
    }
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
    const [quantity, setQuantity] = useState(1);

    const variants = useMemo(() =>
        included.filter(item => item.type === 'variant') as IncludedVariant[],
        [included]
    );

    const images = useMemo(() =>
        included.filter(item => item.type === 'image') as IncludedImage[],
        [included]
    );

    const optionTypes = useMemo(() =>
        included.filter(item => item.type === 'option_type') as IncludedOptionType[],
        [included]
    );

    const productProperties = useMemo(() =>
        included.filter(item => item.type === 'product_property') as IncludedProductProperty[],
        [included]
    );

    // Get available options from variants
    const availableOptions = useMemo(() => {
        const options: { [key: string]: Set<string> } = {};

        variants.forEach(variant => {
            variant.attributes.options.forEach(option => {
                if (!options[option.name]) {
                    options[option.name] = new Set();
                }
                options[option.name].add(option.value);
            });
        });

        return options;
    }, [variants]);

    // Find selected variant based on selected options
    const selectedVariant = useMemo(() => {
        return variants.find(variant =>
            variant.attributes.options.every(option =>
                selectedOptions[option.name] === option.value
            )
        );
    }, [variants, selectedOptions]);

    // Initialize selected options
    useEffect(() => {
        if (optionTypes.length > 0 && Object.keys(selectedOptions).length === 0) {
            const initialOptions: SelectedOptions = {};
            optionTypes.forEach(optionType => {
                const optionName = optionType.attributes.name;
                const firstOption = Array.from(availableOptions[optionName] || [])[0];
                if (firstOption) {
                    initialOptions[optionName] = firstOption;
                }
            });
            setSelectedOptions(initialOptions);
        }
    }, [optionTypes, availableOptions]);

    // Get images for selected variant or all product images
    const displayImages = useMemo(() => {
        if (selectedVariant && selectedVariant.relationships.images.data.length > 0) {
            const variantImageIds = selectedVariant.relationships.images.data.map(img => img.id);
            return images.filter(img => variantImageIds.includes(img.id));
        }
        return images;
    }, [selectedVariant, images]);

    const handleOptionChange = (optionName: string, optionValue: string) => {
        setSelectedOptions(prev => ({
            ...prev,
            [optionName]: optionValue
        }));
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        if (selectedVariant) {
            // Implement add to cart logic here
            console.log('Adding to cart:', {
                variant: selectedVariant.id,
                quantity,
                options: selectedOptions
            });
        }
    };

    const mainImage = displayImages[selectedImageIndex];

    const priceInfo = (price: string, comparePrice: string | null) => {
        return comparePrice && comparePrice > price
            ? Math.round(((parseFloat(comparePrice) - parseFloat(price)) / parseFloat(comparePrice)) * 100)
            : 0;
    }

    const taxons = useMemo(() =>
        included.filter(item => item.type === 'taxon') as IncludedTaxon[],
        [included]
    );

    const longestPrettyName = taxons.reduce((longest, current) => {
        const currentPrettyName = current.attributes?.pretty_name ?? "";
        return currentPrettyName.length > longest.length ? currentPrettyName : longest;
    }, "");

    return (
        <>
            {/* Header Navigation */}
            <div className="flex items-center gap-3 px-5 max-w-[1535px] mx-auto py-4 text-lg">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 group transition-all duration-300"
                >
                    <span className="inline-flex items-center justify-center w-9 h-9 bg-white rounded-full shadow hover:shadow-lg transition-all">
                        <FaArrowLeft className="text-green-600 group-hover:-translate-x-1 transition-transform duration-300" />
                    </span>
                    <span className="font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-300">
                        {taxons && taxons.length > 0 && (
                            <span>{longestPrettyName.replace(/\s*->\s*/g, " / ")}</span>
                        )}
                    </span>
                </button>
            </div>

            {/* Product Section */}
            <div className="max-w-[1535px] mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 px-5 py-5">

                {/* Left: Images */}
                <div className="space-y-4">
                    <div
                        className="aspect-square rounded-md overflow-hidden relative group shadow-lg"
                        rounded-md="fade-up"
                    >
                        {mainImage && (
                            <img
                                src={mainImage.attributes.original_url}
                                alt={data?.attributes.name}
                                className="w-full h-full aspect-[1/1] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {displayImages.map((image, index) => (
                            <button
                                key={image.id}
                                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-x-auto scroll-x border-2 transition-all duration-300 ${index === selectedImageIndex
                                    ? "border-green-500 ring-2 ring-green-200"
                                    : "border-gray-200 hover:border-green-300"
                                    }`}
                                onClick={() => setSelectedImageIndex(index)}
                            >
                                <img
                                    src={image.attributes.styles[2]?.url || image.attributes.original_url}
                                    alt={`${data?.attributes.name} ${index + 1}`}
                                    className="w-full h-full object-cover aspect-[1/1]"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col gap-5">
                    <h1 className="text-3xl font-bold text-gray-900 leading-tight" >
                        {data?.attributes.name}
                    </h1>

                    {/* Price + Discount */}
                    {data && data.attributes && (
                        <div className="flex items-center gap-4" >

                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-bold text-green-700">
                                    ${data.attributes.price}
                                </span>
                                {data.attributes.compare_at_price && (
                                    <span className="text-lg text-gray-400 line-through">
                                        ${data.attributes.compare_at_price}
                                    </span>
                                )}
                            </div>
                            {priceInfo(data.attributes.price, data.attributes.compare_at_price) > 0 &&
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-rose-500 to-red-600 text-white shadow">
                                    -{priceInfo(data.attributes.price, data.attributes.compare_at_price)}%
                                </span>
                            }
                        </div>
                    )}

                    {/* Options */}
                    <div className="flex flex-col gap-5" rounded-md="fade-left" rounded-md-delay="200">
                        {optionTypes.map(optionType => (
                            <div key={optionType.id} className='flex flex-col gap-3'>
                                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                    {optionType.attributes.presentation}
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {Array.from(availableOptions[optionType.attributes.name] || []).map(optionValue => {
                                        const option = variants
                                            .flatMap(v => v.attributes.options)
                                            .find(o => o.name === optionType.attributes.name && o.value === optionValue);
                                        const isSelected = selectedOptions[optionType.attributes.name] === optionValue;
                                        const optionName = optionType.attributes.name.toLowerCase();

                                        if (optionName === "color" || optionName === "màu sắc") {
                                            return (
                                                <button
                                                    key={optionValue}
                                                    onClick={() => handleOptionChange(optionType.attributes.name, optionValue)}
                                                    title={optionValue}
                                                    className={`w-9 h-9 rounded-full border-2 transition-transform duration-300 ${isSelected ? "border-green-500 scale-110" : "border-gray-300 hover:scale-105"
                                                        }`}
                                                    style={{ backgroundColor: option?.presentation || optionValue }}
                                                />
                                            );
                                        }

                                        return (
                                            <button
                                                disabled={!selectedVariant?.attributes.in_stock}
                                                key={optionValue}
                                                onClick={() => handleOptionChange(optionType.attributes.name, optionValue)}
                                                className={`px-4 py-2 rounded-lg border-[1px] text-sm  transition-all duration-300 ${isSelected
                                                    ? "text-green-600 border-green-600 shadow-lg font-bold"
                                                    : "bg-white border-gray-300 text-gray-800 hover:border-green-300 font-medium"
                                                    } 
                                                         `}
                                            >
                                                {option?.presentation || optionValue}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {(data && data.attributes) &&
                        <div className="flex flex-wrap gap-4">

                            <div className="flex items-center gap-2 text-sm">
                                <FaBox className='text-green-500' />
                                <span className='flex items-center gap-1'>SKU: <strong>{data.attributes.sku}</strong></span>
                            </div>

                            {productProperties.length > 0 &&
                                <div className="flex items-center gap-2 text-sm">
                                    <FaTag className='text-green-500' />
                                    <span className='flex items-center gap-1'>Material:
                                        <strong>
                                            {productProperties.map(property => (
                                                <div key={property.id} className="flex justify-between py-2 border-b last:border-0 border-gray-200">
                                                    <span className="text-sm font-bold text-gray-900">
                                                        {property.attributes.value}
                                                    </span>
                                                </div>
                                            ))}
                                        </strong>
                                    </span>
                                </div>
                            }

                            {selectedVariant?.attributes.in_stock ? (
                                <span className="text-success flex gap-2 font-semibold items-center">
                                    <FaCheckCircle className='text-green-700' />
                                    <span className="inline-block text-xs font-semibold text-green-700">
                                        In Stock
                                    </span>
                                </span>
                            ) : (
                                <span className="text-success flex gap-2 font-semibold items-center">
                                    <FaExclamationCircle className='text-red-700' />
                                    <span className="inline-block text-xs font-semibold text-red-700 ">
                                        Out of Stock
                                    </span>
                                </span>
                            )}
                        </div>
                    }

                    {/* Quantity & Add to Cart */}
                    <div className="flex items-center gap-4 flex-wrap" >
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                            <button
                                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
                                onClick={() => handleQuantityChange(quantity - 1)}
                                disabled={quantity <= 1 && !selectedVariant?.attributes.in_stock}
                            >
                                −
                            </button>
                            <span className={` ${!selectedVariant?.attributes.in_stock ? "text-gray-300 disabled:cursor-not-allowed" : ""} px-5 py-2 bg-white text-center font-semibold `}>{quantity}</span>
                            <button
                                disabled={!selectedVariant?.attributes.in_stock}
                                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
                                onClick={() => handleQuantityChange(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className='flex gap-5 items-center'>
                        <button
                            onClick={handleAddToCart}
                            disabled={!selectedVariant?.attributes.in_stock}
                            className={`px-16 h-[50px] rounded-md bg-green-600  text-white font-semibold transition-transform ${!selectedVariant?.attributes.in_stock ? 'disabled:opacity-60' : 'hover:bg-green-700 hover:scale-105 '} `}
                        >
                            {selectedVariant?.attributes.in_stock ? "Add to Cart" : "Out of Stock"}
                        </button>

                        <button
                            aria-label="Add to Wishlist"
                            className="group px-4 h-[50px] bg-white border rounded-md border-gray-600 hover:border-green-600 transition-all hover:scale-110"
                        >
                            <FaRegHeart className="text-gray-600 text-lg group-hover:text-green-600" />
                        </button>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                        {data && <div className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.attributes.description }} />}
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 ">
                            <FaShippingFast className='text-green-500' />
                            <span className='text-sm'>Free shipping on orders over $50</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaUndo className='text-green-500' />
                            <span className='text-sm'>30-day return policy</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaShieldAlt className='text-green-500' />
                            <span className='text-sm'>2-year warranty</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetailCompoment