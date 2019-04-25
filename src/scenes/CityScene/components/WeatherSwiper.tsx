import * as React from 'react';
import SwiperSlide from 'react-id-swiper/lib/ReactIdSwiper.full';
import { ICurrentWeather } from '../../../models/ICurrentWeather';

interface IWeatherSwiperProps {
	slicePerView: number,
	// items: ICurrentWeather[]
}

export const WeatherSwiper = (props: IWeatherSwiperProps) => {

	const params = {
		slidesPerView: props.slicePerView,
		spaceBetween: 30,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
	};

	return <React.Fragment>
		<SwiperSlide {...params}>
			<div>Slide 1</div>
			<div>Slide 2</div>
			<div>Slide 3</div>
			<div>Slide 4</div>
			<div>Slide 5</div>
		</SwiperSlide>
	</React.Fragment>
}