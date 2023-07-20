'use client'
import React, { HTMLProps, useEffect, useMemo } from 'react'
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'
import { MOCK_DATA } from '@/constants/MockData'
import { TfiExport } from 'react-icons/tfi'
import { RiSoundModuleLine } from 'react-icons/ri'
import { AiOutlineSearch } from 'react-icons/ai'
import clsx from 'clsx'
import Image from 'next/image'

export type Person = {
  id: number
  name: string
  target: string | null
  status: boolean
  last_scanned: string
  scans_per_hour: number
  last_7_days: string
}

export default function UserTable() {
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState('')

  console.log(rowSelection)

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      // {
      //   header: 'ID',
      //   accessorKey: 'id',
      // },
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        header: 'Name',
        accessorKey: 'name',
        cell: (info) => {
          return (
            <div className="flex items-center gap-x-2">
              <Image
                src="/images/profile-pic.jpg"
                alt="profile"
                height={32}
                width={32}
                className="rounded-full h-8 w-8"
              />
              {info.getValue() as string}
            </div>
          )
        },
      },
      {
        header: 'Target',
        accessorKey: 'target',
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell(props) {
          const isActive = props.getValue() === true
          const value = isActive ? 'Active' : 'Inactive'
          return (
            <span
              className={clsx(isActive ? 'text-green-500' : 'text-rose-500')}
            >
              {value}
            </span>
          )
        },
      },
      {
        header: 'Last Scanned',
        accessorKey: 'last_scanned',
      },
      {
        header: 'Scans Per Hour',
        accessorKey: 'scans_per_hour',
      },
      {
        header: 'Last 7 Days',
        accessorKey: 'last_7_days',
      },
    ],
    []
  )

  const data = useMemo(() => MOCK_DATA, [])

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      globalFilter,
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })

  return (
    <div className="bg-white rounded-2xl shadow w-full my-10 pb-8">
      <div className="flex items-center justify-between pl-10 pr-4 py-4 border-b border-gray-200">
        <h2 className="text-xl text-gray-800 font-semibold text-center">
          Best performing
        </h2>
        <button className="text-gray-400 border border-gray-400 px-4 py-1 rounded flex items-center justify-center gap-x-2 hover:shadow">
          <TfiExport />
          Export
        </button>
      </div>

      <div className="flex items-center pl-10 pr-4 py-4 border-b border-gray-200 gap-x-8">
        <div className="flex items-center px-4  border border-gray-400 rounded-full  text-gray-400 ">
          <AiOutlineSearch size={24} className="cursor-pointer" role="button" />
          {/* <input
            type="text"
            className="text-gray-600 px-1 py-0.5 focus:border-none border-none focus:outline-none outline-none"
            placeholder="Search"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
          /> */}
          <DebouncedInput
            type="text"
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            className="text-gray-600 px-1 py-0.5 focus:border-none border-none focus:outline-none outline-none"
            placeholder="Search"
          />
        </div>
        <button className="text-gray-400 border border-gray-400 px-4 py-0.5 rounded flex items-center justify-center gap-x-2 hover:shadow transition-all">
          <RiSoundModuleLine />
          Filters
        </button>
      </div>

      <table className="table-auto	 w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-gray-600 px-5 py-4 text-left"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="text-gray-600 px-4 py-3 font-medium text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="pl-5 py-4 ">
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllPageRowsSelected(),
                  indeterminate: table.getIsSomePageRowsSelected(),
                  onChange: table.getToggleAllPageRowsSelectedHandler(),
                }}
              />
            </td>
            <td colSpan={20} className="text-gray-600 text-sm">
              Page Rows ({table.getRowModel().rows.length})
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="flex items-center gap-2 pl-5">
        <button
          className={clsx(
            'border rounded p-1 ',
            !table.getCanPreviousPage()
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600'
          )}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className={clsx(
            'border rounded p-1 ',
            !table.getCanPreviousPage()
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600'
          )}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className={clsx(
            'border rounded p-1 ',
            !table.getCanNextPage()
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600'
          )}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className={clsx(
            'border rounded p-1 ',
            !table.getCanNextPage()
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600'
          )}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1 text-gray-600">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1 text-gray-600">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
          className="text-gray-800"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize} className="text-gray-800">
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [debounce, onChange, value])

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!)

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate, rest.checked])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer h-4 w-4 border-gray-300'}
      {...rest}
    />
  )
}
