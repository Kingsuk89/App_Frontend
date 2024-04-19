import { useQuery } from "@tanstack/react-query";
import PerchesTable from "./PerchesTable";
import { getUser } from "../../api/UserApi";
import Loader from "../utils/Loader";
import React from "react";
import { selectAuthToken } from "../../app/slice/authSlice";
import { useSelector } from "react-redux";

const Profile = () => {
  const authToken = useSelector(selectAuthToken);
  const { data: UserData, isFetching } = useQuery({
    queryKey: ["UserData"],
    queryFn: () => getUser(authToken),
  });

  return (
    <React.Fragment>
      {isFetching ? (
        <Loader />
      ) : (
        <React.Fragment>
          <h1 className="text-3xl font-bold uppercase absolute ml-24 mt-20">
            Profile
          </h1>
          <div className="w-screen h-screen flex justify-center items-center flex-col">
            <img
              src={UserData && UserData.avatar}
              alt={UserData && UserData.name}
              className="rounded-full w-20 h-20 my-4"
            />
            <div className="mx-20 md:mx-24 mb-16 space-y-7">
              <div>
                <h4 className="text-xl font-medium inline-block">Name</h4>
                <h4 className="text-xl font-medium inline-block pl-6">
                  :
                </h4>{" "}
                <p className="text-lg font-medium inline-block pl-6">
                  {UserData && UserData.name}
                </p>
              </div>
              <div>
                <h4 className="text-xl font-medium inline-block">Email</h4>
                <h4 className="text-xl font-medium inline-block pl-6">
                  :
                </h4>{" "}
                <p className="text-lg font-medium inline-block pl-6">
                  {UserData && UserData.email}
                </p>
              </div>
              <div>
                <h4 className="text-xl font-medium inline-block">Status</h4>
                <h4 className="text-xl font-medium inline-block pl-6">
                  :
                </h4>{" "}
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
            <PerchesTable UserData={UserData} />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Profile;
