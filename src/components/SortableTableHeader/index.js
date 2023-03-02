/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';

import SortInactive from '../../assets/table-sort-inactive';
import SortAscending from '../../assets/table-sort-ascending';
import SortDescending from '../../assets/table-sort-descending';

export const sortAlpha = (key, arr) => {
	const newArr = [...arr];
	newArr.sort((a, b) => {
		const aa = a[key];
		const bb = b[key];

		if (aa.toLowerCase() < bb.toLowerCase()) {
			return -1;
		}
		if (aa.toLowerCase() > bb.toLowerCase()) {
			return 1;
		}
		return 0;
	});
	return newArr;
};

const unixTime = (datetime) => Date.parse(datetime);

export const sortChronological = (
	key,
	arr
) => {
	const newArr = [...arr];
	newArr.sort((a, b) => {
		const aa = unixTime(a[key]);
		const bb = unixTime(b[key]);

		if (aa < bb || !bb) {
			return -1;
		}
		if (aa > bb || !aa) {
			return 1;
		}
		return 0;
	});
	return newArr;
};

export const SortableTableHeader = ({
	setActiveColumn,
	activeColumn,
	onSortAscending,
	onSortDescending,
	text,
	initialDirection,
	...props
}) => {
	const [direction, setDirection] = useState(initialDirection);
	return (
		<th>
			<button
				{...props}
				type="button"
				onClick={() => {
					if (direction === 'ASC') {
						if (activeColumn) {
							onSortDescending();
							setDirection('DESC');
						} else {
							onSortAscending();
							setDirection('ASC');
						}
					}

					if (direction === 'DESC') {
						if (activeColumn) {
							onSortAscending();
							setDirection('ASC');
						} else {
							onSortDescending();
							setDirection('DESC');
						}
					}
					setActiveColumn();
				}}
			>
				<div>{text}</div>
				{direction === 'ASC' && activeColumn && (
					<SortAscending
						size={15}
						aria-label="ascending"
	
					/>
				)}
				{direction === 'DESC' && activeColumn && (
					<SortDescending
						size={15}
						aria-label="descending"
						
					/>
				)}
				{!activeColumn && (
					<SortInactive
						size={15}
						aria-label={
							direction === 'DESC' ? 'descending' : 'ascending'
						}
						
					/>
				)}
			</button>
		</th>
	);
};
