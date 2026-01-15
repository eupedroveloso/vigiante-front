import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  TableCellContent,
  type TableCellContentProps,
  TableCellAvatar,
  TableCellSwitch,
  TableCellProgress,
  TableCellToggleGroup,
} from "@/components/ui/table-cell-content"

const tableVariants = cva(
  "w-full caption-bottom text-sm",
  {
    variants: {
      variant: {
        default: "",
        bordered: "border-collapse border border-border",
        striped: "[&_tbody_tr:nth-child(even)]:bg-muted/50",
        compact: "[&_th]:h-10 [&_th]:px-2 [&_td]:px-2 [&_td]:py-1",
        hover: "[&_tbody_tr]:hover:bg-muted/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn(tableVariants({ variant }), className)}
        {...props}
      />
    </div>
  )
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const tableRowVariants = cva(
  "border-b transition-colors data-[state=selected]:bg-muted",
  {
    variants: {
      variant: {
        default: "hover:bg-muted/50",
        hover: "hover:bg-muted",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, variant, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(tableRowVariants({ variant }), className)}
      {...props}
    />
  )
)
TableRow.displayName = "TableRow"

const tableCellVariants = cva(
  "align-middle text-sm leading-5 [&:has([role=checkbox])]:pr-0",
  {
    variants: {
      size: {
        default: "p-4",
        md: "px-4 py-3",
        lg: "px-4 py-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableCellVariants>,
    Omit<TableCellContentProps, "className" | "children" | "size"> {
  // Props específicas do TableCell que não estão no TableCellContent
  // size é herdado de VariantProps<typeof tableCellVariants>
  // Todas as outras props são herdadas de TableCellContentProps
}

const tableHeadVariants = cva(
  "text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
  {
    variants: {
      size: {
        default: "h-12 px-4",
        md: "h-14 px-4",
        lg: "h-16 px-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableHeadVariants> {}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(tableHeadVariants({ size }), className)}
        {...props}
      />
    )
  }
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({
    className,
    size,
    variant = "default",
    boldText,
    rightTextAlign,
    lastCell,
    state = "default",
    tableCellText,
    descriptionText,
    showDescription,
    showAvatarDescription,
    children,
    ...props
  }, ref) => {
    // Se children for fornecido, renderiza diretamente
    const hasCustomContent = children !== undefined

    return (
      <td
        ref={ref}
        className={cn(
          tableCellVariants({ size }),
          !hasCustomContent && rightTextAlign && "text-right",
          className
        )}
        {...props}
      >
        {hasCustomContent ? (
          children
        ) : (
          <TableCellContent
            variant={variant}
            size={(size as "default" | "md" | "lg") || "default"}
            state={state}
            boldText={boldText}
            rightTextAlign={rightTextAlign}
            lastCell={lastCell}
            tableCellText={tableCellText}
            descriptionText={descriptionText}
            showDescription={showDescription}
            showAvatarDescription={showAvatarDescription}
          />
        )}
      </td>
    )
  }
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  // Re-exportar componentes e tipos do table-cell-content para facilitar o uso
  TableCellContent,
  TableCellAvatar,
  TableCellSwitch,
  TableCellProgress,
  TableCellToggleGroup,
  type TableCellContentProps,
}
