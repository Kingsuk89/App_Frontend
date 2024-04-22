import toast from "react-hot-toast";

export const navItem = [
  { href: "/", link: "Home" },
  { href: "/profile", link: "Profile" },
  { href: "/gallery", link: "Gallery" },
  // { href: "/admin", link: "Admin" },
];

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const paymentProcess = (OrderData, UserData) => {
  try {
    const options = {
      key: import.meta.env.VITE_RAZOPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: OrderData.amount,
      currency: OrderData.currency,
      name: "Soumya Corp.",
      description: "Test Transaction",
      image: "",
      order_id: OrderData.order_id,
      handler: function () {
        toast.success("successfully purchased");
      },
      prefill: {
        name: UserData.name,
        email: UserData.email,
      },

      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.log(error);
  }
};
