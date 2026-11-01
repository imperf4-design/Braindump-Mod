import { expect, test } from 'claude-code/testing'

const BAND = {
  plugin: 'braindump',
  component: 'AbovePrompt',
  requestId: 'band',
  props: { hasSurvey: false, isWorking: false },
} as const

const LONG = 'Also ähm, schreib mir die Beschreibung für den Newsletter. Mit Kapiteln und Zeitstempeln.'

test('short dictation reads along, long one offers the button, and Haiku structures it', async ($, on) => {
  let model = ''
  let filled = ''
  on('prompt.read', () => ({ value: { text: LONG, cursor: LONG.length } }))
  on('model.complete', (_, e) => {
    model = JSON.stringify(e)
    return { value: { isAnswered: true, text: 'Schreib die Newsletter-Beschreibung.', usage: {} } } as never
  })
  on('prompt.fill', (_, e) => {
    filled = e.text
    return { isFilled: true } as never
  })
  on('prompt.change', (_, e) => ({ text: e.text }))
  on('ui.toast', () => ({ value: undefined }) as never)
  on('ui.render', ($, e) => {
    const { Text } = $.ui.resolve(e)

    return <Text>engine</Text>
  })

  const empty = await $.ui.mount({ ...BAND, surface: 'terminal' })
  expect(await empty.find({ type: 'Text', text: /Braindump/ })).toBeUndefined()
  await empty.unmount()

  await $.prompt.change({ text: 'Mach mal.', cursor: 9, origin: { kind: 'engine' } })
  const short = await $.ui.mount({ ...BAND, surface: 'terminal' })
  expect(await short.find({ type: 'Text', text: /Liest mit/ })).toBeDefined()
  await short.unmount()

  await $.prompt.change({ text: LONG, cursor: LONG.length, origin: { kind: 'engine' } })
  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({ ...BAND, surface })
    expect(await ui.find({ type: 'Text', text: /Langes Diktat erkannt/ })).toBeDefined()
    await ui.unmount()
  }

  const ui = await $.ui.mount({ ...BAND, surface: 'terminal' })
  await ui.press({ key: 'structure' })

  expect(JSON.parse(model).model).toBe('haiku')
  expect(filled).toBe('Schreib die Newsletter-Beschreibung.')
  expect(await ui.find({ type: 'Text', text: /Prompt strukturiert/ })).toBeDefined()
  await ui.unmount()
})
