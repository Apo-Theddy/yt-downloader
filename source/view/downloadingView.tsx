import React from 'react'
import { Box, Text } from 'ink'
import { ProgressBar } from '@inkjs/ui'

type Props = {
  url: string
  type: 'video' | 'audio' | null
  quality: string
  folderPath: string 
  progress: number
}

export const DownloadingView = ({ url, type, quality, folderPath, progress }: Props) => {
  return (
    <Box flexDirection="column" gap={1} paddingX={2} paddingY={1}>

      <Box flexDirection="column" marginBottom={1}>
        <Text bold color="cyan">Descargando...</Text>
        <Text dimColor>{url}</Text>
      </Box>

      <Box gap={2}>
        <Text color="yellow">Tipo:</Text>
        <Text>{type === 'video' ? 'Video (mp4)' : 'Audio (mp3)'}</Text>
        <Text color="yellow">Calidad:</Text>
        <Text>{quality}</Text>
        <Text color="yellow">Guardar en:</Text>
        <Text>{folderPath}</Text>
      </Box>

      <Box flexDirection="column" gap={1} marginTop={1}>
        <Box gap={1}>
          <Text dimColor>{progress}%</Text>
        </Box>
        <ProgressBar value={progress} />
      </Box>

    </Box>
  )
}
