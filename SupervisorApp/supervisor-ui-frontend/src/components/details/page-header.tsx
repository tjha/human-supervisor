// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Button from '@cloudscape-design/components/button';
import ButtonDropdown, {type ButtonDropdownProps } from '@cloudscape-design/components/button-dropdown';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

export interface DistributionResource {
    id: string;
    deliveryMethod: string;
    domainName: string;
    origin: string;
    priceClass: string;
    logging: string;
    sslCertificate: string;
    tags: { department: string[]; environment: string[] };
    date: Date;
    state?: 'Activated' | 'Deactivated';
}

const DEMO_DISTRIBUTION: DistributionResource = {
    id: 'SLCCSMWOHOFUY0',
    domainName: 'abcdef01234567890.cloudfront.net',
    priceClass: 'Use only US, Canada, Europe, and Asia',
    sslCertificate: 'Default CloudFront SSL certificate',
    deliveryMethod: 'Web',
    origin: 'EXAMPLE-BUCKET-1.s3.amazon',
    logging: 'Off',
    tags: { environment: ['development'], department: ['support'] },
    date: new Date(),
};

export const PageHeader = ({ buttons }: { buttons: ButtonDropdownProps.ItemOrGroup[] }) => {
    return (
        <Header
            variant="h1"
            actions={
                <SpaceBetween direction="horizontal" size="xs">
                    {buttons.map((button, key) =>
                        button.itemType === 'action' ? (
                            <Button href={button.href || ''} disabled={button.disabled || false} key={key}>
                                {button.text}
                            </Button>
                        ) : (
                            <ButtonDropdown items={(button as ButtonDropdownProps.ItemGroup).items} key={key}>
                                {button.text}
                            </ButtonDropdown>
                        ),
                    )}
                </SpaceBetween>
            }
        >
            {DEMO_DISTRIBUTION.id}
        </Header>
    );
};