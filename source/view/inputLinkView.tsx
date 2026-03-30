import React from 'react'
import { Box, Text, useInput } from 'ink'
import { TextInput } from '@inkjs/ui'

type Props = {
  onSubmit: (url: string) => void
  onBack: () => void
}

export const InputUrlView = ({ onSubmit, onBack }: Props) => {
  useInput((_, key) => {
    if (key.escape) onBack()
  })

  return (
    <Box flexDirection="column" gap={1} paddingX={2} paddingY={1}>

      <Box flexDirection="column" marginBottom={1}>
        <Text bold color="cyan">Ingresa el link de YouTube</Text>
        <Text dimColor>Pega la URL y presiona Enter para continuar.</Text>
      </Box>

      <Box gap={1}>
        <Text color="yellow">URL:</Text>
        <TextInput
          placeholder="https://www.youtube.com/watch?v=..."
          onSubmit={(value) => {
            if (value.trim().length > 0) onSubmit(value.trim())
          }}
        />
      </Box>

      <Text dimColor>Presiona Esc para volver</Text>

    </Box>
  )
}
