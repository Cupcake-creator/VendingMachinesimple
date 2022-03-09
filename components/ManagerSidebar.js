import Link from "next/link";
function ManagerSidebar() {
  const items_sidebar = [
    { id: "Stock Manage", path: "/manage/StockM" },
  ];
  // const items_sidebar = [
  //   { id: "Dashboard", path: "/manage/Dashboard" },
  //   { id: "Stock Manage", path: "/manage/StockM" },
  //   { id: "Buying Realtime List", path: "/manage/History" },
  // ];

  return (
    <div className="manager-sidebar-content">
      {items_sidebar.map((doc) => (
        <div className="manager-sidebar-items" key={doc.id}>
          <Link href={doc.path}>{doc.id}</Link>
        </div>
      ))}
    </div>
  );
}

export default ManagerSidebar;
