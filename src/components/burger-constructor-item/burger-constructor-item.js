import React,{useRef} from 'react';
import styles from "../burger-constructor-list/constructor-list.module.css";
import {ConstructorElement,DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag,useDrop} from "react-dnd";
import {useDispatch,useSelector} from "react-redux";
import {ingredientDetails} from "../../redux/ingredient-details/selectors";
import {deleteIngredient,sortIngredient} from "../../redux/ingredient-details/actions";

const BurgerConstructorItem = ({id, index, data}) => {

  const ref = useRef(null)

  const {ingredient} = useSelector(ingredientDetails)

  const dispatch = useDispatch()

  const sortingIngredient = (dragIndex, hoverIndex) => {
    const newIngredients = [...ingredient];
    newIngredients.splice(hoverIndex,0,newIngredients.splice(dragIndex, 1)[0]
    );
    dispatch(sortIngredient(newIngredients))
  }

  const [, dropRef] = useDrop({
    accept:'card',
    hover: (item, monitor) => {
      if(!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if(dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      sortingIngredient(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  })

  const [{isDragging}, dragRef] = useDrag({
    type: 'card',
    item: () => {
      return { id, index }
    },
    collect: (monitor => ({
      isDragging: monitor.isDragging()
    }))
  })

  const opacity = isDragging ? 0 : 1

  dragRef(dropRef(ref))

  const handleDelete = () => {
    dispatch(deleteIngredient(data))
  }

  return (
    <ul style={{opacity}} ref={ref} className={styles.content}>
      <li>
        <DragIcon type='primary'/>
      </li>
      <ConstructorElement
        text={data.name}
        thumbnail={data.image}
        price={data.price}
        handleClose={handleDelete}
      />
    </ul>
  );
};

export default BurgerConstructorItem;
