import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Open page
        page = await browser.new_page()
        await page.goto("file:///app/index.html")

        # Take screenshot of the initial page to see what's what
        await page.screenshot(path="initial.png", full_page=True)

        # Open monitor 2
        # Just manually execute paginarConteudo logic here on the page to see how it works in visualizadorPaginado
        # Actually we can simulate Monitor 2 easily.
        await page.goto("file:///app/index.html?tela=2")
        await page.screenshot(path="monitor2_initial.png", full_page=True)

        # We need to simulate the postMessage from main to monitor 2.
        # But we can also just wait and let the script run `paginarConteudo` directly in the page if we inject it or trigger it via the BroadcastChannel.

        await browser.close()

asyncio.run(run())
