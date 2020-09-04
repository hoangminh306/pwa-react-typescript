import React from 'react';

const TodoSearchFilter = (
	props: {
		handleSearch: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
		handleSort: ((event: React.ChangeEvent<HTMLSelectElement>) => void) | undefined;
		handleFilter: ((event: React.ChangeEvent<HTMLSelectElement>) => void) | undefined;
	}
) => {
	return (
		<div style={{ marginTop: 20 }}>
			<input
				id="input-search"
				onChange={props.handleSearch}
				placeholder="Enter text to search"
				style={{ width: '50%', border: '1px solid black', height: 19, marginRight: 10 }}
			/>
			<select onChange={props.handleFilter} style={{ marginRight: 10 }}>
				<option value="">Filter by</option>
				<optgroup label="Status">
					<option value="notDoing">Not Doing</option>
					<option value="doing">Doing</option>
					<option value="complete">Complete</option>
				</optgroup>
				<optgroup label="Priority">
					<option value="medium">Medium</option>
					<option value="high">High</option>
					<option value="critical">Critical</option>
				</optgroup>
			</select>
			<select onChange={props.handleSort} >
				<option value="">Sort by</option>
				<option value="priorityASC">Priority ascending</option>
				<option value="priorityDESC">Priority descending</option>
			</select>
		</div>
	)
}

export default TodoSearchFilter;
