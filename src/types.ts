export interface PrefixItem {
  prefixCls: string
  hashPriority?: 'low' | 'high'
}

export interface PluginOptions {
  prefixes?: (string | PrefixItem)[]
  /** ThemeConfig["token"] of antd */
  tokens?: {
    /** antd default colorPrimary #1677FF */
    colorPrimary?: string
  }
  /** Custom fixes usage, all enabled as default */
  fixes?: {
    button?: boolean
    anchor?: boolean
  }
}
