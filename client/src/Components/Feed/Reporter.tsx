import React, {useState, Fragment} from 'react'
import Button from '@material-ui/core/Button'

import '../../Styles/Reporter.scss'
import { useMutation } from 'react-apollo-hooks'
import { REPORT } from '../../Mutations/index'
import { connect } from 'react-redux'

const mapStateToProps = (state,ownProps) => {
    //return whether or not the signed-in user has reported.
    return { tagID: ownProps.tagID, tag: state.tags[ownProps.tagID].content }
}

export const ConnectedReporter: React.FC<any> = (props) => {
    const[open,toggleOpen] = useState(false)
    const[report,setReport] = useState('')

    const sendReport = useMutation(REPORT, {variables: { userId: "61usaCJd3YBqpmFOdbS8"
                                                        , tagId: props.tagID
                                                        , reportId: report } })
    
    const clickhandler = (report) => {
        setReport(report)
        toggleOpen(false)
        sendReport()
    }

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
                        <div className='this-is'>"{props.tag}" is... </div>
                        <div className='cause-container'>
                            <div className='cause' onClick={() => clickhandler('abuse')}>abusive</div>
                            <div className='cause' onClick={() => clickhandler('inaccuracy')}>inaccurate</div>
                            <div className='cause' onClick={() => clickhandler('duplicacy')}>a duplicate</div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
    return (null)
}

const Reporter = connect(mapStateToProps)(ConnectedReporter)

export default Reporter