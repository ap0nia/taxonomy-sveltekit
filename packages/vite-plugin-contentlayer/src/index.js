// @ts-check

import * as core from '@contentlayer/core'
import { errorToString, fs } from '@contentlayer/utils'
import { E, OT, pipe, S, T } from '@contentlayer/utils/effect'

/**
 * Contentlayer Vite plugin.
 *
 * @param {import('.').ContentlayerOptions?} options
 * @returns {import('vite').Plugin}
 */
export function contentlayer(options = null) {
  const resolvedOptions = {
    generatedDirPath: '.contentlayer',
    contentDirPath: 'content',
    clearCache: false,
    configPath: undefined,
    verbose: false,
    isDev: true,
    ...options,
  }

  /**
   * @type {ReturnType<typeof startContentlayerDevelopmentWatch>}
   */
  let contentLayerWatcher

  /**
   * @see https://github.com/contentlayerdev/contentlayer/blob/main/packages/%40contentlayer/cli/src/commands/DevCommand.ts
   */
  const startContentlayerDevelopmentWatch = async () => {
    /**
     * Promise that runs in the background while the server is running.
     * TODO: terminate gracefully when the server is stopped.
     */
    pipe(
      pipe(
        S.fromEffect(
          T.gen(function* ($) {
            if (resolvedOptions.clearCache) {
              const cwd = yield* $(core.getCwd)
              const artifactsDir = core.ArtifactsDir.getDirPath({ cwd })
              yield* $(fs.rm(artifactsDir, { recursive: true, force: true }))
              yield* $(T.log('Cache cleared successfully'))
            }
          }),
        ),
        S.chain(() => core.getConfigWatch({ configPath: resolvedOptions.configPath })),
        S.tapSkipFirstRight(() =>
          T.log(`Contentlayer config change detected. Updating type definitions and data...`),
        ),
        S.tapRight((config) =>
          config.source.options.disableImportAliasWarning ? T.unit : T.fork(core.validateTsconfig),
        ),
        S.chainSwitchMapEitherRight((config) =>
          core.generateDotpkgStream({
            config,
            verbose: resolvedOptions.verbose,
            isDev: resolvedOptions.isDev,
          }),
        ),
        S.tap(E.fold((error) => T.log(errorToString(error)), core.logGenerateInfo)),
        OT.withStreamSpan('@contentlayer/cli/commands/DevCommand:stream'),
        S.runDrain,
        OT.withSpan('@contentlayer/cli/commands/DevCommand:executeSafe'),
      ),
      core.runMain({
        tracingServiceName: 'contentlayer-cli',
        verbose: resolvedOptions.verbose || process.env['CL_DEBUG'] !== undefined,
      }),
    )
  }

  /**
   * @see https://github.com/contentlayerdev/contentlayer/blob/main/packages/%40contentlayer/cli/src/commands/BuildCommand.ts
   */
  const buildContentlayer = async () => {
    return pipe(
      pipe(
        T.gen(function* ($) {
          if (resolvedOptions.clearCache) {
            const cwd = yield* $(core.getCwd)
            const artifactsDir = core.ArtifactsDir.getDirPath({ cwd })
            yield* $(fs.rm(artifactsDir, { recursive: true, force: true }))
            yield* $(T.log('Cache cleared successfully'))
          }
        }),
        T.chain(() => core.getConfig({ configPath: resolvedOptions.configPath })),
        T.tap((config) =>
          config.source.options.disableImportAliasWarning ? T.unit : T.fork(core.validateTsconfig),
        ),
        T.chain((config) => core.generateDotpkg({ config, verbose: resolvedOptions.verbose })),
        T.tap(core.logGenerateInfo),
        OT.withSpan('@contentlayer/cli/commands/BuildCommand:executeSafe'),
      ),
      core.runMain({
        tracingServiceName: 'contentlayer-cli',
        verbose: resolvedOptions.verbose || process.env['CL_DEBUG'] !== undefined,
      }),
    )
  }

  return {
    name: 'vite-plugin-contentlayer',

    /**
     * Add additional directories to the Vite server's file serving list.
     */
    async config() {
      return {
        server: {
          fs: {
            allow: [resolvedOptions.contentDirPath, resolvedOptions.generatedDirPath],
          },
        },
      }
    },

    /**
     * When development server starts, start contentlayer development watch.
     */
    async configureServer() {
      contentLayerWatcher = startContentlayerDevelopmentWatch()
    },

    /**
     * When build starts, build contentlayer.
     */
    async buildStart() {
      await buildContentlayer()
    },

    /**
     * TODO: When build ends, stop the contentlayer development watch.
     */
    async buildEnd() {
      if (contentLayerWatcher !== undefined) {
        contentLayerWatcher
      }
    },
  }
}

export default contentlayer
