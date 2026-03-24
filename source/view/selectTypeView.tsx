import React from 'react'
import { Box, Text, useInput } from 'ink'
import { Select } from '@inkjs/ui'

const items = [
  { label: '  Video  (mp4)', value: 'video' },
  { label: '  Audio  (mp3)', value: 'audio' },
]

type Props = {
  url: string
  onSelect: (type: 'video' | 'audio') => void
  onBack: () => void
}

export const SelectTypeView = ({ url, onSelect, onBack }: Props) => {
  useInput((_, key) => {
    if (key.escape) onBack()
  })

  return (
    <Box flexDirection="column" gap={1} paddingX={2} paddingY={1}>

      <Text bold color="cyan">¿Qué deseas descargar?</Text>

      <Box>
        <Text dimColor>URL: </Text>
        <Text color="white">{url}</Text>
      </Box>

      <Select
        options={items}
        onChange={(value) => onSelect(value as 'video' | 'audio')}
      />

      <Text dimColor>Presiona Esc para volver</Text>

    </Box>
  )
}
