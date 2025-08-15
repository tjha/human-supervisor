// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PendingRequests } from "./pages/pending-requests";
import NoPage from "./pages/NoPage/noPage";
import Layout from "./pages/Layout.tsx";
import { RequestHistory } from "./pages/requests-history";
import { Request } from "./pages/request";

// Inspired by https://www.w3schools.com/react/react_router.asp
export function App() {
    // TODO: Add support to verify login before routing to home page
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/stores/:storeId/" element={<Layout />}>
                    <Route index element={<Navigate to="requests/pending" />} />
                    <Route path="requests/pending" element={<PendingRequests />} />
                    <Route path="requests/history" element={<RequestHistory />} />
                    <Route path="requests/:requestId" element={<Request />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
                <Route path="/" element={<NoPage />}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
