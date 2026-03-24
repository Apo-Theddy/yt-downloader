import React from 'react'
import { Box, Text, useInput } from 'ink'
import { Select } from '@inkjs/ui'

const items = [
  { label: '128k — estándar',      value: '128k' },
  { label: '256k — buena calidad', value: '256k' },
  { label: '320k — máxima calidad', value: '320k' },
]

type Props = {
  onSelect: (quality: string) => void
  onBack: () => void
}

export const SelectQualityAudioView = ({ onSelect, onBack }: Props) => {
  useInput((_, key) => {
    if (key.escape) onBack()
  })

  return (
    <Box flexDirection="column" gap={1} paddingX={2} paddingY={1}>

      <Box flexDirection="column" marginBottom={1}>
        <Text bold color="cyan">Selecciona la calidad del audio</Text>
        <Text dimColor>320k es prácticamente indistinguible del original.</Text>
      </Box>

      <Select options={items} onChange={(value) => onSelect(value)} />

      <Text dimColor>Presiona Esc para volver</Text>

    </Box>
  )
}
