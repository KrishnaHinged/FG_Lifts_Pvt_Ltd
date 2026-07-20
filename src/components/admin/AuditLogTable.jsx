'use client'

import { useState } from 'react'
import { Calendar, User, Eye, Terminal } from 'lucide-react'

export default function AuditLogTable({ logs = [], currentPage, totalPages, onPageChange, itemsPerPage = 50, onLimitChange }) {
  const [expandedLogId, setExpandedLogId] = useState(null)

  const getActionBadgeColor = (action) => {
    if (action.includes('login') || action.includes('assigned')) {
      return 'bg-blue-50 text-blue-700 border-blue-100'
    }
    if (action.includes('created') || action.includes('published')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-100'
    }
    if (action.includes('updated') || action.includes('changed') || action.includes('added')) {
      return 'bg-amber-50 text-amber-700 border-amber-100'
    }
    if (action.includes('deleted') || action.includes('deactivated')) {
      return 'bg-red-50 text-red-700 border-red-100'
    }
    return 'bg-gray-50 text-gray-600 border-gray-200'
  }

  const formatActionName = (action) => {
    return action
      .split('_')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" role="table">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400">
              <th className="px-6 py-4" scope="col">Action</th>
              <th className="px-6 py-4" scope="col">Performed By</th>
              <th className="px-6 py-4" scope="col">Target Type & ID</th>
              <th className="px-6 py-4" scope="col">IP Address</th>
              <th className="px-6 py-4" scope="col">Timestamp</th>
              <th className="px-6 py-4 text-right" scope="col">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 font-sans text-sm text-gray-700">
            {logs.map((log) => {
              const formattedDate = new Date(log.createdAt).toLocaleString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })

              const isExpanded = expandedLogId === log._id

              return (
                <tr key={log._id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4" scope="row">
                    <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-bold border ${getActionBadgeColor(log.action)}`}>
                      {formatActionName(log.action)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-xs">
                      <span className="font-semibold text-gray-900">{log.performedBy?.name || 'System Worker'}</span>
                      <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wider mt-0.5">
                        {log.performedBy?.role?.replace('_', ' ') || 'SYSTEM'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {log.targetId ? (
                      <div className="flex flex-col text-xs">
                        <span className="font-semibold text-gray-700">{log.targetType || 'Document'}</span>
                        <span className="text-gray-400 font-mono text-[9px] font-bold">{log.targetId.slice(-6).toUpperCase()}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 font-mono text-xs">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">
                    {log.ipAddress || 'internal'}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0 text-gray-300" />
                      {formattedDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => setExpandedLogId(isExpanded ? null : log._id)}
                        className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3] rounded"
                        title="View log JSON payload details"
                        aria-label="View log JSON payload details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Expandable JSON details card */}
                      {isExpanded && (
                        <div className="absolute right-6 mt-6 z-20 w-80 bg-gray-950 text-emerald-400 border border-gray-800 rounded-xl shadow-2xl p-4 text-left select-text max-h-48 overflow-y-auto no-scrollbar font-mono text-[10px] leading-relaxed">
                          <div className="flex items-center gap-1.5 text-gray-500 border-b border-gray-900 pb-1.5 mb-2 select-none">
                            <Terminal className="w-3.5 h-3.5" />
                            <span>META LOG DATA</span>
                          </div>
                          <pre className="whitespace-pre-wrap m-0">
                            {JSON.stringify(log.details || {}, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
            {logs.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-12 text-gray-400 font-mono text-xs uppercase tracking-wider">
                  No activity logs logged.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination row */}
      {totalPages > 1 && (
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-mono text-xs text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            {onLimitChange && (
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-gray-400">Rows per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => onLimitChange(Number(e.target.value))}
                  className="px-2 py-1 rounded border border-gray-200 bg-white font-sans text-xs outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3]"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 font-sans text-xs font-semibold cursor-pointer disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3]"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 font-sans text-xs font-semibold cursor-pointer disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3]"
            >
              Next
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
