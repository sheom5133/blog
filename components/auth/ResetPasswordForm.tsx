'use client'

import { useState, useTransition } from 'react'
import { resetPassword } from '@/app/actions/auth'

export default function ResetPasswordForm() {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(formData: FormData) {
        setError(null)
        startTransition(async () => {
            const result = await resetPassword(formData)
            if (result?.error) {
                setError(translateError(result.error))
            } else if (result?.success) {
                setSuccess(true)
            }
        })
    }

    if (success) {
        return (
            <div className="text-center py-4">
                <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">이메일을 발송했습니다!</p>
                <p className="text-sm text-gray-500">
                    받은 편지함을 확인하고 링크를 클릭해 비밀번호를 재설정하세요.<br />
                    스팸 폴더도 확인해 주세요.
                </p>
            </div>
        )
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    <p className="text-sm text-red-600 flex items-center gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                </div>
            )}

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    이메일 주소
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="가입한 이메일을 입력하세요"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
            >
                {isPending ? (
                    <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        전송 중...
                    </>
                ) : '재설정 링크 보내기'}
            </button>
        </form>
    )
}

function translateError(message: string): string {
    if (message.includes('rate limit')) return '너무 많은 요청이 있었습니다. 잠시 후 다시 시도해 주세요.'
    if (message.includes('User not found')) return '가입되지 않은 이메일입니다.'
    return '이메일 발송 중 오류가 발생했습니다. 다시 시도해 주세요.'
}
