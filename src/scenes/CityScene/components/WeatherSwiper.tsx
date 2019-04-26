import * as React from 'react';
import SwiperSlide from 'react-id-swiper/lib/ReactIdSwiper.full';
import { WeatherSwiperItem } from './WeatherSwiperItem';
import { IWeatherShortInfo } from '../../../models/IWeatherShortInfo';

interface IWeatherSwiperProps {
	items: IWeatherShortInfo[];
}

export const WeatherSwiper = (props: IWeatherSwiperProps) => {
	const { items } = props;

	const params = {
		slidesPerView: 3,
		spaceBetween: 30,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		breakpoints: {
			900: {
				slidesPerView: 2,
				spaceBetween: 30
			},
			600: {
				slidesPerView: 1,
				spaceBetween: 20
			}
		}
	};

	return <React.Fragment>
		<SwiperSlide {...params} shouldSwiperUpdate rebuildOnUpdate>
			{items.map(i => <div key={i.date}><WeatherSwiperItem weather={i}></WeatherSwiperItem></div>)}
		</SwiperSlide>
	</React.Fragment>
}