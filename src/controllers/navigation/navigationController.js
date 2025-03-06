export const getNavigationItems = (req, res) => {
    const navigationItems = [
        { id: 1, name: "List", path: "/list" },
        { id: 2, name: "Filter", path: "/filter" },
        { id: 3, name: "Productivity Status", path: "/productivity" },
        { id: 4, name: "Mood Tracker", path: "/mood-tracker" },
        { id: 5, name: "Calendar", path: "/calendar" },
    ];

    res.status(200).json(navigationItems);
};
