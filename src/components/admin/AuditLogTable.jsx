'use client'

import { useState, useCallback, memo } from 'react'
import { Calendar, Eye } from 'lucide-react'

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

const AuditLogRow = memo(function AuditLogRow({ log, isExpanded, onToggleExpand }) {
  const formattedDate = new Date(log.createdAt).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  return (
    <>
      <tr className="hover:bg-gray-50/50">
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
              onClick={() => onToggleExpand(log._id)}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3]"
              title="View log JSON payload details"
              aria-label="View log JSON payload details"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-gray-900 text-gray-100">
          <td colSpan="6" className="p-4 font-mono text-xs overflow-x-auto">
            <pre className="m-0 whitespace-pre-wrap leading-relaxed text-emerald-400">
              {JSON.stringify({
                action: log.action,
                performedBy: log.performedBy,
                targetType: log.targetType,
                targetId: log.targetId,
                details: log.details,
                ipAddress: log.ipAddress,
                timestamp: log.createdAt
              }, null, 2)}
            </pre>
          </td>
        </tr>
      )}
    </>
  )
})

export default function AuditLogTable({ logs = [], currentPage, totalPages, onPageChange, itemsPerPage = 50, onLimitChange }) {
  const [expandedLogId, setExpandedLogId] = useState(null)

  const handleToggleExpand = useCallback((id) => {
    setExpandedLogId(prev => prev === id ? null : id)
  }, [])

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
            {logs.map((log) => (
              <AuditLogRow
                key={log._id}
                log={log}
                isExpanded={expandedLogId === log._id}
                onToggleExpand={handleToggleExpand}
              />
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-12 text-gray-400 font-mono text-xs uppercase tracking-wider">
                  No audit log entries recorded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
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
