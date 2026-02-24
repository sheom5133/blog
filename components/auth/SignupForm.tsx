'use client'

import { useState, useTransition } from 'react'
import { signup } from '@/app/actions/auth'

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    async function handleSubmit(formData: FormData) {
        setError(null)

        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.')
            return
        }

        if (password.length < 8) {
            setError('비밀번호는 8자 이상이어야 합니다.')
            return
        }

        startTransition(async () => {
            const result = await signup(formData)
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

            {/* 이름 */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    이름
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="이름을 입력하세요"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                    비밀번호
                </label>
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
                        autoComplete="new-password"
                        placeholder="8자 이상 입력하세요"
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

            {/* 비밀번호 확인 */}
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                    비밀번호 확인
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        autoComplete="new-password"
                        placeholder="비밀번호를 다시 입력하세요"
                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        aria-label={showConfirmPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                    >
                        {showConfirmPassword ? (
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

            {/* 이용약관 */}
            <p className="text-xs text-gray-500">
                가입 시{' '}
                <a href="#" className="text-blue-600 hover:underline">이용약관</a>
                {' '}및{' '}
                <a href="#" className="text-blue-600 hover:underline">개인정보처리방침</a>
                에 동의하게 됩니다.
            </p>

            {/* 회원가입 버튼 */}
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
                        가입 처리 중...
                    </>
                ) : '무료로 시작하기'}
            </button>
        </form>
    )
}

function translateError(message: string): string {
    if (message.includes('User already registered')) return '이미 가입된 이메일입니다. 로그인을 시도해 주세요.'
    if (message.includes('Password should be')) return '비밀번호는 6자 이상이어야 합니다.'
    if (message.includes('Invalid email')) return '올바른 이메일 주소를 입력해 주세요.'
    if (message.includes('Too many requests')) return '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해 주세요.'
    return '회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.'
}
