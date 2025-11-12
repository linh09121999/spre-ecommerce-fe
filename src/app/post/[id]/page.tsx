"use client"
import React, { useEffect, useMemo } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { useStateGeneral } from '@/useState/useStateGeneral';
import { useState_ResPosts } from '@/useState/useStatestorefront';
import { ListAllPost, RetrieveAPost } from '@/service/storefront/posts';
import { FaArrowLeft, FaCalendarAlt, FaCalendarDay, FaUser } from 'react-icons/fa';

const PostDetail: React.FC = () => {
    const router = useRouter();
    const params = useParams();  // Trả về object { id: '123' }
    const { id } = params;

    const { setLoading, setSelectNav
    } = useStateGeneral()

    const { resPosts_Retrieve, setResPosts_Retrieve, resPosts_List, setResPosts_List } = useState_ResPosts()

    const getApiPostRetrieve = async (id: string, include: string) => {
        try {
            setLoading(true);
            const res = await RetrieveAPost(id, { include })
            setResPosts_Retrieve(res.data)
        } catch (error: any) {
            toast.error(`Posts: ` + error.response.error)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const getApiPosts = async () => {
        try {
            setLoading(true);
            const res = await ListAllPost()
            setResPosts_List(res.data)
        } catch (error: any) {
            toast.error(`Posts: ` + error.response.error)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    useEffect(() => {
        setSelectNav(null)
        getApiPostRetrieve(String(id), "post_category")
    }, [])

    const filterPost = useMemo(() => {
        return resPosts_List?.data.filter((r) => r.id !== id)
    }, [resPosts_List, id])

    return (
        <>
            <div className="flex items-center gap-3 px-5 max-w-[1535px] mx-auto py-2 text-lg">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 group"
                >
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-white rounded-full shadow hover:shadow-md transition-all">
                        <FaArrowLeft />
                    </span>
                    <span className="font-medium text-gray-700 group-hover:text-green-600 transition">
                        Post / {resPosts_Retrieve?.data.attributes.title}
                    </span>
                </button>
            </div>
            {resPosts_Retrieve?.data &&
                <div className="max-w-[1535px] mx-auto flex flex-col gap-5 px-5 py-5">
                    <div
                        className=" relative rounded-md overflow-hidden relative group shadow-lg w-full aspect-[16/6]"
                        rounded-md="fade-up"
                    >
                        <img
                            src={`${resPosts_Retrieve?.data.attributes.image_url}`}
                            alt={resPosts_Retrieve?.data.attributes.title}
                            className="aspect-[16/6] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className='absolute top-3 left-3 rounded-full text-white px-4 py-1 bg-gradient-to-r from-emerald-500 to-green-700 text-white shadow-md backdrop-blur-md'>{resPosts_Retrieve?.data.attributes.post_category_title}</span>
                        <div className="absolute aspect-[16/6] inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h1 className="text-4xl font-bold text-gray-900 leading-tight" >
                            {resPosts_Retrieve?.data.attributes.title}
                        </h1>
                        <div className="flex flex-wrap items-center text-gray-500 text-sm gap-4">
                            <div className="flex items-center gap-2">
                                <FaUser className='text-green-500' />
                                <span className='text-sm'>{resPosts_Retrieve?.data.attributes.author_name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCalendarAlt className='text-green-500' />
                                <span className='text-sm'>{new Date(resPosts_Retrieve.data.attributes.published_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                        {resPosts_Retrieve.data.attributes.content_html &&
                            < div >
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                                <div className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: resPosts_Retrieve.data.attributes.content_html }} />
                            </div>
                        }
                    </div>
                </div >
            }
            <div className='flex-grow gap-5 flex flex-col max-w-[1535px] mx-auto px-5 py-5'>
                <div className="flex css-next items-center w-full transition-all duration-300 ease">
                    <h3 className="text-xl uppercase font-semibold bg-clip-text tracking-wide">You may be interested</h3>
                </div>
                <div className="grid grid-cols-1 grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterPost?.map((res, id) => (
                        <div className="relative group overflow-hidden rounded-md shadow-lg" key={id}
                            onClick={() => {
                                router.push(`/post/${res.id}`)
                            }}
                        >
                            <img src={res.attributes.image_url!} alt={res.attributes.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-b-md">
                                <h3 className="text-xl text-white font-semibold mt-1">{res.attributes.title}</h3>
                                <p className="text-white/70 text-sm mt-1">
                                    {res.attributes.author_name} | Published: {new Date(res.attributes.published_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default PostDetail