'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

type TokenType = 'tag' | 'attr' | 'string' | 'keyword' | 'comment' | 'plain'

interface Token {
  readonly type: TokenType
  readonly value: string
}

const TOKEN_REGEX =
  /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(<\/?[A-Z][A-Za-z0-9.]*|<\/?[a-z][a-z0-9-]+|<|\/?>|>)|(\b(?:import|from|export|const|let|var|function|return|type|interface|true|false|null|undefined|async|await|as|default)\b)|(\/\/[^\n]*)|([a-zA-Z][a-zA-Z0-9]*(?=\s*[={]))/g

function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let lastIndex = 0
  const regex = new RegExp(TOKEN_REGEX.source, 'g')
  let match: RegExpExecArray | null

  while ((match = regex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'plain', value: code.slice(lastIndex, match.index) })
    }
    if (match[1])      tokens.push({ type: 'string',  value: match[1] })
    else if (match[2]) tokens.push({ type: 'tag',     value: match[2] })
    else if (match[3]) tokens.push({ type: 'keyword', value: match[3] })
    else if (match[4]) tokens.push({ type: 'comment', value: match[4] })
    else if (match[5]) tokens.push({ type: 'attr',    value: match[5] })
    lastIndex = regex.lastIndex
  }

  if (lastIndex < code.length) {
    tokens.push({ type: 'plain', value: code.slice(lastIndex) })
  }

  return tokens
}

const COLOR: Record<TokenType, string> = {
  tag:     '#7ee787',
  attr:    '#ffa657',
  string:  '#a5d6ff',
  keyword: '#ff7b72',
  comment: '#8b949e',
  plain:   '#e6edf3',
}

interface CodeBlockProps {
  readonly code: string
  readonly language?: string
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const trimmed = code.trim()
  const tokens = tokenize(trimmed)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trimmed)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  return (
    <div className="demo-codeblock">
      <div className="demo-codeblock__bar">
        <span className="demo-codeblock__lang">{language}</span>
        <button
          type="button"
          className="demo-codeblock__copy"
          onClick={handleCopy}
          aria-label="Copiar código"
        >
          {copied
            ? <><Check size={13} aria-hidden="true" /> Copiado</>
            : <><Copy size={13} aria-hidden="true" /> Copiar</>}
        </button>
      </div>
      <pre className="demo-codeblock__pre">
        <code>
          {tokens.map((tok, i) => (
            <span key={i} style={{ color: COLOR[tok.type] }}>{tok.value}</span>
          ))}
        </code>
      </pre>
    </div>
  )
}
