import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../UI/Modal";
import { useSelector } from "react-redux";
import { GoogleMap, Marker } from "@react-google-maps/api";

const MCPsCard = (props) => {
  const { data } = props;
  const [isShowMCPInfo, setIsShowMCPInfo] = useState(false);
  const allUsers = useSelector((state) => state.users.allUsers);
  const employeeInCharge = allUsers.find(
    (user) => user.id === data["employee-id"]
  );

  const center = data["geo-location"];

  return (
    <Fragment>
      <div className="bg-white shadow rounded-md items-center gap-2 mb-2 p-4">
        <span
          className={`font-bold text-[0.75rem] font-sans tracking-wider bg-opacity-40 p-1.5 rounded-md shadow mb-1 inline-block ${
            data.status === "empty" && "bg-blue-500 text-blue-700"
          } ${data.status === "full" && "bg-yellow-500 text-yellow-700"} ${
            data.status === "progress" && "bg-green-500 text-green-700"
          }`}
        >
          {`STATUS: ${data.status.toUpperCase()}`}
        </span>
        <p className="text-[0.8rem] text-slate-400 font-bold italic">
          Last updated: 20/11/2022
        </p>
        <p className="line-clamp-1 text-left">
          <span className="font-bold">Location:</span> {data.location}
        </p>
        <p className="line-clamp-2 text-left overflow-hidden h-[48px]">
          <span className="font-bold">Address:</span> {data.address}
        </p>
        <div
          onClick={() => {
            setIsShowMCPInfo(true);
          }}
          className="flex justify-end gap-2 items-center text-sm text-gray-500 cursor-pointer"
        >
          <span>More Info</span>
          <FontAwesomeIcon icon={faArrowRight} className="pr-2" />
        </div>
      </div>
      {isShowMCPInfo && (
        <Modal
          onCloseModal={() => {
            setIsShowMCPInfo(false);
          }}
        >
          <div className="h-[12rem] flex gap-2">
            <GoogleMap
              center={center}
              zoom={15}
              mapContainerStyle={{ width: "50%", height: "100%" }}
              options={{
                mapTypeControl: false,
                zoomControl: false,
                streetViewControl: false,
                fullscreenControl: false,
              }}
            >
              <Marker position={center} />
            </GoogleMap>
            <div className="flex-1 flex flex-col justify-center">
              <div>
                <span
                  className={`inline-block font-bold text-[0.75rem] font-sans tracking-wider bg-opacity-40 p-1.5 rounded-md shadow mb-1 ${
                    data.status === "empty" && "bg-blue-500 text-blue-700"
                  } ${
                    data.status === "full" && "bg-yellow-500 text-yellow-700"
                  } ${
                    data.status === "progress" && "bg-green-500 text-green-700"
                  }`}
                >
                  {`STATUS: ${data.status.toUpperCase()}`}
                </span>
              </div>
              <p className="text-[0.8rem] text-slate-400 font-bold italic">
                Last updated: 20/11/2022
              </p>
              <p className="line-clamp-1 text-left">
                <span className="font-bold">Location: </span>
                {data.location}
              </p>
              <p className="line-clamp-2 text-left overflow-hidden h-[48px]">
                <span className="font-bold">Address: </span>
                {data.address}
              </p>
              <p>
                <span className="font-bold">Employee In Charged: </span>
                {employeeInCharge ? employeeInCharge.name : "Not Assign"}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default MCPsCard;
