import UpdatePasswordForm from '@/components/auth/UpdatePasswordForm'

export default function UpdatePasswordPage() {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">새 비밀번호 설정</h1>
                <p className="text-sm text-gray-500">새로운 비밀번호를 입력해 주세요.</p>
            </div>

            <UpdatePasswordForm />
        </div>
    )
}
