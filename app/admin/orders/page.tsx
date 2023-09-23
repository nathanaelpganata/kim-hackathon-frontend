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
import withAuth from '@/lib/withAuth';
import Loading from '@/components/Loading';
import axios from '@/lib/axios';

// Data Definition
export type OrderSchemaData = {
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

const OrderPage = () => {
  const router = useRouter();
  const {
    data: OrderData,
    isLoading,
    refetch: refecthData,
  } = useQuery<OrderSchemaData>(['/order']);
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
      cell: ({ row }) => {
        return (
          <div className='flex'>
            <span className='max-w-[100px] truncate font-medium'>
              {row.getValue('id')}
            </span>
          </div>
        );
      },
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
      cell: ({ row }) => {
        return (
          <div className='flex'>
            <span className='max-w-[500px] truncate font-medium'>
              {row.getValue('status') == 'pending' ? (
                <span className='text-yellow-500'>Pending</span>
              ) : row.getValue('status') == 'diterima' ? (
                <span className='text-green-500'>Diterima</span>
              ) : (
                <span className='text-red-500'>Ditolak</span>
              )}
            </span>
          </div>
        );
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
                className='cursor-pointer'
                onClick={async () => {
                  router.push(`/admin/orders/${todo.id}`);
                }}
              >
                Lihat detail pesanan
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-green-500 cursor-pointer'
                onClick={() => {
                  axios.put(`/order/${todo.id}`, {
                    status: 'diterima',
                  });
                  refecthData();
                }}
              >
                Terima pesanan
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-red-500 cursor-pointer'
                onClick={() => {
                  axios.put(`/order/${todo.id}`, {
                    status: 'ditolak',
                  });
                  refecthData();
                }}
              >
                Tolak pesanan
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
      <div className='flex flex-col items-left justify-center pt-10 px-4 sm:px-8 mx-2 sm:mx-6'>
        <h1 className='text-5xl font-bold'>Pesanan</h1>
        <div className='mt-12 bg-white p-4 rounded-lg'>
          {!isLoading ? (
            <DataTable
              data={mappedOrderData as any}
              columns={columns}
              searchFilter={'customer_name'}
              facetedFilter={order_status}
            />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(OrderPage);
