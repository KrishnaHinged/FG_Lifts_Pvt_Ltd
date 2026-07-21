import React from 'react'
import Table from './Table'

export function DataTable({
  headers = [],
  rows = [],
  className = '',
  emptyText = 'No data available in this view',
  ...props
}) {
  return (
    <Table className={className} {...props}>
      <thead>
        <tr className="bg-[#EDE8E2]/50 border-b border-[#E8E2DA]">
          {headers.map((h, i) => (
            <th key={i} className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-[#E8E2DA]">
        {rows.length === 0 ? (
          <tr>
            <td colSpan={headers.length || 1} className="px-6 py-8 text-center text-sm text-[#7A7A7A] font-sans">
              {emptyText}
            </td>
          </tr>
        ) : (
          rows.map((row, ri) => (
            <tr key={ri} className="hover:bg-neutral-50/50 transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className="px-6 py-4 text-sm text-[#111111]/85 font-sans">
                  {cell}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </Table>
  )
}

export default DataTable
