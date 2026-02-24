import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">환영합니다!</h1>
                <p className="text-sm text-gray-500">계정에 로그인하려면 아래 정보를 입력하세요.</p>
            </div>

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
