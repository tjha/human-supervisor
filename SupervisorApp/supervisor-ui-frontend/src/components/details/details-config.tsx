// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Link from '@cloudscape-design/components/link';
import type { TableProps } from '@cloudscape-design/components/table';

export const INSTANCE_DROPDOWN_ITEMS = [
    {
        text: 'Take snapshot',
        id: 'snapshot',
    },
    {
        text: 'Reboot',
        id: 'reboot',
    },
    {
        text: 'Stop',
        id: 'stop',
    },
];

interface LogResource {
    id: string;
    name: string;
    lastWritten: string;
    size: string;
}

export const LOGS_COLUMN_DEFINITIONS: TableProps.ColumnDefinition<LogResource>[] = [
    {
        id: 'name',
        header: 'Name',
        cell: item => <Link href="#">{item.name}</Link>,
        isRowHeader: true,
    },
    {
        id: 'lastWritten',
        header: 'Last written',
        cell: item => item.lastWritten,
    },
    {
        id: 'size',
        header: 'Size',
        cell: item => item.size,
    },
];