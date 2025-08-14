// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import SideNavigation, { type SideNavigationProps } from '@cloudscape-design/components/side-navigation';

import { navItems } from "./navitems.ts";

const navHeader = { text: 'Service', href: '#/' };

const defaultOnFollowHandler: SideNavigationProps['onFollow'] = event => {
    // keep the locked href for our demo pages
    event.preventDefault();
};

interface NavigationProps {
    activeHref?: string;
    header?: SideNavigationProps['header'];
    items?: SideNavigationProps['items'];
    onFollowHandler?: SideNavigationProps['onFollow'];
}

export function Navigation({
                               activeHref,
                               header = navHeader,
                               items = navItems,
                               onFollowHandler = defaultOnFollowHandler,
                           }: NavigationProps) {
    return <SideNavigation items={items} header={header} activeHref={activeHref} onFollow={onFollowHandler} />;
}