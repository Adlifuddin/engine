import React, { useState } from 'react'
import {Container, Card, Row } from 'react-bootstrap'
import Footer from '../../components/Footer/Footer'
import imgMarketplace from '../../assets/images/admarketplace.png'
import imgCalltracking from '../../assets/images/calltrackingmetrics.png'
import imgCampaign from '../../assets/images/campaignmanager.png'
import imgAnalytics from '../../assets/images/googleanalytics.png'
import imgSalesforce from '../../assets/images/saleforce.png'
import imgFacebook from '../../assets/images/facebook.png'
import imgInstagram from '../../assets/images/instagram.png'
import imgLinkedin from '../../assets/images/linkedin.png'
import imgYoutube from '../../assets/images/youtube.png'
import imgTwitter from '../../assets/images/twitter.png'
import imgTiktok from '../../assets/images/tiktok.png'
import imgTumblr from '../../assets/images/tumblr.png'
import imgGoogle from '../../assets/images/google-drive.png'
import Modals from '../../components/Modal/Modal'

function Integration() {

    const click = (e) => {
        return window.location.href = "/google-drive"
    }

    const containerStyle = {
        marginTop: "40px",
        marginLeft:"50px",
        marginRight:"50px"
    }

    const cardStyle = {
        width: "18rem",
        margin: "20px 20px 20px 20px",
        cursor: "pointer"
    }

    return (
        <div >
            <Container fluid >
                <Row style={{marginLeft: 'auto', marginRight: "auto", verticalAlign: "middle", overflow: "hidden"}}>
                    <Card border="warning" style={cardStyle} onClick={click} >
                        <Card.Img  variant="top" src={imgMarketplace} id="transparent-ad-marketplace" />
                        <Card.Body style={{textAlign:"center"}} id="transparent-ad-marketplace">
                            <Card.Title id="transparent-ad-marketplace">Transparent Ad Marketplace</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card border="warning" style={cardStyle} onClick={click} >
                        <Card.Img  variant="top" src={imgCalltracking} id="call-tracking-metrics"/>
                        <Card.Body style={{textAlign:"center"}} id="call-tracking-metrics">
                            <Card.Title id="call-tracking-metrics">Call Tracking Metrics</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card border="warning" style={cardStyle} onClick={click} >
                        <Card.Img  variant="top" src={imgCampaign} id="double-click" />
                        <Card.Body style={{textAlign:"center"}} id="double-click">
                            <Card.Title id="double-click">Double Click</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card border="warning" style={cardStyle} onClick={click} >
                        <Card.Img  variant="top" src={imgAnalytics} id="google-analytic" />
                        <Card.Body style={{textAlign:"center"}} id="google-analytic">
                            <Card.Title id="google-analytic">Google Analytics</Card.Title>
                        </Card.Body>
                    </Card>  
                    <Card border="warning" style={cardStyle} onClick={click} >
                        <Card.Img  variant="top" src={imgSalesforce} id="salesforce" />
                        <Card.Body style={{textAlign:"center"}} id="salesforce">
                            <Card.Title id="salesforce">Sales Force</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card border="warning" style={cardStyle} onClick={click}>
                        <Card.Img  variant="top" src={imgFacebook} id="facebook"/>
                        <Card.Body style={{textAlign:"center"}} id="facebook">
                            <Card.Title id="facebook">Facebook</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card border="warning" style={cardStyle} onClick={click} >
                        <Card.Img  variant="top" src={imgInstagram} id="instagram"/>
                        <Card.Body style={{textAlign:"center"}} id="instagram">
                            <Card.Title id="instagram">Instagram</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card border="warning" style={cardStyle} onClick={click} >
                        <Card.Img  variant="top" src={imgLinkedin} id="linkedin"/>
                        <Card.Body style={{textAlign:"center"}} id="linkedin">
                            <Card.Title id="linkedin">LinkedIn</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card border="warning" style={cardStyle} onClick={click} >
                        <Card.Img  variant="top" src={imgYoutube} id="youtube"/>
                        <Card.Body style={{textAlign:"center"}} id="youtube">
                            <Card.Title id="youtube">Youtube</Card.Title>
                        </Card.Body>
                    </Card>  
                    <Card border="warning" style={cardStyle} onClick={click}>
                        <Card.Img  variant="top" src={imgTwitter} id="twitter"/>
                        <Card.Body style={{textAlign:"center"}} id="twitter">
                            <Card.Title id="twitter">Twitter</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card border="warning" style={cardStyle} onClick={click} >
                        <Card.Img  variant="top" src={imgTiktok} id="tiktok" />
                        <Card.Body style={{textAlign:"center"}} id="tiktok">
                            <Card.Title id="tiktok">Tiktok</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card border="warning" style={cardStyle} onClick={click}>
                        <Card.Img  variant="top" src={imgTumblr} id="tumblr"/>
                        <Card.Body style={{textAlign:"center"}} id="tumblr">
                            <Card.Title id="tumblr">Tumblr</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card border="warning" style={cardStyle} onClick={click}>
                        <Card.Img variant="top" src={imgGoogle} id="google-drive"/>
                        <Card.Body style={{textAlign:"center"}} id="google-drive">
                            <Card.Title id="google-drive">Google Drive</Card.Title>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
            <Footer footerPosition="relative"/>
        </div>
    )
}

export default Integration