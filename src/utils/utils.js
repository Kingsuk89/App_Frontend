import toast from "react-hot-toast";

export const navItem = [
  { href: "/", link: "Home" },
  { href: "/profile", link: "Profile" },
  { href: "/course", link: "Course" },
  { href: "/contact", link: "Contact" },
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
  midScreen: {
    breakpoint: { max: 1024, min: 700 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 700, min: 493 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const paymentProcess = (OrderData, UserData) => {
  try {
    const options = {
      key: "rzp_test_YyTorB7QSjgpw2", // Enter the Key ID generated from the Dashboard
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
