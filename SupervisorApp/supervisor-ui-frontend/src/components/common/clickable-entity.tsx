import React, { type PropsWithChildren } from 'react';

import { useNavigate } from 'react-router-dom';

interface ClickableEntityProps extends PropsWithChildren {
    path: string;
}

export function ClickableEntity({ path, children }: ClickableEntityProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`${path}`);
    };

    return (
        <div onClick={handleClick} className="no-underline-black">
            {children}
        </div>
    );
};