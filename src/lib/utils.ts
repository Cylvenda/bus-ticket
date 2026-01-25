import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date to readable format
 * @param date - ISO date string or Date object
 * @returns Formatted date string (e.g., "Jan 24, 2026")
 */
export function formatDate(date: string | Date): string {
  if (!date) return "N/A"

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(dateObj)
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid date"
  }
}

/**
 * Format time from ISO string or time string
 * @param time - ISO datetime string or time string
 * @returns Formatted time (e.g., "10:30 PM")
 */
export function formatTime(time: string): string {
  if (!time) return "N/A"

  try {
    // If it's a full ISO datetime string
    if (time.includes("T") || time.includes(" ")) {
      const dateObj = new Date(time)
      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(dateObj)
    }

    // If it's just a time string (HH:MM or HH:MM:SS)
    const [hours, minutes] = time.split(":")
    const date = new Date()
    date.setHours(parseInt(hours), parseInt(minutes))

    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date)
  } catch (error) {
    console.error("Error formatting time:", error)
    return time
  }
}

/**
 * Format currency with proper locale
 * @param amount - Number to format
 * @param currency - Currency code (default: TZS)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = "TZS"): string {
  if (amount == null) return "N/A"

  try {
    // For Tanzanian Shillings, use a custom format since Intl might not support it well
    if (currency === "TZS") {
      return `${amount.toLocaleString("en-US")} ${currency}`
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch (error) {
    console.error("Error formatting currency:", error)
    return `${amount} ${currency}`
  }
}

/**
 * Format relative time (e.g., "2 hours ago")
 * @param date - ISO date string or Date object
 * @returns Relative time string
 */
export function formatRelativeTime(date: string | Date): string {
  if (!date) return "N/A"

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date
    const now = new Date()
    const diffMs = now.getTime() - dateObj.getTime()
    const diffSecs = Math.floor(diffMs / 1000)
    const diffMins = Math.floor(diffSecs / 60)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 7) {
      return formatDate(dateObj)
    } else if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
    } else if (diffMins > 0) {
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`
    } else {
      return "Just now"
    }
  } catch (error) {
    console.error("Error formatting relative time:", error)
    return "Invalid date"
  }
}