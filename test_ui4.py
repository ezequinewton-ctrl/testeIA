import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Open page
        page = await browser.new_page()
        page2 = await browser.new_page()

        await page.goto("file:///app/index.html")
        await page2.goto("file:///app/index.html?tela=2")

        page.on("dialog", lambda dialog: dialog.accept())  # accept confirm dialog

        # In monitor 2, we want to intercept window.print
        await page2.evaluate("""
            window.print_called = false;
            window.print = function() {
                window.print_called = true;
            };
        """)

        await page.wait_for_timeout(1000)

        # Call verificarEImprimir in main page
        await page.evaluate("verificarEImprimir()")

        await page.wait_for_timeout(1000)

        print_called = await page2.evaluate("window.print_called")
        print("Was window.print called in Monitor 2?", print_called)

        await browser.close()

asyncio.run(run())
