import { useCallback } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { ClearUser } from "../../app/slice/authSlice";

function Logout() {
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    try {
      window.localStorage.removeItem("authToken");
      toast.success("Logout successfully");
      dispatch(ClearUser());
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } catch (error) {
      toast.error("Error: " + error);
      setTimeout(() => {}, 2000);
    }
  }, [dispatch]);
  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
