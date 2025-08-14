// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { forwardRef } from 'react';

import AppLayout, { type AppLayoutProps } from '@cloudscape-design/components/app-layout';
import AppLayoutToolbar from '@cloudscape-design/components/app-layout-toolbar';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en.json';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { isVisualRefresh } from './apply-mode.ts';

export { Navigation } from './navigation';
export { Notifications } from './notifications';

export const TableNoMatchState = ({ onClearFilter }: { onClearFilter: () => void }) => (
    <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
        <SpaceBetween size="xxs">
            <div>
                <b>No matches</b>
                <Box variant="p" color="inherit">
                    We can't find a match.
                </Box>
            </div>
            <Button onClick={onClearFilter}>Clear filter</Button>
        </SpaceBetween>
    </Box>
);

export const TableEmptyState = ({ resourceName }: { resourceName: string }) => (
    <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
        <SpaceBetween size="xxs">
            <div>
                <b>No {resourceName.toLowerCase()}s</b>
                <Box variant="p" color="inherit">
                    No {resourceName.toLowerCase()}s associated with this resource.
                </Box>
            </div>
            <Button>Create {resourceName.toLowerCase()}</Button>
        </SpaceBetween>
    </Box>
);

export const CustomAppLayout = forwardRef<AppLayoutProps.Ref, AppLayoutProps>(function CustomAppLayout(props, ref) {
    return (
        <I18nProvider locale="en" messages={[enMessages]}>
            {isVisualRefresh ? <AppLayoutToolbar ref={ref} {...props} /> : <AppLayout ref={ref} {...props} />}
        </I18nProvider>
    );
});