import { ColorOption, IncludedImage, IncludedItem, IncludedVariant, IncludedTaxon, PriceInfo } from '@/interface/interface';
import { Product } from '@/interface/responseData/interfaceStorefront';
import { IconButton } from '@mui/material';
import type { SxProps, Theme } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import React, { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';

interface ProductCardProps {
    products: Product[];
    included: IncludedItem[]
}

const fly1 = keyframes`
  from { transform: translateY(0.1em); }
  to   { transform: translateY(-0.1em); }
`;

const ListProductCard: React.FC<ProductCardProps> = ({ products, included }) => {
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
    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
    const [hoveredColor, setHoveredColor] = useState<Record<string, string>>({});
    // Hàm tìm hình ảnh theo ID
    const findImageById = (imageId: string): IncludedImage | undefined => {
        return included.find((item): item is IncludedImage =>
            item.type === 'image' && item.id === imageId
        );
    };

    const findTaxon = (TaxonId: string): IncludedTaxon | undefined => {
        return included.find((item): item is IncludedTaxon =>
            item.type === 'taxon' && item.id === TaxonId
        )
    }

    // Hàm tìm variant theo ID
    const findVariantById = (variantId: string): IncludedVariant | undefined => {
        return included.find((item): item is IncludedVariant =>
            item.type === 'variant' && item.id === variantId
        );
    };

    const getProductTaxonNames = (product: Product): string[] => {
        const taxonNames: string[] = [];

        product.relationships.taxons.data.forEach(taxonRef => {
            const taxon = findTaxon(taxonRef.id);
            if (taxon) {
                taxonNames.push(taxon.attributes.name);
            }
        });

        return taxonNames;
    };

    // const getPrimaryTaxonName = (product: Product): string | null => {
    //     const taxonNames = getProductTaxonNames(product);
    //     return taxonNames.length > 0 ? taxonNames[0] : null;
    // };

    // Hàm kiểm tra nếu sản phẩm có taxon "New Arrivals"
    const isNewArrival = (product: Product): boolean => {
        const taxonNames = getProductTaxonNames(product);
        return taxonNames.includes('New Arrivals');
    };

    // Hàm lấy URL hình ảnh chính cho sản phẩm
    const getPrimaryImageUrl = (product: Product): string | null => {
        const imageRelationship = product.relationships.images.data[0];
        if (!imageRelationship) return null;

        const image = findImageById(imageRelationship.id);
        if (!image) return null;

        // Ưu tiên ảnh medium hoặc small, fallback về original
        const mediumStyle = image.attributes.styles.find(style => style.size === '350x468>');
        const smallStyle = image.attributes.styles.find(style => style.size === '240x240>');

        return mediumStyle?.url || smallStyle?.url || image.attributes.original_url;
    };

    // Hàm lấy thông tin giá và discount
    const getPriceInfo = (product: Product): PriceInfo => {
        const price = parseFloat(product.attributes.price);
        const comparePrice = product.attributes.compare_at_price
            ? parseFloat(product.attributes.compare_at_price)
            : null;

        const discount = comparePrice && comparePrice > price
            ? Math.round(((comparePrice - price) / comparePrice) * 100)
            : 0;

        return {
            price,
            comparePrice,
            discount
        };
    };

    // Hàm lấy danh sách variants
    const getVariants = (product: Product): IncludedVariant[] => {
        return product.relationships.variants.data.map(variantRef => {
            const variant = findVariantById(variantRef.id);
            return variant;
        }).filter((v): v is IncludedVariant => v !== undefined);
    };

    // Hàm gộp các variant theo màu sắc
    const getColorOptions = (product: Product): ColorOption[] => {
        const variants = getVariants(product);
        const colorMap = new Map<string, ColorOption>();

        variants.forEach(variant => {
            const colorOption = variant.attributes.options.find(opt => opt.name === 'color');
            // const sizeOption = variant.attributes.options.find(opt => opt.name === 'size');

            if (colorOption) {
                const colorKey = colorOption.value;
                if (!colorMap.has(colorKey)) {
                    colorMap.set(colorKey, {
                        color: colorKey,
                        colorPresentation: colorOption.presentation,
                        variants: []
                    });
                }
                colorMap.get(colorKey)!.variants.push(variant);
            }
        });

        return Array.from(colorMap.values());
    };

    // Hàm xử lý khi chọn màu
    const handleColorSelect = (productId: string, color: string) => {
        setSelectedVariants(prev => ({
            ...prev,
            [productId]: color
        }));
    };

    // Hàm lấy variant được chọn
    // const getSelectedVariant = (product: Product): IncludedVariant | undefined => {
    //     const selectedColor = selectedVariants[product.id];
    //     if (!selectedColor) return undefined;

    //     const variants = getVariants(product);
    //     return variants.find(variant =>
    //         variant.attributes.options.some(opt =>
    //             opt.name === 'color' && opt.value === selectedColor
    //         )
    //     );
    // };

    // Hàm xử lý lỗi hình ảnh
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmM2YzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
    };

    if (products.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 text-lg">There are no products</p>
            </div>
        );
    }

    const getImageByColor = (product: Product, color: string): string | null => {
        const variants = getVariants(product);

        // Tìm variant có màu này
        const variantWithColor = variants.find(variant =>
            variant.attributes.options.some(opt =>
                opt.name === 'color' && opt.value === color
            )
        );

        if (!variantWithColor) return null;

        // Lấy hình ảnh từ variant
        const imageRelationship = variantWithColor.relationships.images.data[0];
        if (!imageRelationship) return null;

        const image = findImageById(imageRelationship.id);
        if (!image) return null;

        // Ưu tiên ảnh medium hoặc small
        const mediumStyle = image.attributes.styles.find(style => style.size === '350x468>');
        const smallStyle = image.attributes.styles.find(style => style.size === '240x240>');

        return mediumStyle?.url || smallStyle?.url || image.attributes.original_url;
    };

    // Hàm xử lý hover vào color option
    const handleColorHover = (productId: string, color: string) => {
        setHoveredColor(prev => ({
            ...prev,
            [productId]: color
        }));
    };

    // Hàm xử lý khi rời khỏi color option
    const handleColorLeave = (productId: string) => {
        setHoveredColor(prev => ({
            ...prev,
            [productId]: ''
        }));
    };

    // Hàm lấy hình ảnh hiển thị (ưu tiên hình ảnh theo màu đang hover, fallback về hình ảnh chính)
    const getDisplayImage = (product: Product): string | null => {
        const productId = product.id;
        const hoveredColorForProduct = hoveredColor[productId];

        if (hoveredColorForProduct) {
            const colorImage = getImageByColor(product, hoveredColorForProduct);
            if (colorImage) return colorImage;
        }

        return getPrimaryImageUrl(product);
    };


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {products.map((product) => {
                const priceInfo = getPriceInfo(product);
                const colorOptions = getColorOptions(product);
                const selectedColor = selectedVariants[product.id];
                const isNew = isNewArrival(product);
                const displayImage = getDisplayImage(product);
                return (
                    <div
                        key={product.id}
                        className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col overflow-hidden"
                    >
                        {/* --- Product Image --- */}
                        <div className="relative h-71 overflow-hidden">
                            {/* {imageUrl ? ( */}
                            {displayImage ? (
                                <img
                                    src={displayImage}
                                    alt={product.attributes.name}
                                    onError={handleImageError}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                    No Image
                                </div>
                            )}

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                            {/* Badges */}
                            <div className="absolute -top-[3px] -left-[3px]  w-[85px] h-[85px]">
                                {isNew && (
                                    <span className=" text-xs font-semibold shadow text-center -rotate-45 relative py-[7px] -left-[30px] top-[15px] w-[120px] 
        bg-gradient-to-b from-green-500 to-green-800 text-white
        shadow-[0_0_3px_rgba(0,0,0,0.3)] block">
                                        New
                                    </span>
                                )}
                                {priceInfo.discount > 0 && (
                                    <span className="text-xs font-semibold shadow text-center -rotate-45 relative py-[7px] -left-[30px] top-[15px] w-[120px] 
        bg-gradient-to-b from-red-500 to-red-800 text-white
        shadow-[0_0_3px_rgba(0,0,0,0.3)] block">
                                        -{priceInfo.discount}%
                                    </span>
                                )}
                            </div>

                            {/* Out of stock */}
                            {!product.attributes.in_stock && (
                                <span className="absolute top-3 right-3 bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow z-10">
                                    Out of stock
                                </span>
                            )}

                            {/* Hover favorite button */}
                            <button aria-label='click heart'
                                className="absolute bottom-3 right-3 bg-white/90 hover:bg-green-500 text-gray-800 hover:text-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                            >
                                <FaRegHeart className="text-lg" />
                            </button>
                        </div>

                        {/* --- Product Info --- */}
                        <div className="flex flex-col gap-3 p-5 flex-grow ">
                            {/* Tên sản phẩm */}
                            <h3 className="font-semibold text-gray-900 text-base line-clamp-2 group-hover:text-green-600 transition-colors">
                                {product.attributes.name}
                            </h3>

                            {colorOptions.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {colorOptions.map((colorOption) => (
                                        <label
                                            key={colorOption.color}
                                            className="flex items-center cursor-pointer group relative"
                                            onMouseEnter={() => handleColorHover(product.id, colorOption.color)}
                                            onMouseLeave={() => handleColorLeave(product.id)}
                                        >
                                            <button
                                                key={colorOption.color}
                                                aria-label="select color"
                                                onClick={() => handleColorSelect(product.id, colorOption.color)}
                                                className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${selectedColor === colorOption.color
                                                    ? 'border-green-600'
                                                    : 'border-gray-300'
                                                    }`}
                                                style={{
                                                    background: colorOption.colorPresentation,
                                                }}
                                            ></button>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {/* Giá sản phẩm */}
                            <div className="flex justify-between items-center mt-auto">
                                <div className="flex items-center gap-2">
                                    {priceInfo.discount > 0 ? (
                                        <>
                                            <span className="text-lg font-bold text-green-700">
                                                ${priceInfo.price}
                                            </span>
                                            <span className="text-sm text-gray-400 line-through">
                                                ${priceInfo.comparePrice}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-lg font-bold text-green-700">
                                            ${priceInfo.price}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                );
            })}
        </div>
    );
};

export default ListProductCard;