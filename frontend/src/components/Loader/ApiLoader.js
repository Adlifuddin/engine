import React from 'react'
import { css } from '@emotion/core'
import {RingLoader} from 'react-spinners'

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 100px;
`
const customStyle = {
    color: "white",
    display: "block",
    textAlign: "center",
    marginTop: "50px"
}

function ApiLoader(props){
    return (
        <div>
            <RingLoader color="white" css={override} size={250} loading={props.apiload}/>
            <h2 style={customStyle}>Loading...</h2>
        </div>
    )
}

export default ApiLoader