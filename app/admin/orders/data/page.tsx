'use client'

// import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import DashboardLayout from '@/components/layouts/dashboard/DashboardLayout';
import { DataTable } from '@/components/table/DataTable';
// import { LuMoreHorizontal } from 'react-icons/lu';
// import { DataTableColumnHeader } from '@/components/table/DataTableColumnHeader';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';


// Data Definition
type OrderSchemaData = {
  data: OrderSchema[];
}

type OrderSchema = {

  no_pemesanan: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  quantity: number;
  category: string;


};

// Columns Definition
const columns: ColumnDef<OrderSchema>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'no_pemesananan',
    header: 'No Pemesanan',
    accessorKey: 'no_pemesanan',
  },
  {
    id: 'customer_name',
    header: 'Nama Customer',
    accessorKey: 'id',
  },
  {
    id: 'customer_email',
    header: 'Email Customer',
    accessorKey: 'customer_email',
  },
  {
    id: 'customer_phone',
    header: 'Phone Customer',
    accessorKey: 'customer_phone',
  },
  {
    id: 'category',
    header: 'Kategori',
    accessorKey: 'category',
  },
];



const OrderTablePage = () => {
  const { data: OrderData, isLoading } = useQuery<OrderSchemaData>(['/order'])

  console.log(OrderData)

  const mappedOrderData = OrderData?.data.map((order) => {
    return {
      no_pemesanan: order.no_pemesanan,
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      customer_phone: order.customer_phone,
      category: order.category,
    }
  })



  return <DashboardLayout>
    {!isLoading ? (
      <DataTable
        data={mappedOrderData as OrderSchema[]}
        columns={columns}
      />
    ) : (
      <>Loading...</>
    )}

  </DashboardLayout>;
};

export default OrderTablePage;
