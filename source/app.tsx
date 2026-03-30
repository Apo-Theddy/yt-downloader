import React, { useState, useEffect } from 'react'
import { Box, useInput } from 'ink'
import { MenuView }               from './view/menuView.js'
import { InputUrlView }           from './view/inputLinkView.js'
import { SelectTypeView }         from './view/selectTypeView.js'
import { SelectQualityVideoView } from './view/selectQualityVideoView.js'
import { SelectQualityAudioView } from './view/selectQualityAudioView.js'
import { DownloadingView }        from './view/downloadingView.js'
import { OpenFolderView }         from './view/openFolderView.js'
import { useOpenFolder }          from './hooks/openFolder.js'

type Screen =
  | 'MENU'
  | 'INPUT URL'
  | 'SELECT TYPE'
  | 'SELECT QUALITY VIDEO'
  | 'SELECT QUALITY AUDIO'
  | 'FOLDER PICKER'
  | 'DOWNLOADING'

export default function App() {
  const [screen, setScreen]   = useState<Screen>('MENU')
  const [url, setUrl]         = useState('')
  const [type, setType]       = useState<'video' | 'audio' | null>(null)
  const [quality, setQuality] = useState('')
  const { status, folderPath, errorMessage, openPicker, reset } = useOpenFolder()

  useEffect(() => {
    if (screen === 'FOLDER PICKER' && status === 'idle') {
      openPicker()
    }
  }, [screen, status, openPicker])

  useInput((input, key) => {
    if (screen !== 'FOLDER PICKER') return

    if (key.return) {
      if (status === 'selected') {
        setScreen('DOWNLOADING')
      } else if (status === 'error') {
        openPicker()
      }
    }

    if (input === 'r' && status === 'selected') {
      reset()
      openPicker()
    }

    if (key.escape) {
      reset()
      if (type === 'video') {
        setScreen('SELECT QUALITY VIDEO')
      } else if (type === 'audio') {
        setScreen('SELECT QUALITY AUDIO')
      } else {
        setScreen('SELECT TYPE')
      }
    }
  })

  return (
    <Box flexDirection="column">

      {screen === 'MENU' && (
        <MenuView
          onSelect={(value) => {
            if (value === 'exit') process.exit(0)
            if (value === 'download') setScreen('INPUT URL')
          }}
        />
      )}

      {screen === 'INPUT URL' && (
        <InputUrlView
          onSubmit={(value) => {
            setUrl(value)
            setScreen('SELECT TYPE')
          }}
          onBack={() => setScreen('MENU')}
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
          onBack={() => setScreen('INPUT URL')}
        />
      )}

      {screen === 'SELECT QUALITY VIDEO' && (
        <SelectQualityVideoView
          onSelect={(quality) => {
            setQuality(quality)
            setScreen('FOLDER PICKER')
          }}
          onBack={() => setScreen('SELECT TYPE')}
        />
      )}

      {screen === 'SELECT QUALITY AUDIO' && (
        <SelectQualityAudioView
          onSelect={(quality) => {
            setQuality(quality)
            setScreen('FOLDER PICKER')
          }}
          onBack={() => setScreen('SELECT TYPE')}
        />
      )}

      {screen === 'FOLDER PICKER' && (
        <OpenFolderView
          status={status}
          folderPath={folderPath}
          errorMessage={errorMessage}
          onOpen={openPicker}
          onConfirm={() => setScreen('DOWNLOADING')}
          onBack={() => {
            reset()
            setScreen(type === 'video' ? 'SELECT QUALITY VIDEO' : 'SELECT QUALITY AUDIO')
          }}
        />
      )}

      {screen === 'DOWNLOADING' && (
        <DownloadingView
          url={url}
          type={type}
          quality={quality}
          folderPath={folderPath}
          progress={0}
        />
      )}

    </Box>
  )
}
