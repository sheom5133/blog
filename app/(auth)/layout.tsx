import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'DevBlog - 인증',
    description: 'DevBlog 로그인 및 회원가입',
}

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* 상단 네비게이션 */}
            <header className="bg-white border-b border-gray-200 px-6 py-4">
                <nav className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M2 4l6-3 6 3v8l-6 3-6-3V4z" fill="white" />
                            </svg>
                        </div>
                        <span className="text-lg font-bold text-gray-900">DevBlog</span>
                    </Link>
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">홈</Link>
                        <Link href="/articles" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">아티클</Link>
                        <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">소개</Link>
                        <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">로그인</Link>
                        <Link
                            href="/signup"
                            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                        >
                            회원가입
                        </Link>
                    </div>
                </nav>
            </header>

            {/* 메인 콘텐츠 */}
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-5xl flex items-center gap-12">
                    {/* 좌측 이미지 패널 */}
                    <div className="hidden lg:flex flex-1 relative rounded-2xl overflow-hidden min-h-[520px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900">
                            <div
                                className="absolute inset-0 opacity-40"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                }}
                            />
                        </div>
                        {/* 코드 에디터 스타일 장식 요소 */}
                        <div className="absolute top-8 left-8 right-8 bg-slate-800 rounded-xl p-4 opacity-80">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                <span className="ml-2 text-slate-400 text-xs">main.tsx</span>
                            </div>
                            <div className="space-y-1.5 text-xs font-mono">
                                <p><span className="text-purple-400">import</span> <span className="text-blue-300">React</span> <span className="text-purple-400">from</span> <span className="text-green-300">&apos;react&apos;</span></p>
                                <p><span className="text-purple-400">import</span> <span className="text-blue-300">&#123; useState &#125;</span> <span className="text-purple-400">from</span> <span className="text-green-300">&apos;react&apos;</span></p>
                                <p>&nbsp;</p>
                                <p><span className="text-purple-400">export default function</span> <span className="text-yellow-300">App</span><span className="text-white">() &#123;</span></p>
                                <p>&nbsp; <span className="text-purple-400">const</span> <span className="text-blue-300">[count, setCount]</span> <span className="text-white">= useState(</span><span className="text-orange-300">0</span><span className="text-white">)</span></p>
                                <p>&nbsp; <span className="text-purple-400">return</span> <span className="text-white">(</span></p>
                                <p>&nbsp;&nbsp; <span className="text-blue-300">&lt;div</span> <span className="text-green-300">className</span><span className="text-white">=</span><span className="text-green-300">&quot;app&quot;</span><span className="text-blue-300">&gt;</span></p>
                                <p>&nbsp;&nbsp;&nbsp; <span className="text-blue-300">&lt;h1&gt;</span><span className="text-white">Hello World</span><span className="text-blue-300">&lt;/h1&gt;</span></p>
                                <p>&nbsp;&nbsp; <span className="text-blue-300">&lt;/div&gt;</span></p>
                                <p>&nbsp; <span className="text-white">)</span></p>
                                <p><span className="text-white">&#125;</span></p>
                            </div>
                        </div>
                        {/* 하단 텍스트 */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-900/90 to-transparent">
                            <span className="inline-block text-xs font-medium text-white bg-blue-600 px-3 py-1 rounded-full mb-3">
                                새로운 기능
                            </span>
                            <h2 className="text-2xl font-bold text-white leading-snug mb-2">
                                더 나은 소프트웨어,<br />함께 만드세요.
                            </h2>
                            <p className="text-sm text-slate-300">
                                50,000명 이상의 개발자와 함께 지식과 코드를 공유하세요.
                            </p>
                        </div>
                    </div>

                    {/* 우측 폼 카드 */}
                    <div className="w-full lg:w-[440px] flex-shrink-0">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}
