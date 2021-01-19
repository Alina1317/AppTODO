import React from 'react';
import PropTypes from 'prop-types';
import DoneIcon from '@material-ui/icons/Done';
import ViewListIcon from '@material-ui/icons/ViewList';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styles from './Footer.module.css';

const Footer = ({count, num, numDone, onClickFilter, onClickAllDelete, onClickDelete}) => (<div className={styles.button}>
	<div className={styles.active} id="active" onClick={() => onClickFilter('active')}><button className={styles.click}>Active{<AccessAlarmIcon />}{num}</button></div>
	<div className={styles.done} id="done" onClick={() => onClickFilter('done')}><button className={styles.click}>Done{<DoneIcon />}{numDone}</button></div>
	<div className={styles.all} id="all" onClick={() => onClickFilter('all')}><button className={styles.click}>All{<ViewListIcon />}{count}</button></div>
	<div className={styles.delete} onClick={onClickAllDelete}><button className={styles.click}>Delete{<DeleteForeverIcon />}</button></div>
</div>);

Footer.propTypes = {
	count: PropTypes.number.isRequired
};

export default Footer;