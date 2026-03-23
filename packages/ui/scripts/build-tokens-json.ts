/**
 * build-tokens-json.ts
 * Reads src/tokens/*.ts and writes dist/tokens.json.
 * Run automatically as part of `npm run build`.
 * Never hand-edit dist/tokens.json — it is generated.
 */

import * as fs from 'fs'
import * as path from 'path'
import { colors } from '../src/tokens/colors'
import { typography } from '../src/tokens/typography'
import { spacing } from '../src/tokens/spacing'
import { radius } from '../src/tokens/radius'
import { shadows } from '../src/tokens/shadows'

const tokens = { colors, typography, spacing, radius, shadows }

const distDir = path.resolve(__dirname, '../dist')
const outFile = path.join(distDir, 'tokens.json')

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

fs.writeFileSync(outFile, JSON.stringify(tokens, null, 2) + '\n', 'utf-8')
console.log(`✔ dist/tokens.json written (${Buffer.byteLength(JSON.stringify(tokens))} bytes)`)
