import styles from './P.module.scss';
import {PProps} from "./P.props";
import cn from 'classnames';

const P = ({size = 'm', children, className, ...props}: PProps): JSX.Element => {
    return (
        <p className={
            cn(styles, className,{
                [styles.s]: size == 's',
                [styles.m]: size == 'm',
                [styles.l]: size == 'l',
            })
        }
           {...props}
        >
           {children}
        </p>
    );
};

export default P;