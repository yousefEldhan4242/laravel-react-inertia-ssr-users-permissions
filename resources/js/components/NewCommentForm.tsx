import { Feature } from '@/types'
import React, { FormEventHandler } from 'react'
import TextAreaInput from './TextAreaInput'
import { useForm, usePage } from '@inertiajs/react'
import PrimaryButton from './PrimaryButton'
import { can } from '@/helpers'

const NewCommentForm = ({feature}:{feature:Feature}) => {
    const user = usePage().props.auth.user
    
    const {data,setData,post,processing} = useForm({
        comment:""
    })

    const createComment:FormEventHandler = (e) => {
        e.preventDefault()

        post(route("comment.store",feature.id),{
            preserveScroll:true,
            preserveState:true,
            onSuccess: () => setData("comment","")
        })
    }

    if (!can(user,"manage_comments")){
        return(
            <div className='text-center text-gray-600'>
                You don't have permission to leave comments
            </div>
        )
    }
  return (
    <form onSubmit={createComment} className='flex items-center mb-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800'>
            <TextAreaInput rows={1} value={data.comment}
            onChange={(e) => setData("comment",e.target.value)}
            className='mt-1 block w-full'
            placeholder='Your Comment'/>
            <PrimaryButton
            disabled={processing}>Comment</PrimaryButton>
    </form>
  )
}

export default NewCommentForm
