// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import SpaceBetween from '@cloudscape-design/components/space-between';

import { CustomAppLayout, Navigation, Notifications } from './components/common/common-components';
import { Breadcrumbs } from './components/details/breadcrumbs';
import { GeneralConfig } from './components/details/general-config';
import { PageHeader } from './components/details/page-header';
import { INSTANCE_DROPDOWN_ITEMS } from './components/details/details-config.tsx';
import { LogsTable } from './components/logs-table';

export function App() {
  return (
    <CustomAppLayout
      content={
        <SpaceBetween size="m">
          <PageHeader
            buttons={[
              { text: 'Actions', items: INSTANCE_DROPDOWN_ITEMS },
              { text: 'Edit', itemType: 'action', id: 'edit' },
              { text: 'Delete', itemType: 'action', id: 'delete' },
            ]}
          />
          <SpaceBetween size="l">
            <GeneralConfig />
            <LogsTable />
          </SpaceBetween>
        </SpaceBetween>
      }
      breadcrumbs={<Breadcrumbs />}
      navigation={<Navigation activeHref="#/distributions" />}
      toolsHide={true}
      contentType="default"
      notifications={<Notifications />}
    />
  );
}
