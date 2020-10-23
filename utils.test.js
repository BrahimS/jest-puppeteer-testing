const { defaultArgs } = require("puppeteer");
const puppeteer = require("puppeteer");
const { Browser } = require("puppeteer/lib/cjs/puppeteer/common/Browser");
const { generateText, checkAndGenerate } = require("./util");
// Unit testing
test("Should output name and age", () => {
	const text = generateText("Brahim", 43);
	expect(text).toBe("Brahim (43 years old)");
});
// Integration testing
test("Should generate a valid text output", () => {
	const text = checkAndGenerate("Brahim", 43);
	expect(text).toBe("Brahim (43 years old)");
});

// End to end testing

test("Should click the submit button", async () => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 50,
		args: ["--window-size=769,500"],
	});
	const url =
		"file:///Volumes/CIe2/Clients/BS/Dev-Courses/js-testing-introduction-starting-setup/index.html";
	const page = await browser.newPage();
	await page.goto(url);
	await page.click("input#name");
	await page.type("input#name", "Brahim");
	await page.click("input#age");
	await page.type("input#age", "43");
	await page.click("#btnAddUser");
	// Check if an Element does exisit
	const output = await page.$eval(".user-item", (el) => el.textContent);
	expect(output).toBe("Brahim (43 years old)");
}, 10000);
