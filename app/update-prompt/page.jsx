"use client"

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const UpdatePrompt = () => {

    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const reponse = await fetch(`/api/prompt/${promptId}`);
            const data = await reponse.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if (promptId)
            getPromptDetails();
    }, [promptId])

    const updatePrompt = async (e) => {
        try {
            e.preventDefault();
            setSubmitting(true);
            if (!promptId)
                alert('Prompt id not found');
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if (response.ok) {
                router.push('/profile')
            }
        } catch (error) {
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type='Update'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default UpdatePrompt;



