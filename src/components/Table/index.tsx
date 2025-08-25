import { useState, useMemo } from "react";
import { FaEye, FaEdit } from "react-icons/fa";

type Column<T> = {
  header: string;
  accessor: keyof T;
  sortable?: boolean;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  rowsPerPage?: number;
  onRowClick?: (row: T) => void;
  onEditClick?: (row:T) => void;
};

export default function Table2<T extends { id: string | number }>({
  data,
  columns,
  rowsPerPage = 10,
  onRowClick,
  onEditClick
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<Set<string | number>>(new Set());

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== key) return { key, direction: "asc" };
      return {
        key,
        direction: prev.direction === "asc" ? "desc" : "asc",
      };
    });
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [data, filter]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const toggleSelect = (id: string | number) => {
    setSelected((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const toggleSelectAll = () => {
    const currentIds = paginatedData.map((row) => row.id);
    const allSelected = currentIds.every((id) => selected.has(id));
    setSelected((prev) => {
      const updated = new Set(prev);
      currentIds.forEach((id) => {
        allSelected ? updated.delete(id) : updated.add(id);
      });
      return updated;
    });
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="p-4 font-abel text-15">
      <input
        type="text"
        placeholder="Search..."
        className="mb-2 p-2 border border-border rounded w-full"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="border-b border-border p-2 cursor-pointer text-left"
                onClick={() => col.sortable && handleSort(col.accessor)}
              >
                {col.header}
                {sortConfig?.key === col.accessor &&
                  (sortConfig.direction === "asc" ? " ▲" : " ▼")}
              </th>
            ))}
            <th className="border-b border-border p-2 text-left">Actions</th>
            <th className="border-b border-border p-2">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={
                  paginatedData.length > 0 &&
                  paginatedData.every((row) => selected.has(row.id))
                }
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              {columns.map((col) => {
                const value = row[col.accessor];

                const getCellClass = () => {
                  if (col.accessor === "interviewStatus") {
                    if (value === "COMPROMISED")
                      return "text-[#E53935] font-semibold";
                    if (value === "COMPLETED")
                      return "text-[#43A047] font-semibold";
                    if (value === "PENDING")
                      return "text-[#F9A825] font-semibold";
                    if (value === "CANCELLED")
                      return "text-[#FB8C00] font-semibold";
                    if (value === "ONGOING")
                      return "text-[#1E88E5] font-semibold";
                     if (value === "DELETED")
                      return "text-[#8E24AA] font-semibold";
                    
                  }
                  return "";
                };

                return (
                  <td
                    key={String(col.accessor)}
                    className={`border-b border-border p-2 text-left ${getCellClass()}`}
                  >
                    {String(value)}
                  </td>
                );
              })}
              <td
                className="border-b border-border px-2 text-left xl:py-0 md:py-0 align-middle"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 h-full">
                  <button
                    onClick={() => onRowClick?.(row)}
                    title="View"
                    className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
                  >
                    <FaEye className="text-[12px]" />
                  </button>

                  <button
                    onClick={() => onEditClick?.(row)}
                    title="Edit"
                    className="text-green-600 hover:underline flex items-center gap-1 text-sm"
                  >
                    <FaEdit className="text-[12px]" />
                  </button>
                </div>
              </td>

              <td
                className="border-b border-border p-2 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  checked={selected.has(row.id)}
                  onChange={() => toggleSelect(row.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
