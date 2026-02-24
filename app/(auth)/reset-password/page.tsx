import ResetPasswordForm from '@/components/auth/ResetPasswordForm'
import Link from 'next/link'

export default function ResetPasswordPage() {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">비밀번호 재설정</h1>
                <p className="text-sm text-gray-500">
                    가입한 이메일을 입력하면 재설정 링크를 보내드립니다.
                </p>
            </div>

            <ResetPasswordForm />

            <p className="mt-6 text-center text-sm text-gray-500">
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700">
                    ← 로그인으로 돌아가기
                </Link>
            </p>
        </div>
    )
}
