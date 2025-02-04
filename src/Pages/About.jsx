import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const About = () => {
  const PERSONS = [
    {
      id: 1,
      name: "Tom Cruise",
      job: "Founder & Chairman",
      image: "src/assets/Tom Cruise image.svg",
      imgWidth: "w-[236px]",
      links: {
        twitter: "https://twitter.com/TomCruise",
        instagram: "https://www.instagram.com/TomCruise",
        linkedin: "https://www.linkedin.com/in/TomCruise",
      },
    },
    {
      id: 2,
      name: "Emma Watson",
      job: "Managing Director",
      image: "src/assets/Emma-image.svg",
      imgWidth: "w-[326px]",
      links: {
        twitter: "https://twitter.com/EmmaWatson",
        instagram: "https://www.instagram.com/emmawatson",
        linkedin: "https://www.linkedin.com/in/emma-watson",
      },
    },
    {
      id: 3,
      name: " Will Smith",
      job: "Product Designer",
      image: "src/assets/Emma-image.svg",
      imgWidth: "w-[326px]",
      links: {
        twitter: "https://twitter.com/WillSmith",
        instagram: "https://www.instagram.com/willsmith",
        linkedin: "https://www.linkedin.com/in/will-smith",
      },
    },
  ];

  const STATISTICS = [
    {
      id: 1,
      name: "Sallers active our site",
      image: "src/assets/Card1.svg",
      imageBlack: "src/assets/Card1-black.svg",
      statistic: "10.5k",
      statisticWidth: "w-[92px]",
    },
    {
      id: 2,
      name: "Mopnthly Produduct Sale",
      image: "src/assets/Card2.svg",
      imageBlack: "src/assets/Card2-black.svg",
      statistic: "33k",
      statisticWidth: "w-[64px]",
    },
    {
      id: 3,
      name: "Customer active in our site",
      image: "src/assets/Card3.svg",
      imageBlack: "src/assets/Card3-black.svg",
      statistic: "45.5k",
      statisticWidth: "w-[96px]",
    },
    {
      id: 4,
      name: "Anual gross sale in our site",
      image: "src/assets/Card4.svg",
      imageBlack: "src/assets/Card4-black.svg",
      statistic: "25k",
      statisticWidth: "w-[62px]",
    },
  ]

  const [hovered, setHovered] = useState(null);
  const personRefs = useRef([]);
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [nestedLinks, setNestedLinks] = useState([]);
  const [activePerson, setActivePerson] = useState(0);

  useEffect(() => {
    if (location.pathname === "/about") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    const pathArray = location.pathname.split("/").filter((path) => path);
    setNestedLinks(pathArray);
  }, [location.pathname]);

  const itemHoverHandler = (item) => {
    setHovered(item.id);
  };

  const personClickHandler = (index) => {
    setActivePerson(index);

    personRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
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
      <div className="absolute top-[422px] flex h-[336px] flex-col items-start gap-10 p-0 sm:ml-[12%] sm:w-[225px] md:ml-[3%] md:w-[525px] lg:ml-[14%] xl:ml-[135px]">
        <div className="h-[64px] w-[277px] text-justify text-[54px] font-semibold leading-[64px] tracking-[0.06em] text-black">
          Our Story
        </div>
        <div className="flex h-[232px] flex-col items-start sm:w-[225px] sm:gap-32 md:w-[525px] md:gap-6">
          <div className="h-[130px] text-sm font-normal leading-[26px] text-black sm:w-[225px] md:w-[525px]">
            Launched in 2015, Exclusive is South Asia’s premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a
            wide range of tailored marketing, data, and service solutions,
            Exclusive has 10,500 sellers and 300 brands and serves 3 million
            customers across the region.
          </div>
          <div className="h-[78px] text-sm font-normal leading-[26px] text-black sm:w-[205px] md:w-[505px]">
            Exclusive has more than 1 million products to offer, growing at a
            very fast pace. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </div>
        </div>
      </div>

      <div className="absolute top-[285px] h-[609px] rounded-bl-[0px] rounded-br-[0px] rounded-tl-[4px] rounded-tr-[4px] bg-[#EB7EA8] sm:left-[89%] sm:w-[10%] md:left-[74%] md:w-[25%] xl:left-[735px] xl:w-[705px]"></div>
      
      <div className="m-auto mt-[894px] grid h-[230px] items-start justify-center sm:w-[270px] sm:grid-cols-1 sm:gap-20 md:w-[570px] md:grid-cols-2 lg:gap-[30px] xl:w-[1170px] xl:grid-cols-4">
  {STATISTICS.map((item) => {
    const isHovered = hovered === item.id;

    return (
      <div
        key={item.id}
        onMouseEnter={() => itemHoverHandler(item)}
        onMouseLeave={() => setHovered(null)}
        className={`h-[230px] w-[270px] rounded-[4px] border border-[#0000004D] hover:bg-Secondary2 transition-transform duration-300 ${
          isHovered
            ? "border-none bg-Secondary2"
            : ""
        }`}
      >
        <div className="m-auto flex h-[170px] w-[262px] flex-col items-center gap-6">
          <div
            className={`m-auto h-[80px] w-[80px] p-[0px] mt-[30px] rounded-full border-[9px] border-black/30 ${
                isHovered
                  ? "border-white/30"
                  : ""
            } transition-colors duration-300`}
          >
            <div
              className={`m-auto h-[61px] w-[62px] p-[10px] rounded-full bg-black ${
                isHovered
                  ? " bg-white"
                  : ""
              } transition-colors duration-300`}
            >
              <div className="m-auto h-[40px] w-[40px] rounded-full">
              {(isHovered) ? (
    <img src={item.imageBlack} alt={item.name} />
  ) : (
    <img src={item.image} alt={item.name} />
  )}
              </div>
            </div>
          </div>
        
        <div className="m-auto h-[66px] w-[215px]">
          <div
            className={`m-auto h-[30px] ${item.statisticWidth} text-[32px] font-semibold leading-[30px] tracking-[0.04em] text-nowrap text-black ${
              isHovered ? "text-white" : ""
            } transition-colors duration-300`}
          >
            {item.statistic}
          </div>
          <div
            className={`m-auto h-[24px] w-[215px] text-center text-[16px] font-normal leading-[24px] text-nowrap text-black ${
              isHovered ? "text-white" : ""
            } transition-colors duration-300`}
          >
            {item.name}
          </div>
        </div>
        </div>
      </div>
    );
  })}
</div>

      <div className="m-auto justify-center sm:mt-[1090px] sm:grid sm:w-[100%] sm:gap-20 md:mt-[440px] lg:flex lg:w-[1024px] lg:gap-4 xl:mt-[145px] xl:w-[1170px] xl:gap-[30px]">
        {PERSONS.map((person, index) => (
          <div
            key={person.id}
            onClick={() => personClickHandler(index)}
            ref={(el) => (personRefs.current[index] = el)} 
            className="flex h-[564px] flex-col gap-[32px] sm:w-[370px] lg:w-[306px] xl:w-[370px]"
          >
            <div className="h-[430px] rounded-md bg-[#F5F5F5] sm:w-[370px] lg:w-[306px] xl:w-[370px]">
              <div
                className={`m-auto h-[392px] ${person.imgWidth} border-none pt-[39px]`}
              >
                <img src={person.image} alt={person.name} />
              </div>
            </div>

            <div className="flex h-[102px] w-[185px] flex-col gap-[16px]">
              <div className="flex flex-col gap-[8px]">
                <h2 className="text-nowrap text-[32px] font-medium leading-[30px] tracking-[0.04em] text-black">
                  {person.name}
                </h2>
                <p className="font-regular text-[16px] leading-[24px] text-black">
                  {person.jop}
                </p>
              </div>
              <div className="flex gap-[16px]">
                {activePerson !== null && (
                  <>
                    <Link
                      className="h-[24px] w-[24px]"
                      to={PERSONS[activePerson].links.twitter}
                      target="_blank"
                    >
                      <img
                        src="src/assets/Twitter-black.svg"
                        alt="Twitter icon"
                      />
                    </Link>
                    <Link
                      className="h-[24px] w-[24px]"
                      to={PERSONS[activePerson].links.instagram}
                      target="_blank"
                    >
                      <img
                        src="src/assets/InstegramBlack.svg"
                        alt="Instagram icon"
                      />
                    </Link>
                    <Link
                      className="h-[24px] w-[24px]"
                      to={PERSONS[activePerson].links.linkedin}
                      target="_blank"
                    >
                      <img src="src/assets/Linked-in.svg" alt="LinkedIn icon" />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3">
        {PERSONS.map((_, index) => (
          <a
            key={index}
            onClick={() => personClickHandler(index)}
            className={`h-[12px] w-[12px] cursor-pointer rounded-full ${
              activePerson === index
                ? "h-[10px] w-[10px] border-opacity-30 bg-Secondary2 shadow-[0_0_0_2px_rgba(0,0,0,0.3)]"
                : "h-3 w-3 bg-black opacity-30"
            }`}
          ></a>
        ))}
      </div>
      <div className="m-auto mb-[140px] mt-[184px] flex min-h-[161px] items-center justify-center gap-[88px] sm:flex-col lg:flex-row xl:w-[943px]">
        <div className="flex h-[161px] w-[249px] flex-col items-center gap-[24px]">
          <img
            src="src/assets/Delivery cartage.svg"
            className="h-[80px] w-[80px]"
            alt="Delivery cartage image"
          />
          <div className="flex h-[57px] w-[249px] flex-col items-center gap-[8px]">
            <h2 className="h-[28px] w-[242px] font-poppins text-[20px] font-semibold leading-[28px] text-[#000000]">
              FREE AND FAST DELIVERY
            </h2>
            <p className="font-regular h-[21px] w-[249px] text-center font-poppins text-[14px] leading-[21px] text-[#000000]">
              Free delivery for all orders over $140
            </p>
          </div>
        </div>

        <div className="flex h-[161px] w-[249px] flex-col items-center gap-[24px]">
          <img
            src="src/assets/Head phone.svg"
            className="h-[80px] w-[80px]"
            alt="Head phone image"
          />
          <div className="flex h-[57px] w-[247px] flex-col items-center gap-[8px]">
            <h2 className="h-[28px] w-[247px] font-poppins text-[20px] font-semibold leading-[28px] text-[#000000]">
              24/7 CUSTOMER SERVICE
            </h2>
            <p className="font-regular h-[21px] w-[219px] font-poppins text-[14px] leading-[21px] text-[#000000]">
              Friendly 24/7 customer support
            </p>
          </div>
        </div>

        <div className="flex h-[161px] w-[249px] flex-col items-center gap-[24px]">
          <img
            src="src/assets/True sign.svg"
            className="h-[80px] w-[80px]"
            alt="True sign image"
          ></img>
          <div className="flex h-[57px] w-[256px] flex-col items-center gap-[8px]">
            <h2 className="h-[28px] w-[256px] font-poppins text-[20px] font-semibold leading-[28px] text-[#000000]">
              MONEY BACK GUARANTEE
            </h2>
            <p className="font-regular h-[21px] w-[220px] text-nowrap font-poppins text-[14px] leading-[21px] text-[#000000]">
              We return money within 30 days
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
