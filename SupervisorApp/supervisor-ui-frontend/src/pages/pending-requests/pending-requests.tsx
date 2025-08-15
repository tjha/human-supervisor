import React, { type ReactNode } from "react";

import { useCollection } from '@cloudscape-design/collection-hooks';

import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import TextFilter from "@cloudscape-design/components/text-filter";
import { useParams } from "react-router-dom";
import { ClickableEntity } from "../../components/common/clickable-entity.tsx";
import { RequestEntity } from "../../components/requestEntity/clickable-request-entity.tsx";

interface TableItem {
    visibleEntity: ReactNode | undefined;
    requestId: string
    requesterName: string;
    requesterPhoneNumber: string;
    requestHeader: string;
    requestBody: string;
    requestTime: number;
}

export function PendingRequests() {
    const { storeId } = useParams();

    const testItems: TableItem[] = [
        {
            visibleEntity: (
                <ClickableEntity key="entity1" path="./../requestId1" children=
                    {<RequestEntity requestId="requestId1" requesterName="Steph Curry" requestHeader="Example request header 1"
                               requestBody="let's start request 1 blah blah blah" requestTime={1755205685} />
                    }
                />
            ),
            requestId: "requestId1",
            requesterName: "Steph Curry",
            requesterPhoneNumber: "12125551212",
            requestHeader: "Example request header 1",
            requestBody: "This is the request body 1",
            requestTime: 1755205685
        },
        {
            visibleEntity:(
                <ClickableEntity key="entity2" path="./../requestId1" children=
                    {<RequestEntity requestId="requestId1" requesterName="Jalen Brunson" requestHeader="Example request header 2"
                                    requestBody="This is request 2 blah blah blah" requestTime={1752200680} />
                    }
                />
            ),
            requestId: "requestId2",
            requesterName: "Jalen Brunson",
            requesterPhoneNumber: "12125552222",
            requestHeader: "Example request header 2",
            requestBody: "This is request 2 blah blah blah",
            requestTime: 1752200680
        },
        {
            visibleEntity: (
                <ClickableEntity key="entity3" path="./../requestId3" children=
                    {<RequestEntity requestId="requestId3" requesterName="Karl Anthony Towns" requestHeader="Example request header 3"
                                    requestBody="This is Body request 3 blah blah blah" requestTime={1755203689} />
                    }
                />
            ),
            requestId: "requestId3",
            requesterName: "Karl Anthony Towns",
            requesterPhoneNumber: "12125551111",
            requestHeader: "Example request header 3",
            requestBody: "This is Body request 3 blah blah blah",
            requestTime: 1755203689
        },
    ]

    const columnDefinitions = [
        {
            id: "time",
            sortingField: "requestTime",
            header: "Time",
            cell: (item: TableItem) => item.requestTime || "-",
        },
        {
            id: "visibleEntity",
            header: "Pending Requests",
            cell: (item: TableItem) => item.visibleEntity,
        },
        {
            id: "requestId",
            header: "RequesterId",
            cell: (item: TableItem) => item.requestId || "-",
        },
        {
            id: "requesterName",
            header: "Requester Name",
            cell: (item: TableItem) => item.requesterName || "-",
        },
        {
            id: "phoneNumber",
            header: "Phone Number",
            cell: (item: TableItem) => item.requesterPhoneNumber || "-",
        },
        {
            id: "header",
            header: "Header",
            cell: (item: TableItem) => item.requestHeader || "-",
        },
        {
            id: "body",
            header: "Body",
            cell: (item: TableItem) => item.requestBody || "-",
        }
    ]

    const { items, filteredItemsCount, collectionProps, filterProps } = useCollection(testItems, {
        sorting: {
            defaultState: {
                sortingColumn: columnDefinitions[0], // Default to Test Number
                isDescending: false,
            },
        },
        filtering: {
            fields: ["requesterName", "requestHeader", "requestBody"],
        },
    });

    return (
        <Table
            columnDefinitions={columnDefinitions}
            columnDisplay={[
                { id: "visibleEntity", visible: true },
                { id: "requestId", visible: false },
                { id: "requesterName", visible: false },
                { id: "phoneNumber", visible: false },
                { id: "header", visible: false },
                { id: "body", visible: false },
                { id: "time", visible: false },
            ]}
            enableKeyboardNavigation
            items={items}
            loadingText="Loading requests"
            trackBy="name"
            wrapLines
            sortingColumn={collectionProps.sortingColumn}
            empty={
                <Box
                    margin={{ vertical: "xs" }}
                    textAlign="center"
                    color="inherit"
                >
                    <SpaceBetween size="m">
                        <b>No Requests</b>
                    </SpaceBetween>
                </Box>
            }
            filter={
                <TextFilter
                    {...filterProps}
                    filteringPlaceholder="Search"
                    countText={`${filteredItemsCount} matches`}
                />
            }
            header={
                <div>
                    <h1> {storeId} </h1>
                </div>
            }
        />
    );
}