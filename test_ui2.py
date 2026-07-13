import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Open page
        page = await browser.new_page()
        await page.goto("file:///app/index.html")

        # Trigger 'sincronizarMonitor2' on the page manually, but it's triggered on any change.
        # Let's type something to trigger the input event
        await page.fill('#turmaInput', 'EMI Química 123')
        await page.wait_for_timeout(1000)

        # Let's see the monitor 2 page. It listens for postMessage from BroadcastChannel.
        page2 = await browser.new_page()
        await page2.goto("file:///app/index.html?tela=2")
        await page2.wait_for_timeout(2000)

        await page2.screenshot(path="monitor2_synced.png", full_page=True)

        await browser.close()

asyncio.run(run())
