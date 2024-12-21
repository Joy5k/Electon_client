import {
  FaFacebook,
  FaGithub,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FormEvent } from "react";
import { useCreateSubscriberMutation } from "../../redux/features/subscribe/subscribeManagement";
import { toast } from "sonner";

const sections = [
  
  {
    title: "Support",
    items: ["Customer Care"],
  },
  {
    title: "Company",
    items: ["Home", "Category", "About", "Contact", "Support"],
  },
  {
    title: "Legal",
    items: ["Claims", "Privacy", "Terms", "Policies", "Conditions"],
  },
];

const items = [
  { name: "Facebook", icon: FaFacebook, link: "https://web.facebook.com/profile.php?id=100050264947375" },
  { name: "Linkedin", icon: FaLinkedin, link: "https://www.linkedin.com/in/dev-mehedi-hasan/" },
  { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
  { name: "Github", icon: FaGithub, link: "https://github.com/Joy5k" },
];

const Footer = () => {
const [userSubscribe]=useCreateSubscriberMutation()
const handleUserSubscribe = async (
  event: FormEvent<HTMLFormElement>
): Promise<void> => {
  event.preventDefault();

  const form = event.currentTarget;
  const emailInput = form.querySelector<HTMLInputElement>('input[type="text"]');
  const email = emailInput?.value;

  if (!email) {
    toast.error("Please enter a valid email");
    return;
  }

  const data = {
    email,
    isActive: true,
  };

  try {
    const res = await userSubscribe(data).unwrap();
    if (res.success) {
      toast.success("Subscribed Successfully");
      form.reset(); // Reset form after success
    }
  } catch (error) {
    console.error(error);
    toast.error("Subscription failed. Please try again.");
  }
};


  return (
    <div className="w-full mt-24 bg-black text-gray-300 ">
      <div className="flex flex-col items-center md:flex-row lg:flex-row justify-evenly bg-slate-500 p-12 rounded-xl w-fit gap-9 mx-auto">
        <p className="text-4xl text-primary font-bold bg-transparent">Subscribe newsletter
        </p>
        <form onSubmit={handleUserSubscribe} className="bg-transparent">
        <input type="text" className=" p-[12px] rounded-l-lg border border-dashed text-white bg-transparent" placeholder="Enter Your Email"/>
<button type="submit" className="bg-primary text-white p-[13px] rounded-r-xl">Subscribe</button>
        </form>
     <div className="flex justify-center gap-3 bg-transparent">
     <TfiHeadphoneAlt className="text-6xl bg-transparent" />

    <p className="bg-transparent"><span className="text-gray-200 bg-transparent">Call us 24/7:</span> <br />
    +880 1601588531
</p>
     </div>
      </div>
      <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8">
        {sections.map((section, index) => (
          <div key={index}>
            <h6 className="font-bold uppercase pt-2">{section.title}</h6>
            <ul>
              {section.items.map((item, i) => (
                <li key={i} className="py-1 text-gray-500 hover:text-white">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 pt-8 md:pt-2">
          <p className="font-bold uppercase">Subscribe to our newsletter</p>
          <p className="py-4">
            The latest products and news sent to your inbox weekly.
          </p>
          
        </div>
      </div>

      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500">
        <p className="py-4">2024 Mehedi Hasan. All rights reserved</p>
        <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
          {items.map((x, index) => {
            return <x.icon key={index} className="hover:text-white" />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;