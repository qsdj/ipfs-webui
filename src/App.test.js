/* global it beforeAll afterAll, expect */
import Path from 'path'
import Http from 'http'
import ecstatic from 'ecstatic'
import React from 'react'
import ReactDOM from 'react-dom'
import puppeteer from 'puppeteer'
import App from './App'

let browser, server

beforeAll(async () => {
  server = Http.createServer(ecstatic({root: Path.join(__dirname, '..', 'build')})).listen(3001)
  browser = await puppeteer.launch()
})

afterAll(() => {
  server.close()
  browser.close()
})

it('example test', async () => {
  const page = await browser.newPage()
  await page.goto('http://localhost:3001')
  await page.waitForSelector('[data-id=title]')

  let title = await page.$('[data-id=title]')
  let titleText = await page.evaluate(el => el.innerHTML, title)
  expect(titleText).toBe('Status')

  await page.click('nav a[href="#/files"]')

  title = await page.$('[data-id=title]')
  titleText = await page.evaluate(el => el.innerHTML, title)
  expect(titleText).toBe('Files')

  await page.click('nav a[href="#/ipld"]')

  title = await page.$('[data-id=title]')
  titleText = await page.evaluate(el => el.innerHTML, title)
  expect(titleText).toBe('IPLD')

  await page.click('nav a[href="#/peers"]')

  title = await page.$('[data-id=title]')
  titleText = await page.evaluate(el => el.innerHTML, title)
  expect(titleText).toBe('Peers')

  await page.click('nav a[href="#/settings"]')

  title = await page.$('[data-id=title]')
  titleText = await page.evaluate(el => el.innerHTML, title)
  expect(titleText).toBe('Settings')

  await page.click('nav a[href="#/"]')

  title = await page.$('[data-id=title]')
  titleText = await page.evaluate(el => el.innerHTML, title)
  expect(titleText).toBe('Status')
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
