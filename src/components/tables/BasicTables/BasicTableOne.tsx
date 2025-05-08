import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { PencilIcon, TrashBinIcon } from "../../../icons";
import { Modal } from "../../../components/ui/modal";
import { useModal } from "../../../hooks/useModal";
import Button from "../../../components/ui/button/Button";

export interface Column {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
}

export interface ActionColumn {
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  showEdit?: boolean;
  showDelete?: boolean;
}

interface BasicTableOneProps {
  data: any[];
  columns: Column[];
  actions?: ActionColumn;
  isLoading?: boolean;
  emptyMessage?: string;
}

const BasicTableOne: React.FC<BasicTableOneProps> = ({
  data,
  columns,
  actions,
  isLoading = false,
  emptyMessage = "No data available"
}) => {
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const handleDelete = (row: any) => {
    setSelectedRow(row);
    openModal();
  };

  const handleConfirmDelete = () => {
    if (selectedRow && actions?.onDelete) {
      actions.onDelete(selectedRow);
    }
    closeModal();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    isHeader
                    className={`px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 ${column.className || ''}`}
                  >
                    {column.header}
                  </TableCell>
                ))}
                {(actions?.showEdit || actions?.showDelete) && (
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((row, index) => (
                <TableRow key={row.id || index}>
                  {columns.map((column) => (
                    <TableCell 
                      key={`${row.id || index}-${column.key}`}
                      className={`px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 ${column.className || ''}`}
                    >
                      {column.render 
                        ? column.render(row[column.key], row)
                        : row[column.key]
                      }
                    </TableCell>
                  ))}
                  {(actions?.showEdit || actions?.showDelete) && (
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        {actions.showEdit && (
                          <button
                            onClick={() => actions.onEdit?.(row)}
                            className="p-1 text-gray-500 hover:text-primary transition-colors"
                            title="Edit"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>
                        )}
                        {actions.showDelete && (
                          <button
                            onClick={() => handleDelete(row)}
                            className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <TrashBinIcon className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[500px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Delete Confirmation
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BasicTableOne;
