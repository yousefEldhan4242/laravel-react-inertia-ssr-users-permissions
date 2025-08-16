import { can } from '@/helpers';
import { Comment } from '@/types';
import { useForm, usePage } from '@inertiajs/react';

const CommentItem = ({ comment }: { comment: Comment }) => {
    const user = usePage().props.auth.user
    
    const form = useForm()
    const deleteComment = () => {
        form.delete(route("comment.destroy",comment.id),{
            preserveScroll:true,
            preserveState:true
        })

    }
    return (
        <div className="mb-3 flex gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                </svg>
            </div>
            <div className='flex-1'>
                <h3 className="mt-1 font-bold">
                    {comment.user.name}
                    <span className="ml-4 text-xs text-gray-500">{comment.created_at}</span>
                </h3>
                <div className="mt-1 italic">{comment.comment}</div>
            </div>
            {can(user,"manage_comments") && comment.user.id == user.id && <div>
                <button onClick={deleteComment} className="flex items-center px-6 py-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                    </svg>
                </button>
            </div>}
        </div>
    );
};

export default CommentItem;
