import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Open page
        page = await browser.new_page()
        await page.goto("file:///app/index.html")

        # We need to test the printing functionality
        page.on("dialog", lambda dialog: dialog.accept())  # accept confirm dialog

        # Setup mock for canalMonitor to log messages
        await page.evaluate("""
            window.testMessages = [];
            canalMonitor.addEventListener('message', e => {
                window.testMessages.push(e.data);
            });
        """)

        # Call verificarEImprimir
        await page.evaluate("verificarEImprimir()")

        await page.wait_for_timeout(1000)

        messages = await page.evaluate("window.testMessages")
        print("Messages received in main monitor:", messages)

        await browser.close()

asyncio.run(run())
