import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a base64 string to a valid image src for use in the <img src="..." /> attribute.
 * If the string is already a data URL, returns as is. Otherwise, tries to infer the mime type or uses a generic image/* type.
 * @param base64 - The base64 string from the backend
 * @param mimeType - Optional: the image mime type (e.g., 'image/png'). If not provided, tries to infer or uses 'image/*'.
 * @returns A string suitable for the src attribute
 */
export function base64ToImgSrc(base64: string, mimeType?: string): string {
  if (!base64) return ''
  if (base64.startsWith('data:image')) return base64

  // Try to infer mime type from base64 header if present
  // e.g., '/9j/' for jpeg, 'iVBORw0KGgo' for png, 'R0lGOD' for gif
  let detectedType = 'image/*'
  if (!mimeType) {
    if (base64.startsWith('/9j/')) detectedType = 'image/jpeg'
    else if (base64.startsWith('iVBORw0KGgo')) detectedType = 'image/png'
    else if (base64.startsWith('R0lGOD')) detectedType = 'image/gif'
    else if (base64.startsWith('Qk')) detectedType = 'image/bmp'
    else if (base64.startsWith('SUkq')) detectedType = 'image/tiff'
    else if (base64.startsWith('UEsDB')) detectedType = 'image/webp'
  } else {
    detectedType = mimeType
  }
  return `data:${detectedType};base64,${base64}`
}
