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
          <div className="w-screen h-fit">
            <h1 className="dark:text-white text-black text-center pt-24 text-3xl font-semibold">
              PROFILE
            </h1>
            <div className="py-10">
              <div>
                <span className="flex items-center justify-center">
                  <img
                    className="h-20 w-20 rounded-full"
                    src={UserData.avatar}
                    alt={UserData.name}
                  />
                </span>
                <div className="py-5 gap-6 flex items-center justify-center  flex-col">
                  <div className="">
                    <span>Name :</span>
                    <span> {UserData.name}</span>
                  </div>
                  <div className="">
                    <div>
                      <span>Email :</span>
                      <span> {UserData.email}</span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <span>Status :</span>
                      <span className="mx-2">
                        {UserData.isVerified && (
                          <span className="bg-green-700 rounded-full px-4 py-2">
                            Verified
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PerchesTable UserData={UserData} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Profile;
