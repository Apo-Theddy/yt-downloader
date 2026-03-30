import React from 'react'
import { Box, Text } from 'ink'
import { Spinner } from '@inkjs/ui'

type Status = 'idle' | 'opening' | 'selected' | 'error'

type Props = {
  status: Status
  folderPath: string
  errorMessage: string
  onOpen: () => void
  onConfirm: () => void
  onBack: () => void
}

export const OpenFolderView = ({
  status,
  folderPath,
  errorMessage,
  onOpen,
  onConfirm,
  onBack,
}: Props) => {
  return (
    <Box flexDirection="column" gap={1} paddingX={2} paddingY={1}>

      <Box flexDirection="column" marginBottom={1}>
        <Text bold color="cyan">¿Dónde guardar el archivo?</Text>
        <Text dimColor>Se abrirá el explorador de archivos de tu sistema.</Text>
      </Box>

      {status === 'opening' && (
        <Box gap={2}>
          <Spinner label="Abriendo explorador de archivos..." />
          <Text dimColor>Esperando a que selecciones una carpeta...</Text>
        </Box>
      )}

      {status === 'selected' && (
        <Box flexDirection="column" gap={1}>
          <Box gap={1}>
            <Text color="green">✓ Carpeta seleccionada:</Text>
            <Text bold>{folderPath}</Text>
          </Box>
          <Box gap={2} marginTop={1}>
            <Text dimColor>[ Enter ] Confirmar y continuar</Text>
            <Text dimColor>[ R ]     Elegir otra carpeta</Text>
            <Text dimColor>[ Esc ]   Volver</Text>
          </Box>
        </Box>
      )}

      {status === 'error' && (
        <Box flexDirection="column" gap={1}>
          <Text color="red">✗ Error: {errorMessage}</Text>
          <Box gap={2} marginTop={1}>
            <Text dimColor>[ Enter ] Intentar de nuevo</Text>
            <Text dimColor>[ Esc ]   Volver</Text>
          </Box>
        </Box>
      )}

    </Box>
  )
}
