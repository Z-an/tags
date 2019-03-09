import React, {Fragment} from 'react'
import { ReactComponent as Fire } from '../../Assets/Emoji/fire.svg'
import { ReactComponent as Search } from '../../Assets/search.svg'
import { ReactComponent as Filter } from '../../Assets/filter.svg'
import Button from '@material-ui/core/Button'

export const WhatsHot: React.FC<any> = (props) => (
  <Fragment>
  <div className='merchant-name-container'><div className='merchant-name'>{props.merchant.name}</div></div>
  <div className='whats-hot-container'>
    <div className='whats-hot'>What's hot</div>
    <div className='button-container'>
      <Filter className='filter-button'/>
      <Search className='search-button'/>
    </div>
  </div>
  </Fragment>
)