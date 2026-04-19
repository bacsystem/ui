'use client'

import { forwardRef } from 'react'
import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}
export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {}
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}
export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {}

export const Table = forwardRef<HTMLTableElement, TableProps>(({ className = '', children, ...props }, ref) => (
  <div className="bac-table">
    <table ref={ref} className={cn('bac-table__table', className)} {...props}>
      {children}
    </table>
  </div>
))

Table.displayName = 'Table'

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className = '', ...props }, ref) => (
  <thead ref={ref} className={cn('bac-table__header', className)} {...props} />
))

TableHeader.displayName = 'TableHeader'

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className = '', ...props }, ref) => (
  <tbody ref={ref} className={cn('bac-table__body', className)} {...props} />
))

TableBody.displayName = 'TableBody'

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(({ className = '', ...props }, ref) => (
  <tfoot ref={ref} className={cn('bac-table__footer', className)} {...props} />
))

TableFooter.displayName = 'TableFooter'

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ className = '', ...props }, ref) => (
  <tr ref={ref} className={cn('bac-table__row', className)} {...props} />
))

TableRow.displayName = 'TableRow'

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(({ className = '', ...props }, ref) => (
  <th ref={ref} className={cn('bac-table__head', className)} {...props} />
))

TableHead.displayName = 'TableHead'

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({ className = '', ...props }, ref) => (
  <td ref={ref} className={cn('bac-table__cell', className)} {...props} />
))

TableCell.displayName = 'TableCell'

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(({ className = '', ...props }, ref) => (
  <caption ref={ref} className={cn('bac-table__caption', className)} {...props} />
))

TableCaption.displayName = 'TableCaption'