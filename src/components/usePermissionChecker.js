
import { useState, useEffect } from "react";

const usePermissions = () => {
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    const storedPermissions = JSON.parse(localStorage.getItem("permissions"));
    const editedPermissions = JSON.parse(
      localStorage.getItem("editedPermissions")
    );
    if (editedPermissions) {
      setPermissions(editedPermissions);
    } else if (storedPermissions) {
      setPermissions(storedPermissions);
    }
  }, []);

  const canRead = (section) => {
    return permissions[section]?.read === true;
  };

  const canWrite = (section) => {
    return permissions[section]?.write === true;
  };

  return { canRead, canWrite };
};

export default usePermissions;
