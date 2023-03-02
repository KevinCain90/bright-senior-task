import React from 'react';

const TableSortDescending = ({
	size,
	...props
}) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 16 16"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M8.56 3.44A1.5 1.5 0 0 1 9 4.5C9 5.323 8.323 6 7.5 6h-6C.677 6 0 5.323 0 4.5c0-.398.158-.78.44-1.06l3-3a1.5 1.5 0 0 1 2.12 0l3 3Z"
			fill="#999"
		/>
		<path
			d="M.44 12.56A1.5 1.5 0 0 1 0 11.5c0-.823.677-1.5 1.5-1.5h6c.823 0 1.5.677 1.5 1.5a1.5 1.5 0 0 1-.44 1.06l-3 3a1.5 1.5 0 0 1-2.12 0l-3-3Z"
			fill="#999"
		/>
	</svg>
);

export default TableSortDescending;
