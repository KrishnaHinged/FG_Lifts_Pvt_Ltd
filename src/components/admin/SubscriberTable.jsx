'use client'

import { useState } from 'react'
import { Calendar, Trash2, ShieldAlert } from 'lucide-react'

export default function SubscriberTable({
  subscribers = [],
  currentPage,
  totalPages,
  onPageChange,
  onDeactivate,
  onReactivate,
  currentAdmin,
}) {
  const isAuthorized = currentAdmin?.role === 'SUPER_ADMIN' || currentAdmin?.role === 'MARKETING_MANAGER'

  const getStatusBadge = (active) => {
    return active
      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
      : 'bg-gray-100 text-gray-500 border-gray-200'
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden select-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" role="table">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400">
              <th className="px-6 py-4" scope="col">Email</th>
              <th className="px-6 py-4" scope="col">Name</th>
              <th className="px-6 py-4" scope="col">Source Channel</th>
              <th className="px-6 py-4" scope="col">Status</th>
              <th className="px-6 py-4" scope="col">Joined Date</th>
              {isAuthorized && <th className="px-6 py-4 text-right" scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 font-sans text-sm text-gray-700">
            {subscribers.map((sub) => {
              const joinedDate = new Date(sub.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })

              return (
                <tr key={sub.email}>
                  <td className="px-6 py-4 font-semibold text-gray-950" scope="row">{sub.email}</td>
                  <td className="px-6 py-4">{sub.name || 'Anonymous Reader'}</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{sub.source || 'Footer Strip'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-bold border ${getStatusBadge(sub.isActive)}`}>
                      {sub.isActive ? 'Active' : 'Unsubscribed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400 font-mono">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                      {joinedDate}
                    </div>
                  </td>
                  {isAuthorized && (
                    <td className="px-6 py-4 text-right">
                      {sub.isActive ? (
                        <button
                          onClick={() => onDeactivate(sub.email)}
                          className="inline-flex items-center gap-1 text-[10px] font-bold font-sans text-red-600 hover:bg-red-50 px-2.5 py-1 rounded-lg border border-transparent hover:border-red-200 cursor-pointer bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
                          title="Deactivate subscription"
                          aria-label="Deactivate subscription"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Unsubscribe
                        </button>
                      ) : (
                        <div className="flex items-center justify-end gap-3 select-none">
                          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-wider py-1 block">
                            Inactive
                          </span>
                          <button
                            onClick={() => onReactivate(sub.email)}
                            className="text-[#10B981] text-[10px] font-bold font-sans hover:bg-emerald-50 px-2.5 py-1 rounded-lg border border-transparent hover:border-emerald-200 cursor-pointer bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
                          >
                            Reactivate
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              )
            })}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={isAuthorized ? 6 : 5} className="text-center py-12 text-gray-400 font-mono text-xs uppercase tracking-wider">
                  No subscribers logged.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination row */}
      {totalPages > 1 && (
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <span className="font-mono text-xs text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 font-sans text-xs font-semibold cursor-pointer disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 font-sans text-xs font-semibold cursor-pointer disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
            >
              Next
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
