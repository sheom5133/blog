import Link from 'next/link'

export default function VerifyEmailPage() {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
            {/* 이메일 아이콘 */}
            <div className="flex justify-center mb-5">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                    <svg
                        className="w-8 h-8 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">이메일을 확인하세요</h1>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                가입하신 이메일로 인증 링크를 발송했습니다.<br />
                이메일의 링크를 클릭하여 계정을 활성화해 주세요.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
                <p className="text-xs text-amber-700">
                    📬 이메일이 도착하지 않았다면 스팸 폴더를 확인해 주세요. 몇 분 정도 걸릴 수 있습니다.
                </p>
            </div>

            <Link
                href="/login"
                className="block w-full py-3 px-4 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
            >
                로그인 페이지로 돌아가기
            </Link>
        </div>
    )
}
