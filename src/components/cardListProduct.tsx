import { ColorOption, IncludedImage, IncludedItem, IncludedVariant, IncludedTaxon, PriceInfo } from '@/interface/interface';
import { Product } from '@/interface/responseData/interfaceStorefront';
import React, { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';

interface ProductCardProps {
    products: Product[];
    included: IncludedItem[]
}

const ListProductCard: React.FC<ProductCardProps> = ({ products, included }) => {
    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
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

    const getPrimaryTaxonName = (product: Product): string | null => {
        const taxonNames = getProductTaxonNames(product);
        return taxonNames.length > 0 ? taxonNames[0] : null;
    };

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
            const sizeOption = variant.attributes.options.find(opt => opt.name === 'size');

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
    const getSelectedVariant = (product: Product): IncludedVariant | undefined => {
        const selectedColor = selectedVariants[product.id];
        if (!selectedColor) return undefined;

        const variants = getVariants(product);
        return variants.find(variant =>
            variant.attributes.options.some(opt =>
                opt.name === 'color' && opt.value === selectedColor
            )
        );
    };

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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {products.map((product) => {
                const imageUrl = getPrimaryImageUrl(product);
                const priceInfo = getPriceInfo(product);
                const colorOptions = getColorOptions(product);
                const selectedVariant = getSelectedVariant(product);
                const selectedColor = selectedVariants[product.id];
                const taxonNames = getProductTaxonNames(product);
                const primaryTaxonName = getPrimaryTaxonName(product);
                const isNew = isNewArrival(product);
                return (
                    <div
                        key={product.id}
                        className="grid gap-5 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                        <div>
                            {/* Hình ảnh sản phẩm */}
                            <div className="relative h-64 overflow-hidden">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={product.attributes.name}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        onError={handleImageError}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                        <span className="text-gray-400">No Image</span>
                                    </div>
                                )}

                                {/* Badge giảm giá */}
                                {/* {priceInfo.discount > 0 && (
                                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                                        -{priceInfo.discount}%
                                    </div>
                                )} */}

                                {isNew && (
                                    <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-md text-sm font-bold">
                                        New
                                    </div>
                                )}

                                {/* Badge giảm giá */}
                                {priceInfo.discount > 0 && (
                                    <div className={`absolute top-3 ${isNew ? 'left-20' : 'left-3'} bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold`}>
                                        -{priceInfo.discount}%
                                    </div>
                                )}

                                {/* Badge taxon (danh mục) */}
                                {/* {primaryTaxonName && !isNew && (
                                    <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                                        {primaryTaxonName}
                                    </div>
                                )} */}

                                {/* Badge trạng thái */}
                                {!product.attributes.in_stock && (
                                    <div className="absolute top-3 right-3 bg-gray-600 text-white px-2 py-1 rounded-md text-sm font-bold">
                                        Out of stock
                                    </div>
                                )}
                            </div>

                            {/* Thông tin sản phẩm */}
                            <div className="p-[20px_20px_0_20px] flex flex-col gap-3">
                                {/* Tên sản phẩm */}
                                <h3 className="font-semibold text-gray-800 line-clamp-2">
                                    {product.attributes.name}
                                </h3>

                                {/* Giá sản phẩm */}
                                <div className="flex items-center gap-2">
                                    {priceInfo.discount > 0 ? (
                                        <>
                                            <span className="text-xl font-bold text-blue-700">
                                                ${priceInfo.price}
                                            </span>
                                            <span className="text-sm text-gray-500 line-through">
                                                ${priceInfo.comparePrice}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-xl font-bold text-blue-700">
                                            ${priceInfo.price}
                                        </span>
                                    )}
                                </div>
                                {/* {taxonNames.length > 0 && (
                                    <div className="mb-2">
                                        <div className="flex flex-wrap gap-1">
                                            {taxonNames.map((taxonName, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                                                >
                                                    {taxonName}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )} */}

                                {/* Variants */}
                                {/* Lựa chọn màu sắc */}
                                {colorOptions.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {colorOptions.map((colorOption) => (
                                            <button
                                                key={colorOption.color} aria-label='select color'
                                                className="btn-color  flex items-center cursor-pointer border border-gray-300 p-[3px] rounded-full"

                                                onClick={() => handleColorSelect(product.id, colorOption.color)}
                                            >
                                                <span className={`w-[16px] h-[16px] rounded-full shadow-sm`}
                                                    style={{
                                                        background: `${colorOption.colorPresentation}`
                                                    }}
                                                ></span>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Hiển thị kích thước có sẵn cho màu đã chọn */}
                                {selectedVariant && (
                                    <div className="">
                                        <div className="text-xs text-gray-600 mb-2">Size available:</div>
                                        <div className="flex flex-wrap gap-1">
                                            {colorOptions
                                                .find(opt => opt.color === selectedColor)
                                                ?.variants.map(variant => {
                                                    const sizeOption = variant.attributes.options.find(opt => opt.name === 'size');
                                                    return (
                                                        <span
                                                            key={variant.id}
                                                            className={`
                              px-2 py-1 rounded text-xs border
                              ${variant.attributes.in_stock
                                                                    ? 'bg-green-100 text-green-800 border-green-200'
                                                                    : 'bg-gray-100 text-gray-500 border-gray-200 line-through'
                                                                }
                            `}
                                                        >
                                                            {sizeOption?.presentation}
                                                            {!variant.attributes.in_stock && ' (Hết)'}
                                                        </span>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Trạng thái và nút hành động */}
                        <div className="flex items-center self-end gap-4 p-[0_20px_20px_20px]">
                            <button className='border border-green-600 text-green-600 p-2 rounded-lg' aria-label='heart click'>
                                <span className='text-xl max-md:text-xl svgWrapper'>
                                    <FaRegHeart className="mx-auto" />
                                </span>
                            </button>
                            <button
                                className={`px-4 flex justify-center gap-4 py-2 w-full rounded-lg font-medium transition-colors ${product.attributes.in_stock
                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                disabled={!product.attributes.in_stock}
                            >
                                <span className=' text-xl max-md:text-xl'>
                                    <MdOutlineShoppingCart className="mx-auto" />
                                </span>
                                {product.attributes.in_stock ? 'Add cart' : 'Out of stock'}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ListProductCard;