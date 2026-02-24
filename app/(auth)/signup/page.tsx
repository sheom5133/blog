import SignupForm from '@/components/auth/SignupForm'
import Link from 'next/link'

export default function SignupPage() {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">계정 만들기</h1>
                <p className="text-sm text-gray-500">무료로 가입하고 개발자 커뮤니티에 참여하세요.</p>
            </div>

            <SignupForm />

            <p className="mt-6 text-center text-sm text-gray-500">
                이미 계정이 있으신가요?{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700">
                    로그인
                </Link>
            </p>
        </div>
    )
}
