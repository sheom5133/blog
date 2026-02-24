'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

async function getSiteUrl() {
    const headersList = await headers()
    const host = headersList.get('host') ?? 'localhost:3000'
    const proto = headersList.get('x-forwarded-proto') ?? 'http'
    return `${proto}://${host}`
}

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: '이메일과 비밀번호를 입력해 주세요.' }
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    const siteUrl = await getSiteUrl()

    if (!email || !password || !name) {
        return { error: '모든 항목을 입력해 주세요.' }
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
            },
            // 이메일 인증 후 돌아올 콜백 URL
            emailRedirectTo: `${siteUrl}/auth/callback?next=/`,
        },
    })

    if (error) {
        return { error: error.message }
    }

    redirect('/verify-email')
}

export async function signout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
}

export async function resetPassword(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const siteUrl = await getSiteUrl()

    if (!email) {
        return { error: '이메일을 입력해 주세요.' }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // callback 통해 세션 교환 후 update-password 로 이동
        redirectTo: `${siteUrl}/auth/callback?next=/update-password`,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}

export async function updatePassword(formData: FormData) {
    const supabase = await createClient()
    const password = formData.get('password') as string

    if (!password) {
        return { error: '새 비밀번호를 입력해 주세요.' }
    }

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}
