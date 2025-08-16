import CommentItem from '@/components/CommentItem';
import FeatureUpvoteDownvote from '@/components/FeatureUpvoteDownvote';
import NewCommentForm from '@/components/NewCommentForm';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Feature } from '@/types';
import { Head } from '@inertiajs/react';

export default function Show({ feature }: { feature: Feature }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Feature <b>{feature.name }</b>
                </h2>
            }
        >
            <Head title={`Feature ${feature.name}`} />
            <div className="mb-4 overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                <div className="flex gap-8 p-6 text-gray-900 dark:text-gray-100">
                <FeatureUpvoteDownvote feature={feature}/>
                    <div className="flex-1">
                        <h2 className="mb-2 text-2xl">{feature.name}</h2>
                        <p className='break-all'>{feature.description}</p>
                        <div className='mt-8'>
                            <NewCommentForm feature={feature}/>
                            {feature.comments.map((comment) => (
                                <CommentItem comment={comment} key={comment.id}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
