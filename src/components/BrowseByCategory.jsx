import PropTypes from "prop-types";

const BrowseByCategory = ({
  categoryCard,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isSelected,
  isHovered,
}) => {
  return (
    <div className="categoryCards">
      <div
        className={`relative h-[145px] w-[170px] transform cursor-pointer rounded-[4px] border-[1px] border-black/30 ${
          isSelected || isHovered ? "border-none bg-Secondary2 transition-transform duration-300 ease-in-out hover:z-10 hover:scale-105 rounded-[4px]" : ""
        }`}
        onClick={() => onClick(categoryCard)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          className={`absolute bottom-[24px] left-1/2 translate-x-[-50%] font-poppins text-[16px] font-normal leading-[24px] text-black ${
            isSelected || isHovered ? "text-white" : ""
          }`}
        >
          {categoryCard.name}
        </div>
        <div className="absolute left-1/2 top-[25px] h-[56px] w-[56px] translate-x-[-50%]">
          <img
            src={
              isSelected || isHovered
                ? categoryCard.whiteImage
                : categoryCard.image
            }
            alt={categoryCard.name}
          />
        </div>
      </div>
    </div>
  );
};

BrowseByCategory.propTypes = {
  categoryCard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    whiteImage: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  isHovered: PropTypes.bool.isRequired,
};

export default BrowseByCategory;