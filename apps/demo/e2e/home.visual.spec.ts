import { expect, test, type Page } from '@playwright/test'

async function disableMotion(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        scroll-behavior: auto !important;
      }
    `,
  })
}

async function setTheme(page: Page, theme: 'light' | 'dark') {
  await page.evaluate((nextTheme) => {
    window.scrollTo(0, 0)
    document.documentElement.dataset.theme = nextTheme
    document.documentElement.dataset.themeMode = nextTheme
    document.documentElement.style.colorScheme = nextTheme
  }, theme)
}

async function getTopShowcaseClip(page: Page) {
  const shell = page.locator('.demo-main')
  const hero = page.locator('.demo-hero')

  await expect(shell).toBeVisible()
  await expect(hero).toBeVisible()

  const shellBox = await shell.boundingBox()
  const heroBox = await hero.boundingBox()

  if (!shellBox || !heroBox) {
    throw new Error('No se pudo calcular el área visual del top showcase.')
  }

  return {
    x: Math.floor(shellBox.x),
    y: Math.floor(shellBox.y),
    width: Math.ceil(shellBox.width),
    height: Math.ceil((heroBox.y + heroBox.height) - shellBox.y + 24),
  }
}

test.describe('demo homepage visual review', () => {
  test('captures the top showcase layout in dark theme', async ({ page }) => {
    await page.goto('/')
    await disableMotion(page)
    await setTheme(page, 'dark')

    await page.waitForLoadState('networkidle')

    const clip = await getTopShowcaseClip(page)
    await expect(page).toHaveScreenshot('demo-home-top.png', {
      animations: 'disabled',
      caret: 'hide',
      clip,
      maxDiffPixelRatio: 0.02,
    })
  })

  test('captures the top showcase layout in light theme', async ({ page }) => {
    await page.goto('/')
    await disableMotion(page)
    await setTheme(page, 'light')

    await page.waitForLoadState('networkidle')

    const clip = await getTopShowcaseClip(page)
    await expect(page).toHaveScreenshot('demo-home-top-light.png', {
      animations: 'disabled',
      caret: 'hide',
      clip,
      maxDiffPixelRatio: 0.02,
    })
  })

  test('captures the condensed header state in dark theme', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile', 'La vista móvil no usa el mismo header fijo/condensado.')

    await page.goto('/')
    await disableMotion(page)
    await setTheme(page, 'dark')

    await page.waitForLoadState('networkidle')
    await page.evaluate(() => window.scrollTo(0, 220))

    const condensedHeader = page.locator('.demo-header.demo-header--condensed .demo-header__shell')

    await expect(condensedHeader).toBeVisible()
    await expect(condensedHeader).toHaveScreenshot('demo-home-header-condensed.png', {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.02,
    })
  })
})