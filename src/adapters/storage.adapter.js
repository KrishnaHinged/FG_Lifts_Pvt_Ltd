import storageConfig from '@/config/storage'

export function getAssetUrl(pathStr) {
  if (!pathStr) return ''
  if (pathStr.startsWith('http://') || pathStr.startsWith('https://')) {
    return pathStr
  }
  const prefix = storageConfig.staticAssetsPrefix
  const cleanPath = pathStr.startsWith('/') ? pathStr : `/${pathStr}`
  if (cleanPath.startsWith(prefix)) {
    return cleanPath
  }
  return `${prefix}${cleanPath}`
}

export default {
  getAssetUrl
}
