import path from 'path'

import { ProcessEnv } from './environment'

const appRoot = path.resolve(__dirname, '../../..')

export interface Config {
  git: GitOptions
  version: string
  redis: string
}

interface GitOptions {
  root: string
}

const createGitConfig = (env: ProcessEnv): GitOptions => {
  const root =
    env.NODE_ENV == 'development' || env.NODE_ENV == 'test'
      ? path.resolve(appRoot, 'git-repos', env.NODE_ENV)
      : '/git-repos'

  return {
    root,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createVersionConfig = (env: ProcessEnv, fs: any): string => {
  const buildNumPath = path.resolve(appRoot, '.build-number')
  if (!fs.existsSync(buildNumPath)) {
    throw new Error(`Build number file not found at ${buildNumPath}`)
  }
  return `${env.npm_package_version}.${fs.readFileSync(buildNumPath)}`
}

const createRedisConfig = (env: ProcessEnv): string => {
  if (!env.REDIS_URL) throw new Error('Please set REDIS_URL')
  return env.REDIS_URL
}

export const createConfig = (env: ProcessEnv = process.env, fs = require('fs')): Config => {
  if (!env.NODE_ENV) throw new Error('Please set NODE_ENV')
  return {
    git: createGitConfig(env),
    version: createVersionConfig(env, fs),
    redis: createRedisConfig(env),
  }
}
