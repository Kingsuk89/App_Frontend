import { useQuery } from "@tanstack/react-query";
import PerchesTable from "./PerchesTable";
import { getUser } from "../../api/UserApi";
import Loader from "../utils/Loader";
import React from "react";

const Profile = () => {
  const { data: UserData, isFetching } = useQuery({
    queryKey: ["UserDataD"],
    queryFn: getUser,
  });
  return (
    <React.Fragment>
      {isFetching ? (
        <Loader />
      ) : (
        <div className="w-screen h-screen ">
          <h1 className="text-3xl font-bold uppercase pl-24 pt-24">Profile</h1>
          <div className="mx-20 md:mx-24 my- mb-16 space-y-7">
            <div>
              <h4 className="text-xl font-medium inline-block">Name</h4>
              <h4 className="text-xl font-medium inline-block pl-6">:</h4>{" "}
              <p className="text-lg font-medium inline-block pl-6">
                {UserData && UserData.name}
              </p>
            </div>
            <div>
              <h4 className="text-xl font-medium inline-block">Email</h4>
              <h4 className="text-xl font-medium inline-block pl-6">:</h4>{" "}
              <p className="text-lg font-medium inline-block pl-6">
                {UserData && UserData.email}
              </p>
            </div>
            <div>
              <h4 className="text-xl font-medium inline-block">Status</h4>
              <h4 className="text-xl font-medium inline-block pl-6">:</h4>{" "}
              <p
                className={`text-lg font-medium inline-block ml-6  ${
                  UserData && UserData.isVerified
                    ? "bg-green-500 text-black rounded-xl px-2"
                    : "bg-transparent"
                }`}
              >
                {UserData && UserData.isVerified && "Verified"}
              </p>
            </div>
          </div>

          <PerchesTable />
        </div>
      )}
    </React.Fragment>
  );
};

export default Profile;
