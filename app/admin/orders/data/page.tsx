'use client';

// import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LuMoreHorizontal } from 'react-icons/lu';

import DashboardLayout from '@/components/layouts/dashboard/DashboardLayout';
import { DataTable } from '@/components/table/DataTable';
import { DataTableColumnHeader } from '@/components/table/DataTableColumnHeader';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Data Definition
type OrderSchemaData = {
  data: OrderSchema[];
};

type OrderSchema = {
  id: string;
  no_pemesanan: string;
  customer: any;
  quantity: number;
  category: string;
  status: string;
};

const order_status = [
  {
    column: 'status',
    title: 'Status Pesanan',
    options: [
      {
        value: 'diterima',
        label: 'Diterima',
      },
      {
        value: 'pending',
        label: 'Pending',
      },
      {
        value: 'ditolak',
        label: 'Ditolak',
      },
    ],
  },
];

const OrderTablePage = () => {
  const router = useRouter();
  const { data: OrderData, isLoading } = useQuery<OrderSchemaData>(['/order']);
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
      id: 'id',
      header: 'ID',
      accessorKey: 'id',
    },
    {
      id: 'no_pemesananan',
      header: 'No Pemesanan',
      accessorKey: 'no_pemesanan',
    },
    {
      id: 'customer_name',
      header: 'Nama Customer',
      accessorKey: 'customer_name',
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
    {
      id: 'status',
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Status Pesanan' />
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },

    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const todo = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <LuMoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  router.push(`${todo.id}`);
                }}
              >
                Lihat detail pesanan
              </DropdownMenuItem>
              <DropdownMenuItem className='bg-[#2CA87F]'>
                Terima pesanan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const mappedOrderData = OrderData?.data.map((order: OrderSchema) => {
    return {
      id: order.id,
      no_pemesanan: order.no_pemesanan,
      customer_name: order.customer[0].customer_name,
      customer_email: order.customer[0].customer_email,
      customer_phone: order.customer[0].customer_phone,
      category: order.category,
      status: order.status,
    };
  });

  return (
    <DashboardLayout>
      <div className='flex flex-col items-left justify-center pt-10 px-8 mx-8'>
        <h1 className='text-5xl font-bold'>Pesanan</h1>
        <div className='mt-12'>
          {!isLoading ? (
            <DataTable data={mappedOrderData as any} columns={columns} searchFilter={'customer_name'}
              facetedFilter={order_status} />
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrderTablePage;
