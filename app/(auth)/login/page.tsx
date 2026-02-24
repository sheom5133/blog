import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'

interface Props {
    searchParams: Promise<{ error?: string; message?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
    const params = await searchParams
    const errorMessage = params.error
        ? decodeURIComponent(params.error.replace(/_/g, ' '))
        : null

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">환영합니다!</h1>
                <p className="text-sm text-gray-500">계정에 로그인하려면 아래 정보를 입력하세요.</p>
            </div>

            {/* URL 에러 파라미터 표시 (auth callback 실패 등) */}
            {errorMessage && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    <p className="text-sm text-red-600 flex items-center gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {errorMessage}
                    </p>
                </div>
            )}

            <LoginForm />

            <p className="mt-6 text-center text-sm text-gray-500">
                계정이 없으신가요?{' '}
                <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-700">
                    무료 회원가입
                </Link>
            </p>
        </div>
    )
}
