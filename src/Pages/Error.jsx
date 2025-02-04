import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const Error = () => {
  const location = useLocation();
  const [nestedLinks, setNestedLinks] = useState([]);

  useEffect(() => {
    const pathArray = location.pathname.split("/").filter((path) => path);

    const updatedNestedLinks = ["Home", ...pathArray, "404 Error"];
    setNestedLinks(updatedNestedLinks);
  }, [location.pathname]);


  return (
    <>
    <div className="absolute lg:left-[135px] sm:left-12 top-[222px] flex h-[21px] w-[134px] text-nowrap flex-row items-center gap-[14px]">
      <nav>
        <ul className="flex items-center space-x-2">
        {nestedLinks.map((segment, index) => {
            const isActive = index === nestedLinks.length - 1;
            const path =
              index === 0
                ? "/"
                : `/${nestedLinks.slice(1, index).join("/")}`;

              return (
                <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-1 xt-black opacity-50">/</span>}
                {isActive ? (
                  <span className="text-black opacity-100">{segment}</span>
                ) : (
                  <Link
                    to={path}
                    className="text-sm font-normal text-black opacity-50"
                  >
                    {segment}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>

      <div
        className="relative flex flex-col items-center gap-10 m-auto h-[179px] top-[383px] lg:w-[829px] md:w-[700px] sm:w-[300px]"
      >
        <p className="h-[115px] lg:w-[829px]  md:w-[425px] sm:w-auto lg:text-[110px] md:text-[60px] sm:text-[40px] font-medium leading-[115px] tracking-[0.03em] text-black text-nowrap">
          404 Not Found
        </p>

        <p className="h-[24px] md:w-[325px] sm:w-auto text-sm font-normal leading-[24px] text-black text-nowrap">
          Your visited page {location.pathname} not found. You may go home page.
        </p>
      </div>
      <div className="flex justify-center">
        <Link
          className="relative flex h-[56px] w-[254px] items-center justify-center gap-2.5 rounded-md bg-Secondary2 p-4 mt-[642px] mb-[140px] m-auto"
          to="/"
        >
          <span className="text-[16px] font-poppins font-medium leading-6 text-white">
          Back to home page
          </span>
        </Link>
      </div>
    </>
  );
};

export default Error;
