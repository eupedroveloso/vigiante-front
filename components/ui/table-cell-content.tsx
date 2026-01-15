import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown } from "lucide-react"

export interface TableCellContentProps {
  variant?: "default" | "badge" | "avatar" | "switch" | "button" | "dropdown" | "progress" | "image" | "input" | "toggle-group"
  size?: "default" | "md" | "lg"
  state?: "default" | "hover"
  boldText?: boolean
  rightTextAlign?: boolean
  lastCell?: boolean
  tableCellText?: string
  descriptionText?: string
  showDescription?: boolean
  showAvatarDescription?: boolean
  className?: string
  children?: React.ReactNode
}

// Avatar component (simplified)
export const TableCellAvatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { src?: string; alt?: string; size?: "default" | "md" | "lg" }
>(({ className, src, alt, size = "default", ...props }, ref) => {
  const sizeClasses = {
    default: "size-10",
    md: "size-12",
    lg: "size-14",
  }
  
  return (
    <div
      ref={ref}
      className={cn("relative rounded-full shrink-0", sizeClasses[size], className)}
      {...props}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-full">
        <div className="absolute bg-muted inset-0 rounded-full" />
        {src && (
          <img
            alt={alt || ""}
            className="absolute max-w-none object-cover rounded-full size-full"
            src={src}
          />
        )}
      </div>
    </div>
  )
})
TableCellAvatar.displayName = "TableCellAvatar"

// Alias para compatibilidade
const Avatar = TableCellAvatar

// Switch component (simplified)
export const TableCellSwitch = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { checked?: boolean }
>(({ className, checked = false, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      className={cn(
        "inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary" : "bg-input",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform",
          checked ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  )
})
TableCellSwitch.displayName = "TableCellSwitch"

// Alias para compatibilidade
const Switch = TableCellSwitch

// Progress component (simplified)
export const TableCellProgress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number; max?: number; percent?: "0%" | "25%" | "50%" | "75%" | "100%" }
>(({ className, value, max = 100, percent, ...props }, ref) => {
  let percentage = 0
  if (percent) {
    percentage = parseInt(percent.replace("%", ""))
  } else if (value !== undefined) {
    percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  } else {
    percentage = 75 // Default
  }
  
  return (
    <div
      ref={ref}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
      {...props}
    >
      <div
        className="h-full bg-primary transition-all"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
})
TableCellProgress.displayName = "TableCellProgress"

// Alias para compatibilidade
const Progress = TableCellProgress

// Toggle Group component (simplified)
export const TableCellToggleGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { items?: string[]; value?: string; size?: "default" | "md" | "lg" }
>(({ className, items = ["Option 1", "Option 2", "Option 3"], value, size = "default", ...props }, ref) => {
  const sizeClasses = {
    default: "h-9",
    md: "h-10",
    lg: "h-11",
  }
  
  return (
    <div
      ref={ref}
      className={cn("inline-flex items-center justify-center gap-1", className)}
      {...props}
    >
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          className={cn(
            "inline-flex items-center justify-center gap-2 border border-input bg-background rounded-md shadow-xs transition-all",
            sizeClasses[size],
            "px-2 py-2.5",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
            value === item ? "bg-background text-foreground" : "hover:bg-muted/50"
          )}
        >
          <div className="size-4" />
        </button>
      ))}
    </div>
  )
})
TableCellToggleGroup.displayName = "TableCellToggleGroup"

// Alias para compatibilidade
const ToggleGroup = TableCellToggleGroup

export function TableCellContent({
  variant = "default",
  size = "default",
  state = "default",
  boldText = false,
  rightTextAlign = false,
  lastCell = false,
  tableCellText = "Table Cell Text",
  descriptionText = "Description Text",
  showDescription = false,
  showAvatarDescription = true,
  className,
  children,
}: TableCellContentProps) {
  // Se children for fornecido, renderiza diretamente
  if (children !== undefined) {
    return <div className={cn("flex items-center", state === "hover" && "bg-muted/50", className)}>{children}</div>
  }

  // Classe base para estado hover
  const hoverClass = state === "hover" ? "bg-muted/50" : ""

  // Renderiza baseado na variante
  switch (variant) {
    case "badge":
      return (
        <div className={cn("flex items-center", hoverClass, className)}>
          <Badge variant="default">{tableCellText || "Badge"}</Badge>
        </div>
      )

    case "avatar":
      return (
        <div className={cn("flex items-center gap-3", hoverClass, className)}>
          <Avatar size={size} />
          {showAvatarDescription && (
            <div className="flex flex-col">
              <p className={cn("text-sm leading-5", boldText && "font-semibold")}>
                {tableCellText}
              </p>
              {showDescription && (
                <p className="text-sm leading-5 text-muted-foreground">{descriptionText}</p>
              )}
            </div>
          )}
        </div>
      )

    case "switch":
      return (
        <div className={cn("flex items-center", hoverClass, className)}>
          <Switch />
        </div>
      )

    case "button":
      return (
        <div className={cn("flex items-center", hoverClass, className)}>
          <Button variant="outline" size="sm">
            {tableCellText || "Button"}
          </Button>
        </div>
      )

    case "dropdown":
      return (
        <div className={cn("flex items-center", hoverClass, className)}>
          <Button variant="outline" size="sm" className="gap-2">
            {tableCellText || "Dropdown"}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )

    case "progress":
      return (
        <div className={cn("flex items-center w-full", hoverClass, className)}>
          <Progress percent="75%" className="w-full" />
        </div>
      )

    case "image":
      const imageSizeClasses = {
        default: "size-10",
        md: "size-12",
        lg: "size-14",
      }
      return (
        <div className={cn("flex items-center", hoverClass, className)}>
          <div className={cn("rounded-md bg-muted border border-border flex items-center justify-center", imageSizeClasses[size || "default"])}>
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 opacity-50" />
          </div>
        </div>
      )

    case "input":
      return (
        <div className={cn("flex items-center", hoverClass, className)}>
          <Input
            type="text"
            placeholder={tableCellText || "Placeholder"}
            className="h-8 w-32"
          />
        </div>
      )

    case "toggle-group":
      return (
        <div className={cn("flex items-center", hoverClass, className)}>
          <ToggleGroup items={["", "", ""]} size={size} />
        </div>
      )

    default:
      return (
        <div
          className={cn(
            "flex flex-col justify-center",
            rightTextAlign && "text-right items-end",
            !rightTextAlign && "items-start",
            hoverClass,
            className
          )}
        >
          <p
            className={cn(
              "text-sm leading-5 overflow-ellipsis overflow-hidden whitespace-nowrap",
              boldText && "font-semibold"
            )}
          >
            {tableCellText}
          </p>
          {showDescription && (
            <p className="text-sm leading-5 text-muted-foreground overflow-ellipsis overflow-hidden whitespace-nowrap">
              {descriptionText}
            </p>
          )}
        </div>
      )
  }
}
