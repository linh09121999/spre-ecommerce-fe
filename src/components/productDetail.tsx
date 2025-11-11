import { ColorOption, IncludedImage, IncludedItem, IncludedVariant, IncludedTaxon, PriceInfo, IncludedOptionType, IncludedProductProperty } from '@/interface/interface';
import { Product, ResProduct_Retrieve } from '@/interface/responseData/interfaceStorefront';
import { IconButton } from '@mui/material';
import type { SxProps, Theme } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
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
    React.useEffect(() => {
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
                variant: selectedVariant,
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

    return (
        <>
            <>
                {/* Breadcrumb */}
                {/* <nav className="flex items-center space-x-2 px-6 py-4 border-b border-gray-200 text-sm text-gray-600">
                        <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
                        <span>/</span>
                        <a href="/categories" className="hover:text-gray-900 transition-colors">Categories</a>
                        <span>/</span>
                        <a href="/categories/fashion" className="hover:text-gray-900 transition-colors">Fashion</a>
                        <span>/</span>
                        <a href="/categories/fashion/men" className="hover:text-gray-900 transition-colors">Men</a>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{data.attributes.name}</span>
                    </nav> */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                            {mainImage && (
                                <img
                                    src={mainImage.attributes.original_url}
                                    alt={data?.attributes.name}
                                    className="w-full h-full object-cover object-center"
                                />
                            )}
                        </div>
                        <div className="flex space-x-2 overflow-x-auto pb-2">
                            {displayImages.map((image, index) => (
                                <button
                                    key={image.id}
                                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${index === selectedImageIndex
                                        ? 'border-blue-500 ring-2 ring-blue-200'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => setSelectedImageIndex(index)}
                                >
                                    <img
                                        src={image.attributes.styles[2]?.url || image.attributes.original_url}
                                        alt={`${data?.attributes.name} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold text-gray-900">{data?.attributes.name}</h1>

                        {/* Price */}
                        {/* <div className="flex items-center space-x-4">
                                {hasDiscount && (
                                    <span className="text-xl text-gray-500 line-through">
                                        {data.attributes.display_compare_at_price}
                                    </span>
                                )}
                                <span className="text-2xl font-bold text-red-600">
                                    {selectedVariant?.attributes.display_price || data.attributes.display_price}
                                </span>
                                {hasDiscount && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        Save {(
                                            (parseFloat(data.attributes.compare_at_price) - parseFloat(data.attributes.price)) /
                                            parseFloat(data.attributes.compare_at_price) * 100
                                        ).toFixed(0)}%
                                    </span>
                                )}
                            </div> */}
                        <div className="flex items-center space-x-4">
                            {data && data.attributes && priceInfo(data.attributes.price, data.attributes.compare_at_price) > 0 && (
                                <span className="text-[11px] font-semibold px-3 py-[4px] rounded-full bg-gradient-to-r from-rose-500 to-red-700 text-white shadow-md backdrop-blur-md">
                                    -{priceInfo(data.attributes.price, data.attributes.compare_at_price)}%
                                </span>
                            )}
                        </div>

                        {/* Options */}
                        <div className="space-y-4">
                            {optionTypes.map(optionType => (
                                <div key={optionType.id} className="space-y-3">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {optionType.attributes.presentation}:
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.from(availableOptions[optionType.attributes.name] || []).map(optionValue => {
                                            const option = variants
                                                .flatMap(v => v.attributes.options)
                                                .find(o => o.name === optionType.attributes.name && o.value === optionValue);

                                            return (
                                                <button
                                                    key={optionValue}
                                                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-all ${selectedOptions[optionType.attributes.name] === optionValue
                                                        ? 'bg-blue-500 text-white border-blue-500'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                    onClick={() => handleOptionChange(optionType.attributes.name, optionValue)}
                                                >
                                                    {option?.presentation || optionValue}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center">
                            {selectedVariant?.attributes.in_stock ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    In Stock
                                </span>
                            ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 bg-white min-w-12 text-center font-medium">{quantity}</span>
                                <button
                                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>

                            <button
                                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                                onClick={handleAddToCart}
                                disabled={!selectedVariant?.attributes.in_stock || !selectedVariant?.attributes.purchasable}
                            >
                                {selectedVariant?.attributes.in_stock ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>

                        {/* Product Properties */}
                        {productProperties.length > 0 && (
                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
                                {productProperties.map(property => (
                                    <div key={property.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                                        <span className="text-sm font-medium text-gray-600">
                                            {property.attributes.description}:
                                        </span>
                                        <span className="text-sm text-gray-900">
                                            {property.attributes.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Description */}
                        <div className="prose prose-sm max-w-none">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
                            {data &&
                                <div
                                    className="text-gray-600 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: data.attributes.description }}
                                />}
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default ProductDetailCompoment