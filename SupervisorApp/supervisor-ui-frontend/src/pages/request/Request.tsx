import React from "react";

import { useParams } from 'react-router-dom';

export function Request() {
    const { requestId } = useParams();

    return (
        <h1>Requests Page: {requestId}</h1>
    );
}