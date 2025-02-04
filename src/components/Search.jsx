const Search = ({ onSearchChange }) => {

  const searchHandler = (e) => {
    onSearchChange(e.target.value);
    };


  return (
    <form className="flex h-[38px] w-[243px] flex-col items-center justify-center rounded-[4px] bg-Secondary p-[7px_12px_7px_20px]">
      <div className="flex h-[24px] w-[211px] flex-row items-center justify-center gap-[34px] p-0">
        <input
          className="h-[18px] w-[153px] font-poppins text-[12px] leading-[18px] bg-Secondary outline-none  text-black opacity-50"
          type="text"
        onChange={searchHandler}
          name="search"
          placeholder="What are you looking for?"
        />

        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          cursor= "pointer"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 20L16.2223 16.2156M18.3158 11.1579C18.3158 13.0563 17.5617 14.8769 16.2193 16.2193C14.8769 17.5617 13.0563 18.3158 11.1579 18.3158C9.2595 18.3158 7.43886 17.5617 6.0965 16.2193C4.75413 14.8769 4 13.0563 4 11.1579C4 9.2595 4.75413 7.43886 6.0965 6.0965C7.43886 4.75413 9.2595 4 11.1579 4C13.0563 4 14.8769 4.75413 16.2193 6.0965C17.5617 7.43886 18.3158 9.2595 18.3158 11.1579V11.1579Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </form>
  );
};

export default Search;
