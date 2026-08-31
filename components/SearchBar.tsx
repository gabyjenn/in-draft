'use client'

import {useState} from 'react'

export default function SearchBar() {
  const [query, setQuery] = useState('')

  function removeHighlights() {
    document.querySelectorAll('mark.search-highlight').forEach((mark) => {
      const parent = mark.parentNode

      if (!parent) return

      parent.replaceChild(
        document.createTextNode(mark.textContent || ''),
        mark
      )

      parent.normalize()
    })
  }

  function highlightText(searchQuery: string) {
    removeHighlights()

    if (!searchQuery.trim()) return

    const content = document.getElementById('content')
    if (!content) return

    const escapedQuery = searchQuery.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&'
    )

    const regex = new RegExp(escapedQuery, 'gi')

    const walker = document.createTreeWalker(
      content,
      NodeFilter.SHOW_TEXT
    )

    const textNodes: Text[] = []

    while (walker.nextNode()) {
      const node = walker.currentNode as Text

      const parent = node.parentElement

      if (
        !parent ||
        parent.closest('button') ||
        parent.closest('input') ||
        parent.closest('script') ||
        parent.closest('style')
      ) {
        continue
      }

      if (regex.test(node.textContent || '')) {
        textNodes.push(node)
      }

      regex.lastIndex = 0
    }

    let firstMatch: HTMLElement | null = null

    textNodes.forEach((node) => {
      const text = node.textContent || ''

      const fragment = document.createDocumentFragment()

      let lastIndex = 0

      text.replace(regex, (match, offset) => {
        fragment.appendChild(
          document.createTextNode(
            text.slice(lastIndex, offset)
          )
        )

        const mark = document.createElement('mark')
        mark.className = 'search-highlight'
        mark.textContent = match

        fragment.appendChild(mark)

        if (!firstMatch) {
          firstMatch = mark
        }

        lastIndex = offset + match.length

        return match
      })

      fragment.appendChild(
        document.createTextNode(text.slice(lastIndex))
      )

      node.replaceWith(fragment)

      regex.lastIndex = 0
    })

    if (firstMatch) {
      ;(firstMatch as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search..."
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          highlightText(query)
        }
      }}
    />
  )
}