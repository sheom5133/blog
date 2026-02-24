'use client'

import { useState, useTransition } from 'react'
import { login } from '@/app/actions/auth'

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    async function handleSubmit(formData: FormData) {
        setError(null)
        startTransition(async () => {
            const result = await login(formData)
            if (result?.error) {
                setError(translateError(result.error))
            }
        })
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            {/* 에러 메시지 */}
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

            {/* 이메일 */}
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
                        placeholder="이메일을 입력하세요"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            {/* 비밀번호 */}
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        비밀번호
                    </label>
                    <a href="#" className="text-xs text-blue-600 hover:text-blue-700">
                        비밀번호 찾기
                    </a>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        autoComplete="current-password"
                        placeholder="비밀번호를 입력하세요"
                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                    >
                        {showPassword ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* 30일 로그인 유지 */}
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${rememberMe ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'
                        }`}
                    aria-label="30일 동안 로그인 유지"
                >
                    {rememberMe && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>
                <span className="text-sm text-gray-600">30일 동안 로그인 유지</span>
            </div>

            {/* 로그인 버튼 */}
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
                        로그인 중...
                    </>
                ) : '로그인'}
            </button>
        </form>
    )
}

function translateError(message: string): string {
    if (message.includes('Invalid login credentials')) return '이메일 또는 비밀번호가 올바르지 않습니다.'
    if (message.includes('Email not confirmed')) return '이메일 인증이 필요합니다. 이메일을 확인해 주세요.'
    if (message.includes('Too many requests')) return '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해 주세요.'
    return '로그인 중 오류가 발생했습니다. 다시 시도해 주세요.'
}
