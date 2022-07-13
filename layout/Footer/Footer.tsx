import { FooterProps } from './Footer.props';
import { format } from 'date-fns';
import styles from './Footer.module.css';
import cn from 'classnames';

export const Footer = ({ className,...props }: FooterProps): JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<div>
				Rating APP © {format(new Date(), 'yyyy')} Все права защищены
			</div>
			<a href="#" target="_blank">Пользовательское соглашение</a>
			<a href="#" target="_blank">Политика конфиденциальности</a>
		</footer>
	);
};