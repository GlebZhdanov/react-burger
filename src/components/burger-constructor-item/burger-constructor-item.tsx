import React, {FC, useRef} from 'react';
import styles from "../burger-constructor-list/constructor-list.module.css";
import {ConstructorElement,DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {DropTargetMonitor, useDrag, useDrop, XYCoord} from "react-dnd";
import {useDispatch, useSelector} from "../../redux/hooks";
import {deleteIngredient,sortIngredient} from "../../redux/ingredient-details/actions";
import {TIngredientData} from "../../utils/types";

type TBurgerConstructorItem = {
  id: string,
  index: number,
  data: TIngredientData,
}

const BurgerConstructorItem: FC<TBurgerConstructorItem> = ({id, index, data}) => {

  const ref = useRef<HTMLUListElement>(null);

  const {ingredient} = useSelector(state => state.ingredients)

  const dispatch = useDispatch()

  const sortingIngredient = (dragIndex: number, hoverIndex: number) => {
    const newIngredients = [...ingredient];
    newIngredients.splice(hoverIndex,0,newIngredients.splice(dragIndex, 1)[0]
    );
    dispatch(sortIngredient(newIngredients))
  }

  const [, dropRef] = useDrop({
    accept:'card',
    hover: (item: TIngredientData , monitor: DropTargetMonitor) => {
      if(!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if(dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

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
