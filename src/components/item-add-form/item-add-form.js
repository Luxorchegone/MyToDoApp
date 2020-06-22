import React from 'react';
import './item-add-form.css';

const ItemAddForm = ( { onItemAdded } ) => {
    
    return (
        <div className="button-wrapper">
                <button type="button"
                    className="button-add btn btn-info"
                    onClick={() => onItemAdded('Hello') }>Добавить задачу</button>
        </div>

    );
};
export default ItemAddForm;