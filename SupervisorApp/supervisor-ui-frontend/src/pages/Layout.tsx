import React from "react";

import { Outlet, useParams } from "react-router-dom";
import { TopNav } from "../components/common/top-nav.tsx";

const Layout = () => {
    const { storeId } = useParams();
    return (
        <TopNav storeName={storeId}>
            <>
                <Outlet />
            </>
        </TopNav>
    )
};

export default Layout;
