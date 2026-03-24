import React from 'react'
import { Box, Text } from 'ink'
import { Select } from '@inkjs/ui'

const items = [
  { label: 'Descargar audio o video', value: 'download' },
  { label: 'Salir',                   value: 'exit'     },
]

type Props = {
  onSelect: (value: string) => void
}

export const MenuView = ({ onSelect }: Props) => {
  return (
    <Box flexDirection="column" gap={1} paddingX={2} paddingY={1}>

      <Box flexDirection="column" marginBottom={1}>
        <Text bold color="cyan">┌───────────────────────────────┐</Text>
        <Text bold color="cyan">│ Mimascot Downloader - YT V.01 │</Text>
        <Text bold color="cyan">└───────────────────────────────┘</Text>
      </Box>

      <Text dimColor>Usa las flechas ↑ ↓ y Enter para elegir:</Text>

      <Select options={items} onChange={(value) => onSelect(value)} />

    </Box>
  )
}
