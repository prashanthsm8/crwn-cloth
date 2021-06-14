import React from 'react'
import SHOP_DATA from './shoppage.data.jsx'
import CollectionPreview from '../../component/collection-preview/collection-preview.component'

class ShopPage extends React.Component{
    constructor()
    {
        super();
        this.state={
            collections : SHOP_DATA 
        }
    }

    render()
    {
        let {collections} = this.state;
        return(
            <div>
                {
                    collections.map(({id,...otherprops})=>
                    (
                        <CollectionPreview key={id} {...otherprops}/>
                    ))
                }
            </div>
        )
    }
}

export default ShopPage;