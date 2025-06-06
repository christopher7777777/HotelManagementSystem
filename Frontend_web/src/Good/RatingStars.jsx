const RatingStars = ({rating}) => {
    const ratings = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(
                    <span key={i} className="text-base md:text-lg xl:text-xl text-yellow-500">
                        &#9733;
                    </span>
                );
            } else {
                stars.push(
                    <span key={i} className="text-base md:text-lg xl:text-xl text-gray-200">
                        &#9733;
                    </span>
                );
            }
        }
        return stars;
    };

    return (
        <div className="flex justify-center gap-1 w-full">
            {ratings()}
        </div>
    );
};

export default RatingStars;