import React from 'react';
import { PaginationInterface } from '../interfaces';

const Pagination = (props: PaginationInterface) => {
	const handlePageClick = (page: number) => {
		props.handlePageClick(page);
	};

	let currentPage = props.currentPage;
	const pageSize = props.pageSize;
	let nPage = Math.ceil(props.totalResult / props.resultPerPage);
	let listPage = [];
	let maxPage = nPage > currentPage + pageSize ? currentPage + pageSize : nPage;
	let minPage = currentPage - pageSize > 1 ? currentPage - pageSize : 1;
	minPage = minPage >= 1 ? minPage : 1;
	let isActiveClass = '';
	for (let i = minPage;i <= maxPage;i++) {
		if (i === currentPage) {
			isActiveClass = 'is-actived';
		} else {
			isActiveClass = '';
		}
		listPage.push(
			<a
				style={{ margin: '0 5px', cursor: 'pointer' }}
				key={i}
				onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => handlePageClick(i)}
			>
				{i}
			</a>
		);
	}

	if (props.totalResult <= props.resultPerPage) return null;

	return (
		<div style={{ display: 'flex', marginTop: 30 }}>
			<a
				onClick={
					currentPage > 1
						? (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => handlePageClick(currentPage - 1)
						: () => { }
				}
				href="#"
			>
				Trước
			</a>
			<div style={{ margin: '0 10px' }}>
				{listPage}
			</div>
			<a
				onClick={
					currentPage < nPage
						? (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => handlePageClick(currentPage + 1)
						: () => { }
				}
				href="#"
			>
				Tiếp
			</a>
		</div>
	);
}

export default Pagination;
