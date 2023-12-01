export default function () {
  const isAdmin = localStorage.getItem('roles') === 'ADMIN';
  const isUser = localStorage.getItem('roles') === 'USER';
  return {
    noFilter: true,
    userRouterFiler: () => isUser,
    adminRouteFilter: () => isAdmin, // Only admin could access it
  };
}
