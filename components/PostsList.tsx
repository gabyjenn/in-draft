'use client'

import {useState} from 'react'
import PostCard from '@/components/PostCard'

type Category = 'review' | 'letter' | 'essay'

type Post = {
  _id: string
  titleEn?: string
  titleKo?: string
  date?: string
  category?: Category
  bodyEn?: any[]
  bodyKo?: any[]
}

type PostsListProps = {
  posts: Post[]
  language: 'en' | 'ko'
}

const categoryIcons: Record<Category, string> = {
  review: '/img/review.svg',
  letter: '/img/letter.svg',
  essay: '/img/essay.svg',
}

function ReviewIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <line x1="13.7" y1="17.86" x2="34.3" y2="17.86" />
      <line x1="13.7" y1="22.5" x2="34.3" y2="22.5" />
      <polygon points="6.42 10.6 6.42 34.4 27.31 34.4 27.31 41.58 33.3 34.4 41.58 34.4 41.58 10.6 6.42 10.6" />
    </svg>
  )
}

function LetterIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <rect x="6.42" y="11.92" width="35.16" height="23.8" />
      <polyline points="6.42 11.92 24 25.61 41.58 11.92" />
    </svg>
  )
}

function EssayIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <rect
        x="6.87"
        y="10.86"
        width="34.25"
        height="26.27"
        transform="translate(48) rotate(90)"
      />
      <line x1="16.09" y1="12.56" x2="31.91" y2="12.56" />
      <line x1="16.09" y1="17.19" x2="31.91" y2="17.19" />
      <line x1="16.09" y1="21.83" x2="31.91" y2="21.83" />
    </svg>
  )
}

function CategoryIcon({category}: {category: Category}) {
  switch (category) {
    case 'review':
      return <ReviewIcon />
    case 'letter':
      return <LetterIcon />
    case 'essay':
      return <EssayIcon />
  }
}

function formatDate(date: string | undefined, language: 'en' | 'ko') {
  if (!date) return ''

  return new Intl.DateTimeFormat(
    language === 'ko' ? 'ko-KR' : 'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  ).format(new Date(`${date}T00:00:00`))
}

export default function PostsList({
  posts,
  language,
}: PostsListProps) {
  const [ascending, setAscending] = useState(false)
  const [activeCategory, setActiveCategory] =
    useState<Category | null>(null)

  const visiblePosts = posts
    .filter((post) => {
      if (!activeCategory) return true
      return post.category === activeCategory
    })
    .sort((a, b) => {
      const aDate = a.date ? new Date(a.date).getTime() : 0
      const bDate = b.date ? new Date(b.date).getTime() : 0

      return ascending ? aDate - bDate : bDate - aDate
    })

  function toggleCategory(category: Category) {
    setActiveCategory((current) =>
      current === category ? null : category
    )
  }

  return (
    <>
      <div className="filter-bar">
        <button
          className="date-filter"
          onClick={() => setAscending((current) => !current)}
        >
          <span>Date</span>

          <img
            src="/img/arrow.svg"
            alt=""
            className={`date-arrow ${
              ascending ? 'ascending' : ''
            }`}
          />
        </button>

        <div className="category-filters">
            {(
                ['review', 'letter', 'essay'] as Category[]
            ).map((category) => (
                <button
                key={category}
                className={`category-filter ${
                    activeCategory === category ? 'active' : ''
                }`}
                onClick={() => toggleCategory(category)}
                aria-label={`Filter by ${category}`}
                >
                <CategoryIcon category={category} />
                </button>
            ))}
        </div>
      </div>

      <div className="posts-list">
        {visiblePosts.map((post) => (
          <PostCard
            key={post._id}
            title={
              language === 'ko'
                ? post.titleKo || post.titleEn
                : post.titleEn
            }
            date={formatDate(post.date, language)}
            categoryIcon={
              post.category
                ? categoryIcons[post.category]
                : null
            }
            category={post.category}
            body={
              language === 'ko'
                ? post.bodyKo || post.bodyEn
                : post.bodyEn
            }
            language={language}
          />
        ))}
      </div>
    </>
  )
}