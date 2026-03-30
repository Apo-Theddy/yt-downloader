import { useState } from 'react'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

type Status = 'idle' | 'opening' | 'selected' | 'error'

export const useOpenFolder = () => {
  const [status, setStatus] = useState<Status>('idle')
  const [folderPath, setFolderPath] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const openPicker = async () => {
    setStatus('opening')
    setErrorMessage('')

    try {
      const platform = process.platform
      let path = ''

      if (platform === 'linux') {
        try {
          await execAsync('which zenity')

          const { stdout, stderr } = await execAsync(
            'zenity --file-selection --directory --title="Selecciona la carpeta para guardar"'
          )

          path = stdout.trim()

          if (!path && stderr) {
            throw new Error('Zenity cancelado o error')
          }
        } catch (error: any) {
          try {
            await execAsync('which yad')
            const { stdout } = await execAsync(
              'yad --file --directory --title="Selecciona la carpeta para guardar" --width=700 --height=500'
            )
            path = stdout.trim()
          } catch {
            throw new Error('No se pudo abrir el selector. Instala zenity: sudo pacman -S zenity')
          }
        }
      }
      else if (platform === 'darwin') {
        const { stdout } = await execAsync(
          'osascript -e \'tell app "Finder" to POSIX path of (choose folder with prompt "Selecciona una carpeta")\''
        )
        path = stdout.trim()
      }
      else if (platform === 'win32') {
        const { stdout } = await execAsync(
          'powershell -command "Add-Type -AssemblyName System.Windows.Forms; $f = New-Object System.Windows.Forms.FolderBrowserDialog; $f.ShowDialog() | Out-Null; $f.SelectedPath"'
        )
        path = stdout.trim()
      }
      else {
        throw new Error('Sistema operativo no soportado')
      }

      if (path && path !== '') {
        setFolderPath(path)
        setStatus('selected')
      } else {
        setStatus('idle')
      }
    } catch (error: any) {
      setStatus('error')
      setErrorMessage(error.message || 'No se pudo abrir el selector de carpetas')
    }
  }

  const reset = () => {
    setStatus('idle')
    setFolderPath('')
    setErrorMessage('')
  }

  return { status, folderPath, errorMessage, openPicker, reset }
}
