import React, { type PropsWithChildren } from "react";
import TopNavigation from "@cloudscape-design/components/top-navigation";

interface TopNavProps extends PropsWithChildren {
    storeName: string | undefined
}

export function TopNav({ storeName, children }: TopNavProps) {
    return (
        <div>
            <TopNavigation
                identity={{
                    href: `/stores/${storeName}/requests/pending`,
                    title: "",
                }}
                utilities={[
                    {
                        type: "button",
                        text: "Pending",
                        href: `/stores/${storeName}/requests/pending`,
                        external: false,
                    },
                    {
                        type: "button",
                        text: "History",
                        href: `/stores/${storeName}/requests/history`,
                        external: false,
                    },
                    /*
                    {
                        type: "menu-dropdown",
                        text: "Customer Name",
                        description: "email@example.com",
                        iconName: "user-profile",
                        items: [
                            { id: "profile", text: "Profile" },
                            { id: "preferences", text: "Preferences" },
                            { id: "security", text: "Security" },
                            {
                                id: "support-group",
                                text: "Support",
                                items: [
                                    {
                                        id: "documentation",
                                        text: "Documentation",
                                        href: "#",
                                        external: true,
                                        externalIconAriaLabel:
                                            " (opens in new tab)"
                                    },
                                    { id: "support", text: "Support" },
                                    {
                                        id: "feedback",
                                        text: "Feedback",
                                        href: "#",
                                        external: true,
                                        externalIconAriaLabel:
                                            " (opens in new tab)"
                                    }
                                ]
                            },
                            { id: "signout", text: "Sign out" }
                        ]
                    }
                     */
                ]}
            />
            {children}
        </div>

    );
}