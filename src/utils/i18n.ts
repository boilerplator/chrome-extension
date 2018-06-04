export default new Proxy({
  extension: {
    'default': 'Extension',
    'en-US': 'Extension',
    'zh-CN': '扩展',
  },
  app: {
    'default': 'Application',
    'en-US': 'Application',
    'zh-CN': '应用',
  },
  search: {
    'default': 'Search',
    'en-US': 'Search',
    'zh-CN': '搜索',
  },
  install: {
    'default': 'INSTALL',
    'en-US': 'INSTALL',
    'zh-CN': '安装',
  },
  doesnotexist: {
    'default': 'What your search does not exist.',
    'en-US': 'What your search does not exist.',
    'zh-CN': '您搜索的应用不存在。',
  },
  issue: {
    'default': 'Make an issue ?',
    'en-US': 'Make an issue ?',
    'zh-CN': '贡献一个？',
  },
}, {
  get(target, key, receiver) {
    const lang = navigator && navigator.language || 'default';
    return Reflect.get(target, key, receiver)[lang];
  },
});