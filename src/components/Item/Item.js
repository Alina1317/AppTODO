import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Item.module.css';

class Item extends React.Component {

	render() {
		const { value, isDone } = this.props;
		return (<span className={
			classnames({
				[styles.item]: true,
				[styles.done]: isDone
			})
		}> 
			{value}
		</span>
		);
	}
}

Item.propTypes = {
	value: PropTypes.string,
    isDone: PropTypes.bool
};

export default Item;