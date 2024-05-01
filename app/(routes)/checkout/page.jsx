"use client";
import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Checkout = () => {
  const params = useSearchParams();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();

  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");

  const [deliveryAmount, setDeliveryAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalInDollar, setTotalInDollar] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      GetUserCart(user?.primaryEmailAddress.emailAddress);
    }
  }, [user || updateCart]);

  const GetUserCart = () => {
    GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress).then(
      (res) => {
        setCart(res?.userCarts);
        calculateTotalAmount(res?.userCarts);
      }
    );
  };

  const calculateTotalAmount = (cart_) => {
    let total = 0;
    cart_.forEach((item) => {
      total = total + item.price;
    });
    setSubTotal(total.toFixed(2));
    const calculatedTax = (total * 9) / 100;
    setDeliveryAmount(total > 0 ? 50 : 0);
    setTaxAmount(calculatedTax);
    setTotal(total + calculatedTax + deliveryAmount);
    setUpdateCart(!updateCart);
    setTotalInDollar((total + calculatedTax + deliveryAmount) / 75);
  };

  const addToOrder = () => {
    setLoading(true);
    const data = {
      //email:user.primaryEmailAddress.emailAddress,
      email: email,
      orderAmount: total,
      restaurentName: params.get("restaurent"),
      //userName:user.fullName,
      userName: username,
      phone: phone,
      address: address,
      zipCode: zip,
    };
    GlobalApi.CreateNewOrder(data).then((res) => {
      const resultId = res?.createOrder?.id;
      const emailTodeleteCart = user?.primaryEmailAddress.emailAddress;
      if (resultId) {
        cart.forEach(
          (item) => {
            GlobalApi.UpdateOrderToAddOrderItems(
              item.productName,
              item.price,
              resultId,
              emailTodeleteCart
            ).then(
              (res) => {
                setLoading(false);
                toast("Order Created Successfully");
                setUpdateCart(!updateCart);
                SendEmail();
                router.replace("/confirmation");
              },
              (error) => {
                setLoading(false);
              }
            );
          },
          (error) => {
            setLoading(false);
          }
        );
      }
    });
  };

  const SendEmail = async () => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user?.primaryEmailAddress.emailAddress }),
      });
      if (!response.ok) {
        toast("Error while sending email");
      } else {
        toast("Email sent successfully");
      }
    } catch (error) {
      toast("Error while sending email");
    }
  };

  return (
    <div>
      <h2 className="font-bold text-2xl my-4 ml-9">Checkout</h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-4">
            <Input
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-4">
            <Input
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
          </div>
          <div className="mt-4">
            <Input
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({cart?.length})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>₹{subTotal}</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Delivery: <span> ₹{deliveryAmount}</span>
            </h2>
            <h2 className="font-bold flex justify-between">
              Tax (9%): <span> ₹{taxAmount}</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total:<span>₹{total.toFixed(2)}</span>
            </h2>
            {total > 5 && (
              <Button
                onClick={() => addToOrder()}
                disabled={
                  email == "" ||
                  username == "" ||
                  phone == "" ||
                  zip == "" ||
                  address == ""
                }
              >
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Make Payment "
                )}
              </Button>
            )}
            {total > 5 && (
              <PayPalButtons
                disabled={
                  !(username && email && address && zip && phone) || loading
                }
                style={{ layout: "horizontal" }}
                onApprove={addToOrder}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalInDollar.toFixed(2),
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
