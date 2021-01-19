import React, { useState, useEffect } from 'react';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Footer from '../Footer/Footer';
import styles from './Todo.module.css';

const Todo = () => {
	const state = {
		items: JSON.parse(localStorage.getItem('items')) || [
			{
				value: 'Выпить стакан воды',
				isDone: true,
				id: 1
			},
			{
				value: 'Сделать зарядку',
				isDone: false,
				id: 2
			},
			{
				value: 'Завтрак',
				isDone: false,
				id: 3
			},
			{
				value: 'Почитать книгу',
				isDone: false,
				id: 4
			}
		],
		count: JSON.parse(localStorage.getItem("count")) || 4
	}

	const [items, setItems] = useState(state.items);
	const [visibleItems, setVisibleItems] = useState(state.items);
	const [count, setCount] = useState(state.count);
	const [filter, setFilter] = useState('all');

	useEffect(() => {
		localStorage.setItem("items", JSON.stringify(items));
	  }, [items]);

	const onButtonClick = id => {
		const newItemList = items.map(item => {
			const newItem = { ...item };
			if(item.id === id) {
				newItem.isDone = !item.isDone;
			}
			return newItem;
		});
		setItems(newItemList);
		setVisibleItems(filterState(newItemList, filter));
	};
	
	const onClickDelete = id => {
		const deleteItemList = items.filter(item => item.id !== id);
		setItems(deleteItemList)
		setVisibleItems(filterState(deleteItemList, filter));
		setCount(count - 1)  
	};

	const onClickAdd = value => {
		const newItemList = [...items,
			{
				value,
				isDone: false,
				id: count + 1
			}];
		setItems(newItemList);
		setCount( count + 1);
		setVisibleItems(filterState(newItemList, filter));
	};

	const onClickFilter = string => {
		const newItemList = items;
		setFilter(string);
		setVisibleItems(filterState(newItemList, string));
	};

	function filterState(obj, string) {
		return (string === 'active' ? 
			obj.filter(item => !item.isDone) :
				string === 'done' ?
					obj.filter(item => item.isDone) : obj)
	}

	const onClickAllDelete = () => {
		const deleteItemList = items.filter(item => item.isDone !== true);
		setItems(deleteItemList);
		setVisibleItems(filterState(deleteItemList, filter));
	  };

	useEffect(() => {
		localStorage.setItem("count", JSON.stringify(count));
	  }, [count]);

		return (
			<div className={styles.wrap}>
				<div className={styles.color}>
					<h1 className={styles.title}>Дела на день:</h1>
					<InputItem 
						onClickAdd={onClickAdd}
						items={items}/>
					<ItemList 
						items={visibleItems} 
						onButtonClick={onButtonClick} 
						onClickDelete={onClickDelete}/>
					<Footer 
						count={items.length}
						num={items.filter(item => item.isDone === false).length}
						numDone={items.filter(i => i.isDone === true).length}
						onClickFilter={onClickFilter}
						onClickAllDelete={onClickAllDelete}
						onClickDelete={onClickDelete}/>
				</div>
			</div>);
};

export default Todo;
