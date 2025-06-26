import React, { useState } from 'react';
import { Search, Filter, Download, ChevronDown } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from './Table';
import Input from './Input';
import Button from './Button';
import Pagination from './Pagination';
import { usePagination } from '../../hooks/useApi';

const DataTable = ({
  data = [],
  columns = [],
  searchable = true,
  filterable = false,
  exportable = false,
  pagination = true,
  pageSize = 10,
  loading = false,
  emptyMessage = "No data available",
  onRowClick,
  className
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [filters, setFilters] = useState({});

  // Filter and search data
  const filteredData = data.filter(row => {
    // Apply search
    if (searchTerm) {
      const searchableColumns = columns.filter(col => col.searchable !== false);
      const matches = searchableColumns.some(column => {
        const value = column.accessor ? row[column.accessor] : '';
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
      if (!matches) return false;
    }

    // Apply filters
    for (const [key, value] of Object.entries(filters)) {
      if (value && row[key] !== value) return false;
    }

    return true;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const {
    currentData,
    currentPage,
    totalPages,
    totalItems,
    goToPage,
    goToNextPage,
    goToPreviousPage
  } = usePagination(sortedData, pageSize);

  const handleSort = (column) => {
    if (column.sortable === false) return;
    
    if (sortColumn === column.accessor) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column.accessor);
      setSortDirection('asc');
    }
  };

  const handleExport = () => {
    const csv = [
      columns.map(col => col.header).join(','),
      ...filteredData.map(row => 
        columns.map(col => {
          const value = col.accessor ? row[col.accessor] : '';
          return `"${String(value).replace(/"/g, '""')}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getFilterOptions = (column) => {
    const values = data.map(row => row[column.accessor]).filter(Boolean);
    return [...new Set(values)].sort();
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Toolbar */}
      {(searchable || filterable || exportable) && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {searchable && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            )}
            
            {filterable && (
              <div className="flex gap-2">
                {columns.filter(col => col.filterable).map(column => (
                  <select
                    key={column.accessor}
                    value={filters[column.accessor] || ''}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      [column.accessor]: e.target.value
                    }))}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All {column.header}</option>
                    {getFilterOptions(column).map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            )}
          </div>

          {exportable && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.accessor || column.header}
                  header
                  className={`${column.sortable !== false ? 'cursor-pointer hover:bg-gray-100' : ''} ${column.width ? `w-${column.width}` : ''}`}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable !== false && sortColumn === column.accessor && (
                      <ChevronDown
                        className={`h-4 w-4 transform transition-transform ${
                          sortDirection === 'desc' ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-gray-500">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((row, index) => (
                <TableRow
                  key={row.id || index}
                  className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <TableCell key={column.accessor || column.header}>
                      {column.render
                        ? column.render(row[column.accessor], row)
                        : row[column.accessor]
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {pagination && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={pageSize}
            onPageChange={goToPage}
            showInfo={true}
          />
        )}
      </div>
    </div>
  );
};

export default DataTable;