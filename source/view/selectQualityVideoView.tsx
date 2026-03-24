import React from 'react'
import { Box, Text, useInput } from 'ink'
import { Select } from '@inkjs/ui'

const items = [
  { label: '144p  — muy ligero',   value: '144'  },
  { label: '360p  — ligero',       value: '360'  },
  { label: '480p  — estándar',     value: '480'  },
  { label: '720p  — HD',           value: '720'  },
  { label: '1080p — Full HD',      value: '1080' },
  { label: '2K    — alta calidad', value: '2k'   },
]

type Props = {
  onSelect: (quality: string) => void
  onBack: () => void
}

export const SelectQualityVideoView = ({ onSelect, onBack }: Props) => {
  useInput((_, key) => {
    if (key.escape) onBack()
  })

  return (
    <Box flexDirection="column" gap={1} paddingX={2} paddingY={1}>

      <Box flexDirection="column" marginBottom={1}>
        <Text bold color="cyan">Selecciona la calidad del video</Text>
        <Text dimColor>A mayor calidad, mayor tamaño de archivo.</Text>
      </Box>

      <Select options={items} onChange={(value) => onSelect(value)} />

      <Text dimColor>Presiona Esc para volver</Text>

    </Box>
  )
}
