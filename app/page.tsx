import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    // 로그인된 경우 → 추후 대시보드/홈 페이지로 변경 가능
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">DevBlog에 오신 것을 환영합니다!</h1>
          <p className="text-gray-500 mb-4">{user.email} 으로 로그인됨</p>
          <form action="/api/auth/signout" method="post">
            <a href="/login" className="text-blue-600 hover:underline text-sm">로그아웃</a>
          </form>
        </div>
      </div>
    )
  }

  redirect('/login')
}
