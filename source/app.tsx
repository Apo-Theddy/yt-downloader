import React, { useState } from 'react'
import { Box } from 'ink'

import { MenuView }               from './view/menuView.js'
import { SelectTypeView }         from './view/selectTypeView.js'
import { SelectQualityVideoView } from './view/selectQualityVideoView.js'
import { SelectQualityAudioView } from './view/selectQualityAudioView.js'

type Screen =
  | 'MENU'
  | 'INPUT URL'
  | 'SELECT TYPE'
  | 'SELECT QUALITY VIDEO'
  | 'SELECT QUALITY AUDIO'
  | 'DOWNLOADING'
  | 'SUCCESS'

export const App = () => {
  const [screen, setScreen] = useState<Screen>('MENU')
  const [url] = useState('')
  const [type, setType] = useState<'video' | 'audio' | null>(null)
  const [quality, setQuality] = useState('')

  return (
    <Box flexDirection="column">

      {screen === 'MENU' && (
        <MenuView
          onSelect={(value) => {
            if (value === 'exit') process.exit(0)
            if (value === 'download') setScreen('SELECT TYPE')
          }}
        />
      )}

      {screen === 'SELECT TYPE' && (
        <SelectTypeView
          url={url}
          onSelect={(selectedType) => {
            setType(selectedType)
            setScreen(
              selectedType === 'video'
                ? 'SELECT QUALITY VIDEO'
                : 'SELECT QUALITY AUDIO'
            )
          }}
          onBack={() => setScreen('MENU')}
        />
      )}

      {screen === 'SELECT QUALITY VIDEO' && (
        <SelectQualityVideoView
          onSelect={(quality) => {
            setQuality(quality)
            setScreen('DOWNLOADING')
          }}
          onBack={() => setScreen('SELECT TYPE')}
        />
      )}

      {screen === 'SELECT QUALITY AUDIO' && (
        <SelectQualityAudioView
          onSelect={(quality) => {
            setQuality(quality)
            setScreen('DOWNLOADING')
          }}
          onBack={() => setScreen('SELECT TYPE')}
        />
      )}

      {screen === 'DOWNLOADING' && (
        <Box flexDirection="column" paddingX={2} paddingY={1}>
          {/* Pendiente el downloadingView */}
        </Box>
      )}

    </Box>
  )
}
