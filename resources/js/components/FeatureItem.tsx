import { Feature } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import FeatureActionsDropdown from './FeatureActionsDropdown';
import FeatureUpvoteDownvote from './FeatureUpvoteDownvote';

const FeatureItem = ({ feature }: { feature: Feature }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className="mb-4 overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="flex gap-8 p-6 text-gray-900 dark:text-gray-100">
                <FeatureUpvoteDownvote feature={feature}/>
                <div className="flex-1">
                    <h2 className="mb-2 text-2xl">
                        <Link href={route('feature.show', feature)}>{feature.name}</Link>
                    </h2>
                    {(feature.description || '').length <= 200 ? (
                        <p className="break-all">{feature.description}</p>
                    ) : (
                        <>
                            <p className="break-all">{isExpanded ? feature.description : `${feature.description.slice(0, 200)}...`}</p>
                            <button className="text-amber-500 hover:underline" onClick={toggleReadMore}>
                                {isExpanded ? 'Read Less' : 'Read More'}
                            </button>
                        </>
                    )}
                </div>
                <div>
                    <FeatureActionsDropdown feature={feature} />
                </div>
            </div>
        </div>
    );
};

export default FeatureItem;
