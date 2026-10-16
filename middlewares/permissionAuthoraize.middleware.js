const authorizePermission = (requiredPermission) => {
  return (req, res, next) => {
    const userPermissions = req.user.permissions;

    const hasPermission = userPermissions.includes(requiredPermission);

    if (!hasPermission) {
      return res.status(403).json({
        message: "You do not have permission!",
      });
    }

    next();
  };
};

module.exports = authorizePermission;
