import React, {useState, Fragment} from 'react'
import ReactorIcon from './ReactorIcon'

import { ReactComponent as Tongue } from '../../../Assets/Emoji/tongue.svg'
import { ReactComponent as Love } from '../../../Assets/Emoji/in-love.svg'
import { ReactComponent as Surprised } from '../../../Assets/Emoji/surprised.svg'
import { ReactComponent as Sleepy } from '../../../Assets/Emoji/sleepy.svg'
import { ReactComponent as Crying } from '../../../Assets/Emoji/crying.svg'
import { ReactComponent as Angry } from '../../../Assets/Emoji/angry.svg'

import { Query } from 'react-apollo'
import { GET_REACTORS } from '../../../Queries'

import '../../Styles/TopReact.scss'
import { isUndefined } from 'util';

export const TopReact: React.FC<any> = (props) => {
  const[reacts, initReacts] = useState({react: 'tongue',total: 0})
  const[total, setTotal] = useState(props.reactTotal)

  let topReact = ''

  let compare = (a, b) => {
    const totalA = a.total
    const totalB = b.total

    let comparison = 0;
    if (totalA > totalB) {
      comparison = -1;
    } else {
      comparison = 1;
    }
    return comparison;
  }

  const init = (props) => {
    initReacts(props)
    var reactTotal = props.reduce(function(prev, cur) {
      return prev + cur.total
    }, 0)
    setTotal(reactTotal)
  }

  return (
    <Query query={GET_REACTORS} variables={{tagId: props.tagId}}>
      {({ loading, error, data}) => { 
        if (loading) return null
        else if (error) return `Error! ${error.message}`
        else if (data.reactors===[]) return null
        init(data.reactors.sort(compare))
        topReact = data.reactors.sort(compare)[0].react
        console.log('top react',topReact)
        if (total == 0) return null
        else if (topReact==='tongue') return (<Fragment><Tongue className='top-react'/><div className='top-react-container'>{Math.round((data.reactors.sort(compare)[0].total/total)*100)}%</div></Fragment>)
        else if (topReact==='heart-eyes') return (<Fragment><Love className='top-react'/><div className='top-react-container'>{Math.round((data.reactors.sort(compare)[0].total/total)*100)}%</div></Fragment>)
        else if (topReact==='sleep') return (<Fragment><Sleepy className='top-react'/><div className='top-react-container'>{Math.round((data.reactors.sort(compare)[0].total/total)*100)}%</div></Fragment>)
        else if (topReact==='shock') return (<Fragment><Surprised className='top-react'/><div className='top-react-container'>{Math.round((data.reactors.sort(compare)[0].total/total)*100)}%</div></Fragment>)
        else if (topReact==='cry') return (<Fragment><Crying className='top-react'/><div className='top-react-container'>{Math.round((data.reactors.sort(compare)[0].total/total)*100)}%</div></Fragment>)
        else if (topReact==='angry') return (<Fragment><Angry className='top-react'/><div className='top-react-container'>{Math.round((data.reactors.sort(compare)[0].total/total)*100)}%</div></Fragment>)
        else return ( null )
      }}
    </Query>
  )
  return null
}