import type { Plugin } from 'vite'

export interface ContentlayerOptions {
  clearCache?: boolean
  configPath?: string | undefined
  verbose?: boolean
  isDev?: boolean
  contentDirPath?: string
  generatedDirPath?: string
}

export declare function contentlayer(options?: ContentlayerOptions): Plugin

export default contentlayer
