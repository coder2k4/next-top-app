import styles from './Rating.module.scss';
import {RatingProps} from "./Rating.props";
import cn from 'classnames';
import {useEffect, useState} from "react";
import StarIcon from "./star.svg";

const Rating = ({isEditable = false, rating, setRating, className, ...props}: RatingProps): JSX.Element => {

    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    useEffect(()=> {
        constructRating(rating);
    }, [rating]);

    const constructRating = (currentRating : number) => {
        const updatedRating = ratingArray.map((star: JSX.Element, i:number) => {
            return (
                <StarIcon className={cn(styles.star, {
                    [styles.fill]: i < currentRating
                })}/>
            );
        });
        setRatingArray(updatedRating);
    };

    
    return (
        <div {...props}>
            {ratingArray.map((r,i)=>(<span key={i}>{r}</span>))}
        </div>
    );
};

export default Rating;