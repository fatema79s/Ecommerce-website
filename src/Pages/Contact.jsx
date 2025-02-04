import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const Contact = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [nestedLinks, setNestedLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsVisible(location.pathname !== "/");
  const pathArray = location.pathname.split("/").filter(Boolean);
  setNestedLinks(pathArray);
}, [location.pathname]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      alert("Please fill all the fields.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        timestamp: new Date(),
      });

      alert("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
      {isVisible && (
          <div className="absolute top-[222px] flex h-[21px] w-[134px] flex-row gap-[14px] sm:ml-[12%] md:ml-[3%] lg:ml-[14%] xl:ml-[138px]">
            <nav>
              <ul className="flex items-center space-x-2">
                <li>
                  <Link
                    to="/"
                    className="text-sm font-normal text-black opacity-50"
                  >
                    Home /
                  </Link>
                </li>

                {location.pathname
                  .split("/")
                  .filter((segment) => segment)
                  .map((segment, index, array) => {
                    const path = `/${array.slice(0, index + 1).join("/")}`;
                    const isActive = index === array.length - 1;

                    return (
                      <li
                        key={index}
                        className="flex items-center pt-1 text-center text-sm font-normal"
                      >
                        {index > 0 && (
                          <span className="text-gray-500 mx-1">/</span>
                        )}
                        <Link
                          to={path}
                          className={`${
                            isActive
                              ? "text-black opacity-100"
                              : "text-black opacity-50"
                          }`}
                        >
                          {segment}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </nav>
          </div>
        )}
      </div>

      <div className="xl:absolute sm:relative md:ml-[135px] mt-40 xl:h-[457px] xl:w-[340px] rounded-[4px] bg-white shadow-[0px_1px_13px_rgba(0,0,0,0.05)]">
        <div className="absolute m-auto left-[35px] pt-[40px] flex h-[366px] pb-[51px] w-[270px] xl:flex-col sm:flex-col md:flex-row items-start gap-[32px]">
          <div className="flex h-auto w-[262px] flex-col items-start gap-[24px]">
            <div className="flex h-[40px] w-[135px] flex-row items-center gap-[16px]">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="20" fill="#DB4444" />
                <path
                  d="M18.5542 14.24L15.1712 10.335C14.7812 9.885 14.0662 9.887 13.6132 10.341L10.8312 13.128C10.0032 13.957 9.76623 15.188 10.2452 16.175C13.1069 22.1 17.8853 26.8851 23.8062 29.755C24.7922 30.234 26.0222 29.997 26.8502 29.168L29.6582 26.355C30.1132 25.9 30.1142 25.181 29.6602 24.791L25.7402 21.426C25.3302 21.074 24.6932 21.12 24.2822 21.532L22.9182 22.898C22.8484 22.9712 22.7565 23.0194 22.6566 23.0353C22.5567 23.0512 22.4543 23.0339 22.3652 22.986C20.1357 21.7021 18.2862 19.8502 17.0052 17.619C16.9573 17.5298 16.9399 17.4272 16.9558 17.3272C16.9717 17.2271 17.02 17.135 17.0932 17.065L18.4532 15.704C18.8652 15.29 18.9102 14.65 18.5542 14.239V14.24Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="h-[24px] w-[79px] text-[16px] font-medium text-[#000000]">
                Call To Us
              </div>
            </div>
            <div className="flex h-[58px] w-[262px] flex-col items-start gap-[16px]">
              <div className="h-[21px] w-[262px] text-[14px] text-[#000000]">
                We are available 24/7, 7 days a week.
              </div>
              <div className="h-[21px] w-[150px] text-nowrap text-[14px] text-[#000000]">
                Phone: +8801611112222
              </div>
            </div>
            <div className="h-[0px] w-[270px] border-t-[1px] border-[#000000] opacity-[0.5] md:hidden xl:block"></div>
          </div>

          <div className="xl:mt-6 flex h-[180px] w-[250px] flex-col items-start gap-[24px]">
            <div className="flex h-[40px] w-[147px] flex-row items-center gap-[16px]">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="20" fill="#DB4444" />
                <path
                  d="M10 13L20 20L30 13M10 27H30V13H10V27Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="h-[24px] w-[91px] text-[16px] font-medium text-[#000000]">
                Write To Us
              </div>
            </div>
            <div className="flex h-[116px] w-[250px] flex-col items-start gap-[16px]">
              <div className="h-[42px] w-[250px] text-[14px] text-[#000000]">
                Fill out our form and we will contact <br /> you within 24
                hours.
              </div>
              <div className="h-[21px] w-[232px] text-[14px] text-[#000000]">
                Emails: customer@exclusive.com
              </div>
              <div className="h-[21px] w-[220px] text-[14px] text-[#000000]">
                Emails: support@exclusive.com
              </div>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={submitHandler}
        className="xl:absolute sm:relative xl:left-[505px] sm:m-auto xl:mt-40 sm:mt-[600px] md:h-[457px] sm:h-auto lg:w-[800px] md:w-[768px] sm:w-[100%] rounded-[4px] bg-white shadow-[0px_1px_13px_rgba(0,0,0,0.05)]"
      >
        <div className="absolute xl:left-[31px] sm:left-[5%] py-10 m-auto flex md:h-[377px] sm:h-auto lg:w-[737px] md:w-[702px] flex-col items-end md:gap-[32px]">
          <div className="flex h-[50px] md:w-[737px] sm:w-[300px] md:flex-row sm:flex-col items-start gap-[16px]">
            <div className="flex h-[50px] md:w-[235px] sm:w-[300px] items-start justify-start">
              <div className="absolute h-[50px] md:w-[235px] rounded-[4px] sm:w-[300px] bg-[#F5F5F5]">
                <label className="absolute left-[16px] top-[13px] h-[24px] w-[101px] text-[16px] text-[#000000] opacity-[0.5]">
                  Your Name
                  <span className="text-Secondary2">*</span>
                </label>
                <input
                  className="absolute h-[50px] md:w-[235px] sm:w-[100%] rounded-[4px] outline-none p-4 opacity-[0.5]"
                  id="firstName"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="flex h-[50px] md:w-[235px] sm:w-[100%] items-start justify-start md:mt-0 mt-14">
              <div className="absolute h-[50px] md:w-[235px] sm:w-[100%] rounded-[4px] bg-[#F5F5F5]">
                <label className="absolute left-[16px] top-[13px] h-[24px] w-[96px] text-[16px] text-[#000000] opacity-[0.5]">
                  Your Email
                  <span className="text-Secondary2">*</span>
                </label>
                <input
                  className="absolute h-[50px] md:w-[235px] sm:w-[300px] rounded-[4px] outline-none p-4 opacity-[0.5]"
                  id="emailAddress"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="flex h-[50px] md:w-[235px] sm:w-[100%] items-start justify-start md:mt-0 mt-14">
              <div className="absolute h-[50px] md:w-[235px] sm:w-[100%] rounded-[4px] bg-[#F5F5F5]">
                <label className="absolute left-[16px] top-[13px] h-[24px] w-[102px] text-[16px] text-[#000000] opacity-[0.5]">
                  Your Phone
                  <span className="text-Secondary2">*</span>
                </label>
                <input
                  className="absolute h-[50px] md:w-[235px] sm:w-[100%] rounded-[4px] outline-none p-4 opacity-[0.5]"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
          <div className="flex h-[207px] md:w-[737px] sm:w-[300px] items-start justify-start md:mt-0 sm:mt-[200px]">
            <div className="absolute h-[207px] md:w-[737px] sm:w-[300px] rounded-[4px] bg-[#F5F5F5]">
              <label className="absolute left-[16px] top-[13px] h-[24px] w-[113px] text-[16px] text-[#000000] opacity-[0.5]">
                Your Massage
              </label>
              <textarea
                className="absolute h-[207px] md:w-[737px] sm:w-[300px] rounded-[4px] outline-none p-4 opacity-[0.5]"
                name="message"
                value={formData.message}
                onChange={changeHandler}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="relative flex h-[56px] w-[215px] flex-row items-center justify-center gap-[10px] rounded-[4px] bg-[#DB4444] top-[80px] px-[48px] py-[16px]"
          >
            <div className="h-[24px] w-[119px] text-[16px] font-medium text-[#FAFAFA]">
              {loading ? "Sending..." : "Send Message"}
            </div>
          </button>
        </div>
      </form>

      <div className="xl:mt-[740px] sm:mt-[1340px] md:mt-40"></div>
    </>
  );
};

export default Contact;
