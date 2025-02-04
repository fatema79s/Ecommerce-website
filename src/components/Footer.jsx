import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="sm:mt-auto w-[100%] bg-black min-h-[440px]">
        <div className="xl:pl-[135px] sm:pl-[8%] lg:pl-[12%] pt-[80px] xl:flex xl:h-[236px] xl:w-[1170px] xl:flex-row sm:flex sm:flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 xl:gap-y-[87px] xl:gap-x-[87px] lg:gap-x-[20px] sm:gap-x-20 sm:gap-y-20 md:gap-x-[30%]">
          <div className="flex h-[188px] w-[217px] flex-col gap-4">
            <h2 className="font-inter text-[24px] font-bold leading-[24px] tracking-[0.03em] text-white">
              Exclusive
            </h2>
            <p className="cursor-pointer font-poppins text-[20px] font-medium leading-[28px] text-white">
              Subscribe
            </p>
            <p className="leading-[24px]cursor-pointer font-poppins text-[16px] font-normal text-white">
              Get 10% off your first order
            </p>
            <div className="flex h-12 w-[217px] items-center rounded border border-white px-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-[130px] bg-black font-poppins text-[16px] font-normal leading-[24px] text-white opacity-40 outline-none"
              />
              <button className="ml-auto h-6 w-6">
                <img src="src/assets/icon-send.svg" alt="send icon image" />
              </button>
            </div>
          </div>

          <div className="flex h-[180px] w-[175px] flex-col gap-6">
            <p className="font-poppins text-[20px] font-medium leading-[28px] text-white">
              Support
            </p>
            <address className="leading-[24px]cursor-pointer flex flex-col gap-4 font-poppins text-[16px] font-normal not-italic text-white">
              <p>
                111 Bijoy sarani, Dhaka, <br /> DH 1515, Bangladesh.
              </p>
              <p>exclusive@gmail.com</p>
              <p>+88015-88888-9999</p>
            </address>
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-poppins text-[20px] font-medium leading-[28px] text-white">
              Account
            </p>
            <nav className="flex flex-col gap-4">
              <a
                href="#"
                className="leading-[24px]cursor-pointer font-poppins text-[16px] font-normal text-white"
              >
                My Account
              </a>
              <Link  to="/login"
                className="leading-[24px]cursor-pointer text-nowrap font-poppins text-[16px] font-normal text-white"
              >
                Login / Register
              </Link>
              <a
                href="#"
                className="leading-[24px]cursor-pointer font-poppins text-[16px] font-normal text-white"
              >
                Cart
              </a>
              <a
                href="#"
                className="leading-[24px]cursor-pointer font-poppins text-[16px] font-normal text-white"
              >
                Wishlist
              </a>
              <a
                href="#"
                className="leading-[24px]cursor-pointer font-poppins text-[16px] font-normal text-white"
              >
                Shop
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-nowrap font-poppins text-[20px] font-medium leading-[28px] text-white">
              Quick Link
            </p>
            <nav className="flex flex-col gap-4">
              <a
                href="#"
                className="leading-[24px]cursor-pointer text-nowrap font-poppins text-[16px] font-normal text-white"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="leading-[24px]cursor-pointer text-nowrap font-poppins text-[16px] font-normal text-white"
              >
                Terms Of Use
              </a>
              <a
                href="#"
                className="leading-[24px]cursor-pointer font-poppins text-[16px] font-normal text-white"
              >
                FAQ
              </a>
              <a
                href="#"
                className="leading-[24px]cursor-pointer font-poppins text-[16px] font-normal text-white"
              >
                Contact
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-6">
              <h2 className="font-poppins text-[20px] font-medium leading-[28px] text-white">
                Download App
              </h2>
              <p className="text-nowrap font-poppins text-[12px] font-medium leading-[18px] text-white opacity-70">
                Save $3 with App New User Only
              </p>
            </div>

            <div className="mt-[-8px] flex gap-2">
              <img
                src="src/assets/Qr Code.svg"
                alt="QR Code"
                className="h-20 w-20"
              />
              <div className="flex h-[84px] w-[110px] flex-col gap-1">
                <button className="h-[40px] w-[110px] cursor-pointer">
                  <img src="src/assets/GooglePlay.svg" alt="GooglePlay logo" />
                </button>
                <button className="h-[40px] w-[110px] cursor-pointer">
                  <img src="src/assets/AppStore.svg" alt="App Store logo" />
                </button>
              </div>
            </div>
            <div className="flex h-6 w-[168px] flex-row items-start gap-6">
              <button className="h-6 w-6 cursor-pointer">
                <img src="src/assets/Icon-Facebook.svg" alt="Facebook icon" />
              </button>
              <button className="h-6 w-6 cursor-pointer">
                <img src="src/assets/Icon-Twitter.svg" alt="Twitter icon" />
              </button>
              <button className="h-6 w-6 cursor-pointer">
                <img src="src/assets/icon-instagram.svg" alt="Instagram icon" />
              </button>
              <button className="h-6 w-6 cursor-pointer">
                <img src="src/assets/Icon-Linkedin.svg" alt="Linkedin icon" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-10 w-[100%] mt-36 flex-col items-center opacity-40">
          <hr className="w-full border border-white opacity-40" />
            <div className="flex h-6 w-[337px] flex-row items-center gap-1.5 opacity-60 pt-4">
            <img src="src/assets/icon-copyright.svg" alt="Copyright icon" className="h-5 w-5" />
              <p className="order-1 h-6 w-[311px] flex-none font-poppins text-base leading-6 text-white">
                Copyright Rimel 2022. All right reserved
              </p>
            </div>
        </div>



          
      </footer>
    </>
  );
};

export default Footer;
