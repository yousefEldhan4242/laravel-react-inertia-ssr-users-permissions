import { Feature } from '@/types';
import { useState } from 'react';

const FeatureItem = ({ feature }: { feature: Feature }) => {
    const [isExpanded,setIsExpanded] = useState<boolean>(false)

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded)
    }
    return (
        <div className="mb-4 overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="flex gap-8 p-6 text-gray-900 dark:text-gray-100">
                    <div className='flex flex-col items-center'>
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-12"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>
                        </button>
                        <span className='text-2xl font-semibold'>12</span>
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-12"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </div>
                    <div className='flex-1'>
                        <h2 className='text-2xl mb-2'>{feature.name}</h2>
                        <p>{isExpanded ? feature.description : `${feature.description.slice(0,200)}...`}</p>
                        <button className='text-amber-500 hover:underline' onClick={toggleReadMore}>
                            {isExpanded?"Read Less" :"Read More"}
                        </button>
                    </div>
            </div>
        </div>
    );
};

export default FeatureItem;
