export default function () {
  const isAdmin = localStorage.getItem('roles') === 'ADMIN';
  const isUser = localStorage.getItem('roles') === 'USER';
  return {
    noFilter: true,
    authenUserFilter: () => isAdmin || isUser,
    userRouterFiler: () => isUser, // Only user
    adminRouteFilter: () => isAdmin, // Only admin could access it
  };
}
