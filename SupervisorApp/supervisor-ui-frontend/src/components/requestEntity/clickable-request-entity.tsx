import React from 'react';

interface RequestEntityProps {
    requestId: string
    requesterName: string;
    requestHeader: string;
    requestBody: string;
    requestTime: number;
}

export function RequestEntity({ requestId, requesterName, requestHeader, requestBody, requestTime }: RequestEntityProps){
    const haveSameDay = (date1: Date, date2: Date) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const requestDate = new Date(requestTime * 1000);
    const todaysDate = new Date();
    // TODO: Remove this when there are unit tests for this component
    // const tomorrowsDate = new Date(requestDate.getDate() + 1);

    // TODO: Test if this is supported in other timezones as expected
    const formattedDate = (haveSameDay(requestDate, todaysDate)) ?
        requestDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true
        }) :
        requestDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });


    return (
        <div key={`request-entity-${requestId}`} className="container">
            <div className="left-aligned">
                <h3 className="no-margin-or-padding">
                    {requesterName}
                </h3>
                <h4 className="no-margin-or-padding">
                    {requestHeader.slice(0, 30)}
                </h4>
                <p className="no-margin-or-padding">
                    {`${requestBody.slice(0, 20)}...`}
                </p>
            </div>
            <div className="right-aligned">
                <p>
                    {formattedDate}
                </p>
            </div>
        </div>
    );
}