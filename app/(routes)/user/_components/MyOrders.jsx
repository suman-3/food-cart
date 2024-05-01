import GlobalApi from "@/app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MyOrders = () => {
  const { user } = useUser();
  const [orderList, setOrderList] = useState([]);
  const userEmail = user?.primaryEmailAddress.emailAddress;

  useEffect(() => {
    user && GetUsersOrders();
  }, [user]);

  const GetUsersOrders = () => {
    GlobalApi.GetUsersOrders(userEmail).then((res) => {
      setOrderList(res?.orders);
    });
  };

  return (
    <div>
      <h2 className="font-bold text-lg">My Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
        {orderList.map((order, index) => (
          <div
            key={index}
            className="p-3 border rounded-lg mt-5 flex flex-col gap-1"
          >
            <h2 className="font-bold">
              {moment(order?.createdAt).format("DD-MMM-yyyy")}
            </h2>
            <h2 className="flex text-sm justify-between items-center">
              Order Total Amount :
              <span>₹{(order?.orderAmount).toFixed(2)}</span>
            </h2>
            <h2 className="flex text-sm justify-between items-center">
              Address: <span>{order?.address}</span>
            </h2>
            <h2 className="flex text-sm justify-between items-center">
              ZIP Code: <span>{order?.zipCode}</span>
            </h2>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <h2 className="text-primary underline cursor-pointer">
                    View Order Detail
                  </h2>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    {order?.orderDetail?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <h2>{item.name}</h2>
                          <h2>₹{item.price}</h2>
                        </div>
                      );
                    })}

                    <hr />
                    <h2 className="flex justify-between items-center font-bold text-md mt-1">
                      Total Order Amount (Including Taxes + Delivary):{" "}
                      <span>₹{(order?.orderAmount).toFixed(2)}</span>
                    </h2>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
