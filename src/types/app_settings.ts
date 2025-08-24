interface AppSettings {
  app: {
    name: string
    description: string
    logo: string
    maintenance_mode: boolean
    support_email: string
    copyright: string
    version: string
  }

  users: {
    max_playlist_size: number
    max_playlists_per_user: number
  }

  security: {
    require_email_verification: boolean
    session_timeout_hours: number
    max_login_attempts: number
    enable_explicit_content: boolean
  }
}

export default AppSettings