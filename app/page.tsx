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

export default async function HomePage() {
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

        <a href="/ko">kor</a>
      </div>

      <main
        className="container-everything stacked-preview"
        id="content"
        lang="en"
      >
        <PostsList
          posts={posts}
            language="en"
        />

        <div className="content no-preview" id="about">
          <div className="header">
            <div className="left" style={{color: 'blue'}}>
              About
            </div>
          </div>

          <p>
            in:draft is Jeewon Kim&apos;s space for half-private
            thoughts. When I'm not writing here, I design for a living and watch a lot of film & TV.
          </p>
        </div>

        <p className="bio">
          ©2026 Jeewon Kim. All Rights Reserved.
        </p>
      </main>
    </>
  )
}