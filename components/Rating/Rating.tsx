import styles from './Rating.module.scss';
import {RatingProps} from "./Rating.props";
import cn from 'classnames';
import {useEffect, useState, KeyboardEvent} from "react";
import StarIcon from "./star.svg";

const Rating = ({isEditable = false, rating, setRating, className, ...props}: RatingProps): JSX.Element => {

    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    useEffect(() => {
        constructRating(rating);
    }, [rating]);

    const constructRating = (currentRating: number) => {
        const updatedRating = ratingArray.map((star: JSX.Element, i: number) => {
            return (
                <span
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => onClick(i + 1)}
                >
                    <StarIcon
                        className={cn(styles.star, {[styles.fill]: i < currentRating})}
                        tabIndex={isEditable ? 0 : -1}
                        onKeyDown={(e: KeyboardEvent<SVGElement>) => (isEditable && handleSpace(i + 1, e))}
                    />
                </span>
            );
        });
        setRatingArray(updatedRating);
    };

    const changeDisplay = (i: number): void => {
        if (!isEditable)
            return;
        constructRating(i);
    };

    const onClick = (i: number): void => {
        if (!isEditable || !setRating)
            return;
        setRating(i);
    };

    const handleSpace = (i: number, e: KeyboardEvent<SVGElement>): void => {
        if (e.code != 'Space' || !setRating)
            return;
        setRating(i);
    };

    return (
        <div {...props}>
            {ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
        </div>
    );
};

export default Rating;