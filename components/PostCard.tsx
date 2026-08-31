'use client'

import {useState} from 'react'
import {PortableText} from '@portabletext/react'

type PostCardProps = {
  title?: string
  date?: string
  categoryIcon?: string | null
  category?: string
  body?: any[]
  language?: 'en' | 'ko'
}

export default function PostCard({
  title,
  date,
  categoryIcon,
  category,
  body,
  language = 'en',
}: PostCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`content ${expanded ? 'expanded' : ''}`}>
      <div className="header">
        <div className="header-text">
          <div className="left">{title}</div>
          <div className="right">{date}</div>
        </div>

        {categoryIcon && (
          <img
            className="icon"
            src={categoryIcon}
            alt={category || ''}
          />
        )}
      </div>

      {body && (
        <PortableText
          value={body}
          components={{
            types: {
              quote: ({value}) => (
                <div className="quote">
                  <PortableText value={value.text} />
                </div>
              ),
            },

            marks: {
              em: ({children}) => <i>{children}</i>,
              strong: ({children}) => <strong>{children}</strong>,
              link: ({children, value}) => (
                <a
                  href={value?.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {children}
                </a>
              ),
            },
          }}
        />
      )}

      <button
        className="expand-button"
        onClick={(event) => {
          event.stopPropagation()
          setExpanded((current) => !current)
        }}
      >
        {expanded
          ? language === 'ko'
            ? '닫기'
            : 'Close'
          : language === 'ko'
            ? '더 보기'
            : 'Read more'}
      </button>
    </div>
  )
}