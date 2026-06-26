"use client"

import { useState, useTransition } from "react"

interface DeleteConfirmButtonProps {
  onConfirm: () => Promise<void> | void
  itemName?: string
}

export function DeleteConfirmButton({
  onConfirm,
  itemName,
}: DeleteConfirmButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  return (
    <>
      <button
        type="button"
        disabled={isPending}
        onClick={() => setIsOpen(true)}
        className="font-medium text-red-400 text-sm transition hover:text-red-300 disabled:opacity-50"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-2xl">
            <h3 className="mb-2 text-left font-bold text-lg text-white">
              Confirm Delete
            </h3>
            <p className="mb-6 text-left text-slate-400 text-sm leading-relaxed">
              Are you sure you want to delete this {itemName || "item"}? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                disabled={isPending}
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-slate-700 px-4 py-2 font-medium text-slate-200 text-sm transition hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => {
                  startTransition(async () => {
                    await onConfirm()
                    setIsOpen(false)
                  })
                }}
                className="rounded-lg bg-red-600 px-4 py-2 font-medium text-sm text-white transition hover:bg-red-500 disabled:bg-red-800"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
