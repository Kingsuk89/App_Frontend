/* eslint-disable react/no-unknown-property */
import { useQuery } from "@tanstack/react-query";
import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

const PerchesTable = lazy(() => import("./PerchesTable"));
import { getUser } from "../../api/UserApi";
import Loader from "../utils/Loader";

import { selectAuthToken } from "../../app/slice/authSlice";

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
          <div className="w-screen h-full">
            <h1 className="dark:text-white text-black text-center pt-24 text-3xl font-semibold">
              PROFILE
            </h1>
            <div className="py-10">
              <div>
                <span className="flex items-center justify-center">
                  <img
                    className="rounded-full w-14 h-14"
                    src={UserData.avatar}
                    alt={UserData.name}
                    loading="lazy"
                    width="50"
                    height="20"
                    property="high"
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
            </div>{" "}
            <Suspense fallback={<Loader />}>
              <PerchesTable UserData={UserData} />
            </Suspense>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Profile;
