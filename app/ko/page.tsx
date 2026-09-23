import {client} from '@/sanity/lib/client'
import {POSTS_QUERY} from '@/sanity/lib/queries'
import SearchBar from '@/components/SearchBar'
import PostsList from '@/components/PostsList'

type Post = {
  _id: string
  titleEn?: string
  titleKo?: string
  date?: string
  sortOrder?: number
  category?: 'review' | 'letter' | 'essay'
  bodyEn?: any[]
  bodyKo?: any[]
}

export default async function KoreanPage() {
  const posts: Post[] = await client.fetch(
    POSTS_QUERY,
    {},
    {
      cache: 'no-store',
    }
  )

  const groupedPosts = posts.reduce<Record<string, Post[]>>(
    (groups, post) => {
      const year = post.date
        ? new Date(`${post.date}T00:00:00`).getFullYear().toString()
        : 'Undated'

      if (!groups[year]) {
        groups[year] = []
      }

      groups[year].push(post)

      return groups
    },
    {}
  )

  return (
    <>
      <a className="button" href="#about">
        i
      </a>

      <div className="navigation">
        <a href="/">in:draft</a>

        <SearchBar />

        <a href="/">eng</a>
      </div>

      <main
        className="container-everything stacked-preview"
        id="content"
        lang="ko"
      >
        <PostsList
          posts={posts}
          language="ko"
        />

        <div className="content no-preview" id="about">
          <div className="header">
            <div className="left" style={{color: 'blue'}}>
              소개
            </div>
          </div>

          <p>
            in:draft는 김지원의 어중간하게 사적인 글을 위한 공간입니다. 글을 쓰지 않는 대부분의 시간에는 디자인 일을 하고 영화관과 TV 앞에 앉아 있습니다.
          </p>
        </div>

        <p className="bio">
          ©2026 Jeewon Kim. All Rights Reserved.
        </p>
      </main>
    </>
  )
}