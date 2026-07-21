import React from 'react'
import Table from './Table'

export function SpecificationTable({ specs = [], className = '', ...props }) {
  return (
    <Table className={className} {...props}>
      <tbody className="divide-y divide-[#E8E2DA]">
        {specs.map((spec, i) => (
          <tr key={i} className="hover:bg-neutral-50/50 transition-colors">
            <td className="px-6 py-4 font-sans font-medium text-[#7A7A7A] w-1/3">
              {spec.label}
            </td>
            <td className="px-6 py-4 font-mono text-sm text-[#111111] font-semibold">
              {spec.value}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default SpecificationTable
