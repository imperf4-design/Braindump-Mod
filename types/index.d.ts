export type Phase = 'idle' | 'working' | 'done' | 'error'

declare module 'claude-code' {
  interface PluginState {
    braindump: {
      draft: string
      phase: Phase
      original: string
      isMinimized: boolean
    }
  }
}
