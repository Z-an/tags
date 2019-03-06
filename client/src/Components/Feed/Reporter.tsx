    import React, {useState, Fragment} from 'react'
    import Button from '@material-ui/core/Button'

    import '../Styles/Reporter.scss'

    export const Reporter = () => {
        const[open,toggleOpen] = useState(false)
        const[cause,setCause] = useState('')

        if (!open) {
            return (
                <div className='report-button'>
                    <Button onClick={() => {toggleOpen(true)}}>REPORT</Button>
                </div>
            )
        }
        else {
            return (
                <Fragment>
                    <div className='report-button'>
                        <Button onClick={() => {toggleOpen(true)}}>REPORT</Button>
                    </div>
                    <div className='report-container' onMouseLeave={()=>{toggleOpen(false)}}>
                        <div className='report-select'>
                            <div className='this-is'>This comment is... <div className='cause'>abusive</div></div>
                            <div className='this-is'><br></br><div className='cause'>inaccurate</div></div>
                            <div className='this-is'><br></br><div className='cause'>a duplicate</div></div>
                        </div>
                    </div>
                </Fragment>
            )
        }
        return (null)
    }